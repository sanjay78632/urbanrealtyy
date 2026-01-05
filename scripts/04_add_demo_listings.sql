-- Demo Listings for Real Estate Broker Platform
-- This script adds sample properties across Ahmedabad and Gandhinagar

-- First, let's get a broker user ID. If you don't have one, create a test account at /auth/signup
-- For demo purposes, we'll use a placeholder UUID that you should replace with your actual user ID

-- Insert demo properties
INSERT INTO properties (
  title,
  description,
  price,
  location,
  city,
  type,
  transaction_type,
  bedrooms,
  bathrooms,
  area_sqft,
  image_url,
  created_by
) VALUES
-- Ahmedabad Apartments (Rent)
(
  'Modern 2BHK in Satellite',
  'Spacious apartment with modern amenities, gym facility, 24/7 security. Prime location near shopping malls and restaurants.',
  35000,
  'Satellite, Ahmedabad',
  'Ahmedabad',
  'apartment',
  'rent',
  2,
  2,
  1100,
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Luxury 3BHK Penthouse',
  'High-end penthouse with panoramic city views, private terrace, and premium furnishings. Swimming pool and gym access.',
  75000,
  'Prahlad Nagar, Ahmedabad',
  'Ahmedabad',
  'apartment',
  'rent',
  3,
  3,
  2200,
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
  (SELECT id FROM auth.users LIMIT 1)
),

-- Ahmedabad Offices (Buy)
(
  'Commercial Office Space',
  'Fully equipped office space with conference rooms, parking, and high-speed internet. Ideal for startups and established companies.',
  8500000,
  'CG Road, Ahmedabad',
  'Ahmedabad',
  'office',
  'buy',
  NULL,
  2,
  1500,
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=400&fit=crop',
  (SELECT id FROM auth.users LIMIT 1)
),

-- Ahmedabad Houses (Buy)
(
  '4BHK Independent House',
  'Beautiful independent house with garden, modern kitchen, and ample parking. Located in a peaceful residential area.',
  15000000,
  'Thaltej, Ahmedabad',
  'Ahmedabad',
  'house',
  'buy',
  4,
  3,
  3500,
  'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=500&h=400&fit=crop',
  (SELECT id FROM auth.users LIMIT 1)
),

-- Gandhinagar Apartments (Rent)
(
  '1BHK Compact Apartment',
  'Affordable compact apartment perfect for individuals or couples. Close to public transport and local shops.',
  18000,
  'Sector 14, Gandhinagar',
  'Gandhinagar',
  'apartment',
  'rent',
  1,
  1,
  650,
  'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&h=400&fit=crop',
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Furnished 2BHK Apartment',
  'Fully furnished apartment with all modern appliances, ready to move in. Great locality with schools and hospitals nearby.',
  42000,
  'Sector 22, Gandhinagar',
  'Gandhinagar',
  'apartment',
  'rent',
  2,
  2,
  1050,
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
  (SELECT id FROM auth.users LIMIT 1)
),

-- Gandhinagar Houses (Buy)
(
  '3BHK Villa',
  'Spacious villa with large garden and modern architecture. Gated community with 24/7 security and excellent amenities.',
  12000000,
  'Sector 30, Gandhinagar',
  'Gandhinagar',
  'house',
  'buy',
  3,
  2,
  2800,
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop',
  (SELECT id FROM auth.users LIMIT 1)
),

-- Gandhinagar Offices (Rent)
(
  'Small Office Suite',
  'Compact office space with all utilities included. Perfect for consultants and freelancers. Flexible lease terms available.',
  25000,
  'Sector 11, Gandhinagar',
  'Gandhinagar',
  'office',
  'rent',
  NULL,
  1,
  400,
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop',
  (SELECT id FROM auth.users LIMIT 1)
),

-- More Ahmedabad Listings
(
  'Studio Apartment',
  'Cozy studio apartment ideal for students or working professionals. Basic amenities with a convenient location.',
  20000,
  'Vastrapur, Ahmedabad',
  'Ahmedabad',
  'apartment',
  'rent',
  1,
  1,
  500,
  'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&h=400&fit=crop',
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Commercial Retail Shop',
  'Prime retail shop in high traffic area. Perfect for showroom, boutique, or restaurant business.',
  1200000,
  'Ashram Road, Ahmedabad',
  'Ahmedabad',
  'office',
  'buy',
  NULL,
  1,
  800,
  'https://images.unsplash.com/photo-1441984904556-0ac8d9ff0908?w=500&h=400&fit=crop',
  (SELECT id FROM auth.users LIMIT 1)
);
