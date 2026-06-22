import { defineConfig } from 'drizzle-kit';

if (!process.env.VERCEL) {
  require('dotenv').config({ path: '.env.local' });
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
