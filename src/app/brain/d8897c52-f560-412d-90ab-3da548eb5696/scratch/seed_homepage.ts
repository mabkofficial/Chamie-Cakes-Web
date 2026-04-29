import pkg from 'pg';
const { Client } = pkg;
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const homepageData = [
      {
        key: 'how_it_works',
        content: {
          title: "Your dream cake, in three simple steps.",
          subtitle: "A simple process to help you plan your celebration.",
          steps: [
            { number: "01", title: "Share Your Vision", description: "Fill out our order form with your event details, desired flavors, and any inspiration photos." },
            { number: "02", title: "We Design & Bake", description: "Chamie creates a custom sketch for your approval, then bakes your cake from scratch using premium ingredients." },
            { number: "03", title: "Enjoy Your Creation", description: "Pick up your cake or have it delivered directly to your venue, ready to wow your guests." }
          ]
        }
      },
      {
        key: 'testimonials',
        content: {
          title: "Loved by our clients.",
          subtitle: "Nothing makes us happier than being part of your most special moments.",
          list: [
            { name: "Sarah Jenkins", role: "Wedding Client", rating: 5, text: "The cake was absolutely breathtaking. Not only did it look like a piece of art, but every guest raved about the flavor. Chamie truly listened to our vision." },
            { name: "Michael Chen", role: "Birthday Party", rating: 5, text: "I ordered a custom space-themed cake for my son's 5th birthday. The level of detail was incredible! It was the talk of the party." },
            { name: "Elena Rodriguez", role: "Anniversary", rating: 5, text: "Simple, elegant, and delicious. The salted caramel flavor is out of this world. We'll be ordering for every event from now on." },
            { name: "David Thompson", role: "Corporate Event", rating: 5, text: "Professional, timely, and the cakes were perfect. They captured our brand colors beautifully in the decorations." }
          ]
        }
      },
      {
        key: 'faqs',
        content: {
          title: "Need more details?",
          subtitle: "Everything you need to know about the ordering process at Chamie Cakes. Still have questions? Reach out to us directly.",
          questions: [
            { question: "How far in advance should I order?", answer: "We recommend booking at least 2-4 weeks in advance for standard custom cakes, and 3-6 months for wedding cakes. However, don't hesitate to check for last-minute availability!" },
            { question: "Do you offer delivery in DFW?", answer: "Yes! We offer delivery within the Dallas/Fort Worth area. Delivery fees depend on the distance from our studio. Pickup is also available by appointment." },
            { question: "Can you accommodate dietary restrictions?", answer: "We currently offer gluten-friendly and dairy-free options for many of our flavors. Please note that while we take precautions, our kitchen handles wheat, dairy, and nuts." },
            { question: "How do I get a price quote?", answer: "Pricing is based on design complexity, size, and flavor. Fill out our 'Start Your Order' form with your details, and we'll get back to you with a personalized quote within 24-48 hours." }
          ]
        }
      },
      {
        key: 'categories_list',
        content: {
          items: [
            { id: "wedding", title: "Wedding", description: "Elegant tiers for your special day", image: "/images/wedding.png", link: "/gallery?filter=wedding" },
            { id: "birthday", title: "Birthday", description: "Custom creations for any age", image: "/images/birthday.png", link: "/gallery?filter=birthday" },
            { id: "kids", title: "Kids", description: "Fun, colorful, and imaginative", image: "/images/kids.png", link: "/gallery?filter=kids" },
            { id: "holiday", title: "Holiday & Special", description: "Seasonal treats & themed bakes", image: "/images/holiday.png", link: "/gallery?filter=holiday" },
            { id: "corporate", title: "Corporate", description: "Branded treats for your business", image: "/images/hero.png", link: "/gallery?filter=corporate" },
            { id: "cupcakes", title: "Cupcakes", description: "Small, tasty cupcakes", image: "/images/about-preview.png", link: "/gallery?filter=cupcakes" }
          ]
        }
      }
    ];

    for (const item of homepageData) {
      await client.query(
        'INSERT INTO public.site_content (key, content) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET content = $2',
        [item.key, item.content]
      );
    }

    console.log('Seeded all homepage content to Supabase.');

  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await client.end();
  }
}

seed();
