# Supabase Setup Instructions for Simple POS (Internal Tool)

## 🚀 Quick Setup

Your Supabase authentication integration is ready for internal use! Users are created directly in Supabase dashboard.

### 1. Environment Variables

The `.env` file has been created with your Supabase credentials:

```
VITE_SUPABASE_URL=https://sbzwnhutqasgvfznipec.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Database Setup

**Create profiles table** in your Supabase SQL Editor:

- Table: `profiles` with user information and permissions
- Enable Row Level Security (RLS)
- Create policies for user access

📖 **Learn more:** [Supabase Database Setup](https://supabase.com/docs/guides/database/overview)

### 3. Authentication Settings

**Configure in Supabase Dashboard > Authentication > Settings:**

- Add your site URLs (localhost:5173 for dev)
- Disable public signups (internal tool)
- Set redirect URLs

📖 **Learn more:** [Supabase Auth Configuration](https://supabase.com/docs/guides/auth/overview)

### 4. User Management

**Create users manually** in Supabase Dashboard:

1. Go to Authentication > Users
2. Add user with email/password
3. Create corresponding profile entry

📖 **Learn more:** [Managing Users](https://supabase.com/docs/guides/auth/managing-user-data)

### 5. Row Level Security (RLS)

**Set up policies** for secure data access:

- Users can view/update own profiles
- Admin policies for elevated access
- Avoid infinite recursion in policies

📖 **Learn more:** [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

### 6. Storage & Edge Functions

**For certificate files and DTE signing:**

- Storage bucket: `internal-assets` with private folder
- Edge Function: `sign-dte` for document signing
- Proper CORS configuration

📖 **Learn more:**

- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Edge Functions](https://supabase.com/docs/guides/functions)

### 7. Type Generation

**Generate TypeScript types:**

```bash
npm run update-types
```

📖 **Learn more:** [TypeScript Support](https://supabase.com/docs/guides/api/generating-types)

## ✅ Features Implemented

- **Authentication:** Login, session management, permissions
- **UI Components:** Clean forms, loading states, error handling
- **Security:** RLS, protected routes, type-safe API calls
- **DTE Integration:** Document signing via Edge Functions

## 🔧 Troubleshooting

**Common Issues:**

- **CORS errors:** Check Edge Function CORS headers
- **Policy recursion:** Use security definer functions
- **Auth redirects:** Verify URLs in dashboard settings

📖 **Learn more:** [Supabase Troubleshooting](https://supabase.com/docs/guides/platform/troubleshooting)

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Integration Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
- [Security Best Practices](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)
- [Production Checklist](https://supabase.com/docs/guides/platform/going-to-prod)

---

**Ready for production!** 🎉

## 📊 Adding New Entities (CRUD Operations Guide)

This guide shows how to add any new entity to your POS system with full CRUD operations.

### 1. Database Table Structure

**Steps to add any new entity:**

1. **Create database table** with proper structure
2. **Generate TypeScript types** from database
3. **Create service functions** for CRUD operations
4. **Create Redux slice** for state management
5. **Build UI components** for user interaction

### 2. Database Setup Pattern

```sql
-- Generic table structure
CREATE TABLE your_table_name (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- your fields here
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE your_table_name ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed)
CREATE POLICY "Users can manage their data" ON your_table_name
FOR ALL USING (auth.uid() = user_id); -- if user-specific

-- Auto-update timestamp trigger
CREATE TRIGGER update_your_table_updated_at 
  BEFORE UPDATE ON your_table_name 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3. TypeScript Types Pattern

```typescript
// src/data/types/your-entity.ts
import type { Database } from '../database.types'

export type YourEntity = Database['public']['Tables']['your_table_name']['Row']
export type CreateYourEntityData = Database['public']['Tables']['your_table_name']['Insert']
export type UpdateYourEntityData = Database['public']['Tables']['your_table_name']['Update']

export interface YourEntityState {
  items: YourEntity[];
  loading: boolean;
  error: string | null;
}
```

### 4. Service Pattern

```typescript
// src/services/your-entity.service.ts
import { supabase } from '@/lib/supabase';

export const yourEntityService = {
  async getAll() { /* SELECT * */ },
  async getById(id: string) { /* SELECT by ID */ },
  async create(data) { /* INSERT */ },
  async update(id: string, data) { /* UPDATE */ },
  async delete(id: string) { /* DELETE */ },
};
```

### 5. Redux Slice Pattern

```typescript
// src/store/your-entity/slice.ts
export const fetchItems = createAsyncThunk('entity/fetchAll', async () => {
  return await yourEntityService.getAll();
});

const slice = createSlice({
  name: 'yourEntity',
  initialState,
  reducers: { /* sync actions */ },
  extraReducers: (builder) => { /* async actions */ }
});
```

### 6. UI Components Pattern

```typescript
// src/components/your-entity/
// - YourEntityList.tsx (display items)
// - YourEntityForm.tsx (create/edit)
// - YourEntityCard.tsx (item display)
```

### 7. Integration Steps

1. **Add to store:** Update `src/store/store.ts`
2. **Create routes:** Add to router configuration  
3. **Add navigation:** Update sidebar/menu
4. **Test CRUD:** Verify all operations work

### 8. Common Patterns & Best Practices

**Error Handling:**

```typescript
// Always handle errors in async thunks
try {
  return await yourService.method();
} catch (error) {
  return rejectWithValue(error.message);
}
```

**Loading States:**

```typescript
// Use loading states for better UX
const { items, loading, error } = useSelector(state => state.yourEntity);
```

**Optimistic Updates:**

```typescript
// Update UI immediately, rollback on error
dispatch(updateItemOptimistically(item));
try {
  await dispatch(updateItem(item));
} catch {
  dispatch(rollbackUpdate());
}
```

### 9. Useful Resources

📖 **Learn more:**

- [Supabase CRUD Operations](https://supabase.com/docs/guides/database/api)
- [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Hook Form](https://react-hook-form.com/) for forms
- [TanStack Table](https://tanstack.com/table) for data tables

---

**Follow this pattern for any new entity in your POS system!** 🚀
