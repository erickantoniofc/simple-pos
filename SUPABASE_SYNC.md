# Supabase Database Sync Documentation

## Overview

This document tracks the synchronization between the local Supabase project and the remote Supabase database, making the remote database the source of truth.

## Sync Process Completed ✅

### 1. Project Linking

- **Date:** June 22, 2025
- **Action:** Linked local project to remote Supabase project
- **Command:** `supabase link --project-ref sbzwnhutqasgvfznipec`
- **Status:** ✅ Success

### 2. Edge Functions Sync

- **Action:** Downloaded all edge functions from remote
- **Functions Synced:**
  - `sales-analytics` - Sales analytics and reporting
  - `sign-dte` - DTE (Documento Tributario Electrónico) signing for El Salvador tax compliance
- **Command:** `supabase functions download`
- **Status:** ✅ Success

### 3. Database Schema Pull

- **Action:** Pulled complete database schema from remote
- **Migration Created:** `supabase/migrations/20250622214535_remote_schema.sql`
- **Command:** `supabase db pull`
- **Status:** ✅ Success

### 4. TypeScript Types Generation

- **Action:** Generated TypeScript types from remote database
- **File:** `database.types.ts`
- **Command:** `supabase gen types typescript --project-id sbzwnhutqasgvfznipec`
- **Status:** ✅ Success (No changes needed - already up to date)

### 5. Edge Function Updates

- **Action:** Updated `sales-analytics` function to match actual database schema
- **Changes Made:**
  - Fixed column names: `total_amount` → `total`
  - Updated product data parsing from JSON fields
  - Corrected sale_items field references
- **Status:** ✅ Success - Function deployed and tested

### 6. Local Database Reset

- **Action:** Applied remote schema to local database
- **Command:** `supabase db reset`
- **Status:** ✅ Success

## Database Schema Overview

### Tables Synced

1. **branches** - Store branch information
2. **categories** - Product categories
3. **customers** - Customer data with tax info
4. **dte** - Electronic tax documents storage
5. **pos_points** - Point of sale locations
6. **products** - Product catalog
7. **profiles** - User profiles with roles and permissions
8. **sale_items** - Individual items in sales
9. **sales** - Sales transactions
10. **sequential_counters** - DTE control number generation

### Key Features

- ✅ Row Level Security (RLS) enabled
- ✅ Automatic timestamp triggers
- ✅ Foreign key relationships
- ✅ Admin role checking functions
- ✅ Proper data types and constraints

## Edge Functions Status

### sales-analytics

- **Endpoint:** `POST /functions/v1/sales-analytics`
- **Status:** ✅ Deployed and working
- **Features:**
  - Total sales and revenue calculation
  - Average order value
  - Top products analysis
  - Daily sales trends
  - Payment method breakdown
- **Test Results:** ✅ Returns proper JSON response

### sign-dte

- **Endpoint:** `POST /functions/v1/sign-dte`
- **Status:** ✅ Deployed
- **Purpose:** Digital signing of tax documents for El Salvador compliance
- **Features:**
  - Certificate management via Supabase Storage
  - Secure environment variable handling
  - Support for test/production certificates

## Testing Results

### Local Testing

- **Local Supabase URL:** `http://127.0.0.1:54321`
- **Edge Function Test:** ✅ Success
- **Response Format:** ✅ Correct JSON structure
- **Database Connection:** ✅ Working

### Remote Testing

- **Remote Supabase URL:** `https://sbzwnhutqasgvfznipec.supabase.co`
- **Edge Function Test:** ✅ Success
- **Real Data Processing:** ✅ Working with actual sales data

## Next Steps

1. **Development Workflow:**
   - Use local Supabase for development
   - Test edge functions locally before deployment
   - Pull schema changes when remote is updated

2. **Deployment Process:**
   - Deploy functions: `supabase functions deploy <function-name>`
   - Push schema changes: `supabase db push`
   - Generate types: `supabase gen types typescript`

3. **Maintenance:**
   - Regular sync with remote when schema changes
   - Keep migration files in version control
   - Monitor edge function performance

## Commands Reference

```bash
# Link to remote project
supabase link --project-ref sbzwnhutqasgvfznipec

# Pull database schema
supabase db pull

# Download functions
supabase functions download

# Deploy functions
supabase functions deploy <function-name>

# Generate types
supabase gen types typescript --project-id sbzwnhutqasgvfznipec

# Reset local database
supabase db reset

# Start local development
supabase start

# Stop local development
supabase stop
```

## Project Status: ✅ FULLY SYNCED

The local project is now fully synchronized with the remote Supabase database. All schemas, functions, and types are up to date and working correctly.

## Database Overview

The database is designed to support a Point of Sale (POS) system with the following main features:

- **Branch Management**: Multiple business locations
- **Product Catalog**: Product inventory and categorization
- **Sales Processing**: Complete sales transaction handling
- **Customer Management**: Customer information and relationships
- **DTE Integration**: Electronic tax document processing for El Salvador
- **Sequential Counters**: Automatic DTE control number generation

## Core Tables

### 1. **profiles** - User management

- Stores user profiles linked to Supabase Auth
- Role-based permissions (admin/user)
- Access control for different POS points

### 2. **branches** - Business locations

- Physical business locations/stores
- Each branch has a unique Hacienda code for tax purposes
- Department and municipality information for DTE compliance

### 3. **pos_points** - Point of sale terminals

- Individual POS terminals within branches
- Each POS has a unique Hacienda code
- Linked to specific branches

### 4. **categories** - Product categories

- Hierarchical product organization
- Used for filtering and reporting

### 5. **products** - Product catalog

- Complete product information
- Pricing and category assignments
- Active/inactive status management

### 6. **customers** - Customer database

- Customer contact and tax information
- Support for both individual and business customers
- DUI, NIT, and NRC for tax document generation

### 7. **sales** - Sales transactions

- Complete sales record with customer and POS information
- Document type tracking (FE - Factura Electrónica, CCF - Comprobante de Crédito Fiscal)
- Payment terms and methods
- Status tracking (draft, saved, sent, cancelled)

### 8. **sale_items** - Sales line items

- Individual products within each sale
- Quantities, prices, and discounts
- Product snapshot for historical accuracy

### 9. **dte** - Electronic tax documents

- Stores generated and signed DTE documents
- Control numbers for tax compliance
- Links to original sales transactions

### 10. **sequential_counters** - DTE control number generation

- Automatic sequential numbering for DTE documents
- Year-based reset functionality
- Branch and POS-specific counters
- Format: `DTE_{documentType}_{branchCode}_{posCode}_{year}`

## DTE Control Number System

The system automatically generates control numbers for electronic tax documents following El Salvador's DTE requirements.

### Control Number Format

```
DTE-01-M001P001-000000000000042
│   │  │       │
│   │  │       └── Sequential number (15 digits, zero-padded)
│   │  └────────── Branch + POS codes (8 digits total)
│   └─────────────── Document type (01 = Factura Electrónica)
└─────────────────── DTE prefix
```

### Sequential Counter Features

- **Automatic Year Reset**: Counters reset to 1 on January 1st
- **Thread Safety**: Concurrent requests are handled safely
- **Per Branch/POS**: Each branch-POS combination has its own counter
- **Audit Trail**: All generated numbers are logged in the database

### Key Format

```
DTE_01_M001_P001_2025
│   │  │    │    │
│   │  │    │    └── Year (resets counter)
│   │  │    └───────── POS Code (4 digits)
│   │  └────────────── Branch Code (4 digits)
│   └───────────────── Document Type (01 = FE, 03 = CCF)
└───────────────────── DTE Prefix
```

## Row Level Security (RLS)

All tables implement Row Level Security with the following general principles:

- **Read Access**: Authenticated users can read most data
- **Write Access**: Authenticated users can insert/update their own data
- **Admin Access**: Admin users have full access to all operations
- **Sequential Counters**: Protected access for DTE generation only

## Functions and Edge Functions

### Database Functions

- `is_admin()` - Checks if current user has admin role
- `set_updated_at()` - Automatically updates timestamp on row changes

### Edge Functions

- **sign-dte** - DTE signing with automatic control number generation
- **sales-analytics** - Sales reporting and analytics

### sign-dte

- **Endpoint:** `POST /functions/v1/sign-dte`
- **Features:**
  - Automatic sequential control number generation
  - Year-based counter reset
  - Thread-safe concurrent processing
  - Digital document signing
  - Certificate management

**Request Format:**

```json
{
  "dte": { /* DTE document structure */ },
  "branchCode": "M001",
  "posCode": "P001",
  "documentType": "01"
}
```

**Response Format:**

```json
{
  "result": { /* signed DTE */ },
  "controlNumber": "DTE-01-M001P001-000000000000042"
}
```

## Migration Strategy

Database changes are managed through Supabase migrations located in `supabase/migrations/`:

- `20250622214535_remote_schema.sql` - Initial schema setup
- `20250622220000_fix_security_policies.sql` - RLS policy adjustments
- `20250622221500_fix_profile_permissions.sql` - Profile access controls

## Sync Process

1. **Development**: Make schema changes locally using Supabase CLI
2. **Migration Generation**: Create migration files for changes
3. **Testing**: Validate migrations in local environment
4. **Deployment**: Apply migrations to production via Supabase dashboard or CLI

## Environment Setup

### Required Environment Variables

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Public API key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (for edge functions)
- `MH_PASSWORD` - Certificate password for DTE signing
- `NIT` - Company NIT for certificate management

### Local Development

```bash
supabase start
supabase db reset
supabase functions serve
```

### Production Deployment

```bash
supabase db push
supabase functions deploy
```

## Data Relationships

```
profiles (1) ──── (N) sales
branches (1) ──── (N) pos_points
branches (1) ──── (N) sales (via pos_points)
categories (1) ──── (N) products
products (1) ──── (N) sale_items
customers (1) ──── (N) sales
sales (1) ──── (N) sale_items
sales (1) ──── (1) dte
sequential_counters (unique per branch/pos/year)
```

## Key Features

- **Multi-branch Support**: Handle multiple business locations
- **Real-time Sync**: Changes propagate instantly across all clients
- **Offline Capability**: Sales can be stored locally and synced when online
- **Tax Compliance**: Full DTE support for El Salvador tax requirements
- **Audit Trail**: Complete transaction history and document generation logs
- **Scalable Architecture**: Designed to handle growing business needs

This architecture provides a robust foundation for a modern POS system with full tax compliance capabilities for El Salvador's electronic invoicing requirements.
