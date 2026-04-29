import pkg from 'pg';
const { Client } = pkg;
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function update() {
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
          cta: "Order Now",
          image: "/images/hero.png"
        }
      },
      {
        key: 'brand_story',
        content: {
          title: "The Story Behind the Batter",
          content: "Chamie Cakes started with a simple passion: creating edible art that tastes as good as it looks. Based in the heart of Dallas/Fort Worth, we specialize in custom-designed cakes that serve as the centerpiece for your most precious celebrations. Every cake is a collaboration between our artistic vision and your unique story.",
          image: "/images/about-chamie.png"
        }
      }
    ];

    for (const item of updates) {
      await client.query(
        'INSERT INTO public.site_content (key, content) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET content = $2',
        [item.key, item.content]
      );
    }

    console.log('Updated content with image paths.');

  } catch (err) {
    console.error('Update error:', err);
  } finally {
    await client.end();
  }
}

update();
