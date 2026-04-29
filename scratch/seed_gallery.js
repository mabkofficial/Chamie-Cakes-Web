
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const galleryData = [
  // Trending Cakes
  { title: "Birthday Bows", category: "Trending Cakes", is_active: true, display_order: 1 },
  { title: "Black Heart", category: "Trending Cakes", is_active: true, display_order: 2 },
  { title: "Black Pearls", category: "Trending Cakes", is_active: true, display_order: 3 },
  { title: "Hearts and Pearls", category: "Trending Cakes", is_active: true, display_order: 4 },
  { title: "Just Married", category: "Trending Cakes", is_active: true, display_order: 5 },

  // Assorted Cakes
  { title: "Cherry Blossom", category: "Assorted Cakes", is_active: true, display_order: 6 },
  { title: "Chocolate Drips", category: "Assorted Cakes", is_active: true, display_order: 7 },
  { title: "Fairytale", category: "Assorted Cakes", is_active: true, display_order: 8 },
  { title: "Gemstone", category: "Assorted Cakes", is_active: true, display_order: 9 },
  { title: "Watercolor", category: "Assorted Cakes", is_active: true, display_order: 10 },

  // Kids Cakes
  { title: "Dinosaur Habitat", category: "Kids Cakes", is_active: true, display_order: 11 },
  { title: "Galaxy", category: "Kids Cakes", is_active: true, display_order: 12 },
  { title: "Mermaid", category: "Kids Cakes", is_active: true, display_order: 13 },
  { title: "Superhero", category: "Kids Cakes", is_active: true, display_order: 14 },
  { title: "Unicorn", category: "Kids Cakes", is_active: true, display_order: 15 },

  // Wedding Cakes
  { title: "Beach", category: "Wedding Cakes", is_active: true, display_order: 16 },
  { title: "Flower Petals", category: "Wedding Cakes", is_active: true, display_order: 17 },
  { title: "Pearls", category: "Wedding Cakes", is_active: true, display_order: 18 },
  { title: "Tiered Designs", category: "Wedding Cakes", is_active: true, display_order: 19 },
  { title: "Woods", category: "Wedding Cakes", is_active: true, display_order: 20 },

  // Graduation Cakes
  { title: "Computer Science", category: "Graduation Cakes", is_active: true, display_order: 21 },
  { title: "Flowers and Gold Flakes", category: "Graduation Cakes", is_active: true, display_order: 22 },
  { title: "Grad Cupcakes", category: "Graduation Cakes", is_active: true, display_order: 23 },
  { title: "Medical School", category: "Graduation Cakes", is_active: true, display_order: 24 },
  { title: "Volleyball Grad Cap", category: "Graduation Cakes", is_active: true, display_order: 25 },

  // Sports
  { title: "Baseball", category: "Sports", is_active: true, display_order: 26 },
  { title: "Football", category: "Sports", is_active: true, display_order: 27 },
  { title: "Golf", category: "Sports", is_active: true, display_order: 28 },
  { title: "Weightlifting", category: "Sports", is_active: true, display_order: 29 },
  { title: "Custom Team Cupcakes", category: "Sports", is_active: true, display_order: 30 },

  // Profession Cakes
  { title: "Doctor", category: "Profession Cakes", is_active: true, display_order: 31 },
  { title: "Military", category: "Profession Cakes", is_active: true, display_order: 32 },
  { title: "Nurse", category: "Profession Cakes", is_active: true, display_order: 33 },

  // Holiday Cakes
  { title: "Birthday Pumpkins", category: "Holiday Cakes", is_active: true, display_order: 34 },
  { title: "Christmas Party", category: "Holiday Cakes", is_active: true, display_order: 35 },
  { title: "Mistletoe Cupcakes", category: "Holiday Cakes", is_active: true, display_order: 36 },
  { title: "Poinsettias", category: "Holiday Cakes", is_active: true, display_order: 37 },
  { title: "Winter Greenery", category: "Holiday Cakes", is_active: true, display_order: 38 },

  // Happy Hour Cakes
  { title: "Champagne", category: "Happy Hour Cakes", is_active: true, display_order: 39 },
  { title: "Chocolate Whiskey", category: "Happy Hour Cakes", is_active: true, display_order: 40 },
  { title: "Pink Whitney", category: "Happy Hour Cakes", is_active: true, display_order: 41 },
  { title: "Whiskey and Cigars", category: "Happy Hour Cakes", is_active: true, display_order: 42 },

  // Cupcakes
  { title: "Galaxy", category: "Cupcakes", is_active: true, display_order: 43 },
  { title: "Glitter Balls", category: "Cupcakes", is_active: true, display_order: 44 },
  { title: "Gold Flakes", category: "Cupcakes", is_active: true, display_order: 45 },
  { title: "Pink and White Flowers", category: "Cupcakes", is_active: true, display_order: 46 },
  { title: "Team", category: "Cupcakes", is_active: true, display_order: 47 },

  // Simple Cakes
  { title: "Flower Sheet", category: "Simple Cakes", is_active: true, display_order: 48 },
  { title: "Fruit Filling", category: "Simple Cakes", is_active: true, display_order: 49 },
  { title: "Lavender Flowers", category: "Simple Cakes", is_active: true, display_order: 50 },
  { title: "Natural Icing", category: "Simple Cakes", is_active: true, display_order: 51 },
  { title: "Pink and White Gradient", category: "Simple Cakes", is_active: true, display_order: 52 },
];

async function seedGallery() {
  console.log('Seeding gallery...');
  
  // Clear existing to avoid duplicates if needed, or just insert
  // For this task, we'll just insert
  const { data, error } = await supabase
    .from('gallery')
    .insert(galleryData);

  if (error) {
    console.error('Error seeding gallery:', error);
  } else {
    console.log('Gallery seeded successfully!');
  }
}

seedGallery();
