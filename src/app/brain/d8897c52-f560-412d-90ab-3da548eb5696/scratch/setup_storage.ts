import pkg from 'pg';
const { Client } = pkg;
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function setup() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    // 1. Add image_url column to inquiries if it doesn't exist
    await client.query(`
      ALTER TABLE public.inquiries 
      ADD COLUMN IF NOT EXISTS image_url TEXT;
    `);
    console.log('Added image_url column to inquiries.');

    // 2. Create the storage bucket
    await client.query(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('reference-images', 'reference-images', true)
      ON CONFLICT (id) DO NOTHING;
    `);
    console.log('Created reference-images bucket.');

    // 3. Create storage policies to allow anonymous uploads and public reads
    await client.query(`
      CREATE POLICY "Allow public read" 
      ON storage.objects FOR SELECT 
      USING (bucket_id = 'reference-images');
    `);
    
    await client.query(`
      CREATE POLICY "Allow anonymous upload" 
      ON storage.objects FOR INSERT 
      WITH CHECK (bucket_id = 'reference-images');
    `);
    console.log('Created storage policies.');

  } catch (err) {
    console.error('Setup error:', err);
  } finally {
    await client.end();
  }
}

setup();
