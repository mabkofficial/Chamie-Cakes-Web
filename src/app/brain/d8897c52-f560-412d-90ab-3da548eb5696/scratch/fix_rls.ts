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

    // Ensure Buckets exist
    await client.query("INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true) ON CONFLICT (id) DO NOTHING");
    await client.query("INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true) ON CONFLICT (id) DO NOTHING");

    const policies = [
      // Site Content table
      "DROP POLICY IF EXISTS \"Allow public read on site_content\" ON public.site_content",
      "CREATE POLICY \"Allow public read on site_content\" ON public.site_content FOR SELECT USING (true)",
      "DROP POLICY IF EXISTS \"Allow admin update on site_content\" ON public.site_content",
      "CREATE POLICY \"Allow admin update on site_content\" ON public.site_content FOR ALL USING (true) WITH CHECK (true)",

      // Gallery table
      "DROP POLICY IF EXISTS \"Allow public read on gallery\" ON public.gallery",
      "CREATE POLICY \"Allow public read on gallery\" ON public.gallery FOR SELECT USING (true)",
      "DROP POLICY IF EXISTS \"Allow admin all on gallery\" ON public.gallery",
      "CREATE POLICY \"Allow admin all on gallery\" ON public.gallery FOR ALL USING (true) WITH CHECK (true)",

      // Storage: gallery-images
      "DROP POLICY IF EXISTS \"Public Access\" ON storage.objects",
      "CREATE POLICY \"Public Access\" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images' OR bucket_id = 'site-assets')",
      "DROP POLICY IF EXISTS \"Admin Upload\" ON storage.objects",
      "CREATE POLICY \"Admin Upload\" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-images' OR bucket_id = 'site-assets')",
      "DROP POLICY IF EXISTS \"Admin Delete\" ON storage.objects",
      "CREATE POLICY \"Admin Delete\" ON storage.objects FOR DELETE USING (bucket_id = 'gallery-images' OR bucket_id = 'site-assets')"
    ];

    for (const policy of policies) {
      await client.query(policy);
    }
    console.log('Fixed policies.');

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
