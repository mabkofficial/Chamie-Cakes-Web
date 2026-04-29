-- Create Inquiries Table
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'new', -- new, pending, quoted, converted, declined
  
  -- Customer Info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  contact_method TEXT DEFAULT 'email',
  
  -- Event Info
  event_type TEXT,
  event_date DATE,
  event_time TIME,
  delivery_method TEXT,
  address TEXT,
  
  -- Cake Specs
  servings INTEGER,
  tiers TEXT,
  flavor TEXT,
  filling TEXT,
  dietary TEXT[], -- Array of strings
  description TEXT,
  colors TEXT,
  budget TEXT,
  
  -- Metadata
  notes TEXT
);

-- Create Orders Table (Linked to Inquiry)
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  inquiry_id UUID REFERENCES inquiries(id),
  status TEXT DEFAULT 'pending', -- pending, deposit_paid, in_progress, ready, delivered, cancelled
  
  -- Financials
  total_amount NUMERIC(10, 2),
  deposit_amount NUMERIC(10, 2),
  is_deposit_paid BOOLEAN DEFAULT false,
  is_fully_paid BOOLEAN DEFAULT false,
  
  -- Delivery Tracking
  delivery_status TEXT DEFAULT 'not_started',
  delivery_time TIMESTAMPTZ,
  
  -- Notes
  admin_notes TEXT
);

-- Create Customers Table for CRM
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  total_orders INTEGER DEFAULT 0,
  favorite_flavor TEXT,
  notes TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Create policy for Admin access (Simplified for now)
-- In a real production app, you would restrict this to authenticated admin users
CREATE POLICY "Enable all for admin" ON inquiries FOR ALL USING (true);
CREATE POLICY "Enable all for admin" ON orders FOR ALL USING (true);
CREATE POLICY "Enable all for admin" ON customers FOR ALL USING (true);

-- Create Communications Table for tracking outreach
CREATE TABLE communications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  inquiry_id UUID REFERENCES inquiries(id),
  type TEXT DEFAULT 'email', -- email, text, call, other
  content TEXT NOT NULL,
  author TEXT DEFAULT 'Chamie'
);

-- Enable RLS for communications
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for admin" ON communications FOR ALL USING (true);
