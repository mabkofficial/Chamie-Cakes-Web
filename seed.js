const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Starting to seed database...");

  // Customers
  const customers = [
    { name: "Alice Smith", email: "alice@dummy.com", phone: "555-0101" },
    { name: "Bob Johnson", email: "bob@dummy.com", phone: "555-0102" },
    { name: "Carol Williams", email: "carol@dummy.com", phone: "555-0103" },
    { name: "David Brown", email: "david@dummy.com", phone: "555-0104" }
  ];

  const { data: customerData, error: customerError } = await supabase
    .from('customers')
    .insert(customers)
    .select();

  if (customerError) {
    console.error("Error inserting customers:", customerError);
    return;
  }
  console.log(`Inserted ${customerData.length} customers.`);

  // Inquiries
  const inquiries = [
    { 
      name: "Alice Smith", email: "alice@dummy.com", phone: "555-0101", 
      event_type: "Wedding", event_date: "2026-08-15", servings: 100, 
      flavor: "Vanilla Bean", colors: "White and Gold", budget: "$500", 
      description: "Looking for an elegant 3-tier wedding cake.", 
      status: "converted" 
    },
    { 
      name: "Bob Johnson", email: "bob@dummy.com", phone: "555-0102", 
      event_type: "Birthday", event_date: "2026-05-10", servings: 20, 
      flavor: "Chocolate Fudge", colors: "Blue and Silver", budget: "$100", 
      description: "A fun birthday cake for my son.", 
      status: "new" 
    },
    { 
      name: "Carol Williams", email: "carol@dummy.com", phone: "555-0103", 
      event_type: "Anniversary", event_date: "2026-06-20", servings: 50, 
      flavor: "Red Velvet", colors: "Red and White", budget: "$200", 
      description: "Anniversary party cake, nothing too crazy.", 
      status: "archived" 
    },
    { 
      name: "Eve Davis", email: "eve@dummy.com", phone: "555-0105", 
      event_type: "Graduation", event_date: "2026-05-25", servings: 30, 
      flavor: "Lemon", colors: "Green and Gold", budget: "$150", 
      description: "Graduation cake with school colors.", 
      status: "new" 
    }
  ];

  const { data: inquiryData, error: inquiryError } = await supabase
    .from('inquiries')
    .insert(inquiries)
    .select();

  if (inquiryError) {
    console.error("Error inserting inquiries:", inquiryError);
    return;
  }
  console.log(`Inserted ${inquiryData.length} inquiries.`);

  // Orders
  const orders = [
    {
      inquiry_id: inquiryData.find(i => i.email === "alice@dummy.com")?.id,
      total_amount: 500,
      deposit_amount: 250,
      status: "in_progress"
    },
    {
      inquiry_id: inquiryData.find(i => i.email === "bob@dummy.com")?.id,
      total_amount: 150,
      deposit_amount: 50,
      status: "pending"
    }
  ].filter(o => o.inquiry_id);

  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(orders)
    .select();

  if (orderError) {
    console.error("Error inserting orders:", orderError);
  } else {
    console.log(`Inserted ${orderData.length} orders.`);
  }

  // Communications
  const comms = [
    {
      inquiry_id: inquiryData.find(i => i.email === "alice@dummy.com")?.id,
      type: "email",
      content: "Sent initial quote and design sketches."
    },
    {
      inquiry_id: inquiryData.find(i => i.email === "alice@dummy.com")?.id,
      type: "call",
      content: "Discussed flavor options, they decided on Vanilla Bean."
    },
    {
      inquiry_id: inquiryData.find(i => i.email === "bob@dummy.com")?.id,
      type: "email",
      content: "Followed up on inquiry, waiting for response."
    }
  ].filter(c => c.inquiry_id);

  const { data: commData, error: commError } = await supabase
    .from('communications')
    .insert(comms)
    .select();

  if (commError) {
    console.error("Error inserting communications:", commError);
  } else {
    console.log(`Inserted ${commData.length} communications.`);
  }

  console.log("Finished seeding database.");
}

seed();
