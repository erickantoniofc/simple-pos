-- Fix Profile Update Permissions
-- Date: 2025-06-22
-- Description: Restrict profile updates to prevent privilege escalation

-- Drop the existing overly permissive policy
DROP POLICY
IF EXISTS "Users can update own profile" ON "public"."profiles";

-- Create a helper function to check if update only touches safe fields
CREATE OR REPLACE FUNCTION "public"."profile_update_allowed"
() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
-- Users can only update their name (safe field)
-- All other fields (role, permissions) are admin-only
RETURN auth.uid()
= OLD.id AND
(
    -- Only allow changes to name field
    NEW.role = OLD.role AND 
    NEW.permissions = OLD.permissions AND
    NEW.id = OLD.id AND
    NEW.created_at = OLD.created_at
  );
END;$$;

-- Create separate policies for different update scenarios

-- 1. Users can update only their name (safe field)
CREATE POLICY "Users can update own name only" ON "public"."profiles" 
FOR
UPDATE TO "authenticated" 
USING (auth.uid() = id)
WITH CHECK
(profile_update_allowed
());

-- 2. Admins can update any profile completely
CREATE POLICY "Admins can update any profile" ON "public"."profiles" 
FOR
UPDATE TO "authenticated" 
USING (is_admin())
WITH CHECK
(is_admin
());

-- Create a trigger function to prevent unauthorized changes to sensitive fields
CREATE OR REPLACE FUNCTION "public"."prevent_privilege_escalation"
() RETURNS trigger
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
-- If the user is not an admin and is trying to change role or permissions
IF NOT is_admin() AND (
    NEW.role != OLD.role OR
  NEW.permissions != OLD.permissions
  ) THEN
    RAISE EXCEPTION 'Only administrators can modify role or permissions'
      USING ERRCODE = 'insufficient_privilege';
END
IF;
  
  RETURN NEW;
END;$$;

-- Create the trigger
CREATE OR REPLACE TRIGGER "prevent_privilege_escalation_trigger" 
BEFORE
UPDATE ON "public"."profiles" 
FOR EACH ROW
EXECUTE FUNCTION "public"
."prevent_privilege_escalation"
();

-- Add comments for documentation
COMMENT ON FUNCTION "public"."profile_update_allowed"
() IS 'Checks if profile update only modifies safe fields (name)';
COMMENT ON FUNCTION "public"."prevent_privilege_escalation"
() IS 'Prevents non-admin users from modifying role or permissions';
COMMENT ON TRIGGER "prevent_privilege_escalation_trigger" ON "public"."profiles" IS 'Database-level protection against privilege escalation';

-- Update table comment
COMMENT ON TABLE "public"."profiles" IS 'User profiles with role-based access control. Users can only update name, admins can update all fields.'; 
