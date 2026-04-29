import pkg from 'pg';
const { Client } = pkg;
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function restore() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const updates = [
      {
        key: 'home_hero',
        content: {
          title: "Custom Cakes for Life’s Sweetest Moments",
          subtitle: "Handcrafted in Dallas/Fort Worth. Beautifully designed, uniquely flavored.",
          cta: "Order Now"
        }
      },
      {
        key: 'specialties',
        content: {
          title: "Our Specialities",
          description: "Explore our most popular cake categories, baked fresh from scratch with love."
        }
      },
      {
        key: 'brand_story',
        content: {
          title: "The Story Behind the Batter",
          content: "Chamie Cakes started with a simple passion: creating edible art that tastes as good as it looks. Based in the heart of Dallas/Fort Worth, we specialize in custom-designed cakes that serve as the centerpiece for your most precious celebrations. Every cake is a collaboration between our artistic vision and your unique story."
        }
      }
    ];

    for (const item of updates) {
      await client.query(
        'INSERT INTO public.site_content (key, content) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET content = $2',
        [item.key, item.content]
      );
    }

    console.log('Restored original content to Supabase.');

  } catch (err) {
    console.error('Restore error:', err);
  } finally {
    await client.end();
  }
}

restore();
