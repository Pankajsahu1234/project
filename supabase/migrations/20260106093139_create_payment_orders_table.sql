/*
  # Create Payment Orders Table

  1. New Tables
    - `payment_orders`
      - `id` (uuid, primary key)
      - `product_title` (text)
      - `quantity` (integer)
      - `amount` (numeric)
      - `payment_method` (text)
      - `transaction_ref` (text, unique)
      - `status` (text) - pending, completed, failed
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `payment_orders` table
    - Public table for recording payments (no auth required for initial creation)
*/

CREATE TABLE IF NOT EXISTS payment_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_title text NOT NULL,
  quantity integer NOT NULL,
  amount numeric NOT NULL,
  payment_method text NOT NULL,
  transaction_ref text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payment_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create payment orders"
  ON payment_orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read payment orders"
  ON payment_orders
  FOR SELECT
  USING (true);
