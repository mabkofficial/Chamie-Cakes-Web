import pkg from 'pg';
const { Client } = pkg;
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function fix() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    // 1. Fix Table Policies (Adding WITH CHECK)
    await client.query(`
      DROP POLICY IF EXISTS "Enable all for admin" ON public.site_content;
      CREATE POLICY "Enable all for everyone" ON public.site_content 
      FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Enable all for admin" ON public.gallery;
      CREATE POLICY "Enable all for everyone" ON public.gallery 
      FOR ALL USING (true) WITH CHECK (true);
    `);
    console.log('Fixed table policies.');

    // 2. Add Storage Policies for gallery-images
    await client.query(`
      -- Allow public read access to gallery-images
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('gallery-images', 'gallery-images', true)
      ON CONFLICT (id) DO UPDATE SET public = true;

      -- Storage policies for gallery-images
      CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
      CREATE POLICY "Public Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-images');
      CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery-images');
      CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (bucket_id = 'gallery-images');
    `);
    console.log('Added gallery-images storage policies.');

    // 3. Add Storage Policies for reference-images (from previous task)
    await client.query(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('reference-images', 'reference-images', true)
      ON CONFLICT (id) DO UPDATE SET public = true;

      CREATE POLICY "Public Access Ref" ON storage.objects FOR SELECT USING (bucket_id = 'reference-images');
      CREATE POLICY "Public Insert Ref" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'reference-images');
    `);
    console.log('Added reference-images storage policies.');

  } catch (err) {
    console.error('Fix error:', err);
  } finally {
    await client.end();
  }
}

fix();
