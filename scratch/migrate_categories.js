
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const mapping = {
  "Trending Cakes": "Trending",
  "Simple Cakes": "Signature",
  "Assorted Cakes": "Signature",
  "Happy Hour Cakes": "Signature",
  "Kids Cakes": "Kids",
  "Wedding Cakes": "Weddings",
  "Graduation Cakes": "Celebrations",
  "Sports": "Celebrations",
  "Profession Cakes": "Celebrations",
  "Holiday Cakes": "Celebrations",
  "Cupcakes": "Cupcakes"
};

async function migrateCategories() {
  console.log('Starting category optimization migration...');
  
  for (const [oldCat, newCat] of Object.entries(mapping)) {
    console.log(`Migrating "${oldCat}" to "${newCat}"...`);
    const { error } = await supabase
      .from('gallery')
      .update({ category: newCat })
      .eq('category', oldCat);
    
    if (error) console.error(`Error migrating ${oldCat}:`, error);
  }
  
  console.log('Migration complete!');
}

migrateCategories();
