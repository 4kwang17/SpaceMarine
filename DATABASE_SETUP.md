# Database Setup Guide

## Current Implementation
Currently, authentication uses **localStorage** (client-side storage). This is fine for development/demo but not secure for production.

## Serverless Architecture
- ✅ **Next.js API Routes** - Already implemented (`/api/products`, `/api/auth/*`)
- ✅ **Vercel Deployment** - Fully supported
- ✅ **Serverless Functions** - API routes run as serverless functions on Vercel

## Options for Production Database

### Option 1: Vercel Postgres (Recommended for Vercel)
```bash
# Install Vercel Postgres
npm install @vercel/postgres

# In your API routes:
import { sql } from '@vercel/postgres';

// Store users in database
await sql`
  INSERT INTO users (username, password_hash, email, created_at)
  VALUES (${username}, ${hashedPassword}, ${email}, NOW())
`;
```

### Option 2: Supabase (Free tier available)
```bash
npm install @supabase/supabase-js

# Free PostgreSQL database with auth features
```

### Option 3: PlanetScale (MySQL)
```bash
npm install @planetscale/database

# Serverless MySQL database
```

### Option 4: MongoDB Atlas (Free tier)
```bash
npm install mongodb

# NoSQL database option
```

## Migration Steps

1. **Install database client** (choose one above)
2. **Create database schema** (users table)
3. **Update `/lib/auth.ts`** to use database instead of localStorage
4. **Add password hashing** (bcrypt)
5. **Update API routes** to use database queries

## Example: Vercel Postgres Setup

1. Create database in Vercel dashboard
2. Update `src/lib/auth.ts`:
```typescript
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function signUp(username: string, password: string, email: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await sql`
    INSERT INTO users (username, password_hash, email)
    VALUES (${username}, ${hashedPassword}, ${email})
  `;
}
```

3. Update API routes to use database functions

## Security Improvements Needed

- ✅ Move to API routes (done)
- ⚠️ Add password hashing (bcrypt/argon2)
- ⚠️ Use database instead of localStorage
- ⚠️ Add JWT tokens for sessions
- ⚠️ Add rate limiting
- ⚠️ Add CSRF protection
