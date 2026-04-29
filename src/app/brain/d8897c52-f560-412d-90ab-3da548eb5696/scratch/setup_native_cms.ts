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

    // 1. Create site_content table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.site_content (
        key TEXT PRIMARY KEY,
        content JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('Created site_content table.');

    // 2. Create gallery table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.gallery (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT now(),
        title TEXT,
        image_url TEXT NOT NULL,
        category TEXT, -- cakes, wedding, corporate, etc.
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true
      );
    `);
    console.log('Created gallery table.');

    // 3. Enable RLS
    await client.query(`
      ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY "Enable read access for all users" ON public.site_content FOR SELECT USING (true);
      CREATE POLICY "Enable all for admin" ON public.site_content FOR ALL USING (true);
      
      CREATE POLICY "Enable read access for all users" ON public.gallery FOR SELECT USING (true);
      CREATE POLICY "Enable all for admin" ON public.gallery FOR ALL USING (true);
    `);
    console.log('Enabled RLS and policies.');

    // 4. Seed initial content if empty
    await client.query(`
      INSERT INTO public.site_content (key, content)
      VALUES 
        ('brand_story', '{"title": "Our Story", "content": "Welcome to Chamie Cakes..."}'::jsonb),
        ('home_hero', '{"title": "Artisan Cakes.", "subtitle": "Crafted for your most precious moments.", "cta": "Order Now"}'::jsonb)
      ON CONFLICT (key) DO NOTHING;
    `);
    console.log('Seeded initial content.');

    // 5. Create gallery-images bucket if it doesn't exist
    await client.query(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('gallery-images', 'gallery-images', true)
      ON CONFLICT (id) DO NOTHING;
    `);
    console.log('Created gallery-images bucket.');

  } catch (err) {
    console.error('Setup error:', err);
  } finally {
    await client.end();
  }
}

setup();
