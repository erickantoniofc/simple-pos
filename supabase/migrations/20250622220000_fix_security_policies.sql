-- Fix RLS Security Policies
-- Date: 2025-06-22
-- Description: Implement security improvements for RLS policies

-- 1. Change anonymous to authenticated read access for sensitive tables

-- Drop existing overly permissive policies
DROP POLICY
IF EXISTS "Enable read access for all users" ON "public"."customers";
DROP POLICY
IF EXISTS "Enable read access for all users" ON "public"."sales";
DROP POLICY
IF EXISTS "Enable read access for all users" ON "public"."sale_items";

-- Create authenticated-only read policies for sensitive data
CREATE POLICY "Authenticated read access" ON "public"."customers" 
FOR
SELECT TO "authenticated"
USING
(true);

CREATE POLICY "Authenticated read access" ON "public"."sales" 
FOR
SELECT TO "authenticated"
USING
(true);

CREATE POLICY "Authenticated read access" ON "public"."sale_items" 
FOR
SELECT TO "authenticated"
USING
(true);

-- 2. Keep existing insert policies for authenticated users (already correct)
-- No changes needed - policies already exist and are correct

-- 3. Add admin-only delete policies for sensitive tables

CREATE POLICY "Admin only delete" ON "public"."branches" 
FOR
DELETE TO "authenticated" USING ("public"."is_admin"());

CREATE POLICY "Admin only delete" ON "public"."categories" 
FOR
DELETE TO "authenticated" USING ("public"."is_admin"());

CREATE POLICY "Admin only delete" ON "public"."customers" 
FOR
DELETE TO "authenticated" USING ("public"."is_admin"());

CREATE POLICY "Admin only delete" ON "public"."pos_points" 
FOR
DELETE TO "authenticated" USING ("public"."is_admin"());

CREATE POLICY "Admin only delete" ON "public"."products" 
FOR
DELETE TO "authenticated" USING ("public"."is_admin"());

CREATE POLICY "Admin only delete" ON "public"."sales" 
FOR
DELETE TO "authenticated" USING ("public"."is_admin"());

-- 4. Add missing INSERT/UPDATE policies

-- branches table
CREATE POLICY "Admin only insert" ON "public"."branches" 
FOR
INSERT TO "authenticated" WITH CHECK (
"public"."is_admin"()
);

CREATE POLICY "Admin only update" ON "public"."branches" 
FOR
UPDATE TO "authenticated" 
USING ("public"."is_admin"())
WITH CHECK
("public"."is_admin"
());

-- pos_points table
CREATE POLICY "Admin only insert" ON "public"."pos_points" 
FOR
INSERT TO "authenticated" WITH CHECK (
"public"."is_admin"()
);

CREATE POLICY "Admin only update" ON "public"."pos_points" 
FOR
UPDATE TO "authenticated" 
USING ("public"."is_admin"())
WITH CHECK
("public"."is_admin"
());

-- 5. Fix typo in sales table policy
DROP POLICY
IF EXISTS "Update for authtenticated" ON "public"."sales";

CREATE POLICY "Update for authenticated" ON "public"."sales" 
FOR
UPDATE TO "authenticated" 
USING (true)
WITH CHECK
(true);

-- Add missing profiles INSERT policy (users should be able to create profiles during signup)
CREATE POLICY "Users can insert own profile" ON "public"."profiles" 
FOR
INSERT TO "authenticated" 
WITH CHECK ("auth"."uid"() = "id");

-- Comment to document the changes
COMMENT
ON
TABLE
"public"."customers"
IS
'RLS: Authenticated read access, admin delete only';
COMMENT ON TABLE "public"."sales" IS 'RLS: Authenticated read access, admin delete only';
COMMENT ON TABLE "public"."sale_items" IS 'RLS: Authenticated read access, authenticated CRUD';
COMMENT ON TABLE "public"."branches" IS 'RLS: Public read, admin-only modifications';
COMMENT ON TABLE "public"."pos_points" IS 'RLS: Public read, admin-only modifications'; 
