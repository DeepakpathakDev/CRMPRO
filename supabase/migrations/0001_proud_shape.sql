/*
  # CRM Platform Database Schema

  1. New Tables
    - `employees`
      - Basic employee information
      - Authentication credentials
      - Group and type categorization
    - `purchases`
      - Purchase order details
      - Vendor information
      - Product and pricing details
    - `tasks`
      - Task details and assignments
      - Priority levels
      - Recurring task settings
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  join_date date NOT NULL DEFAULT CURRENT_DATE,
  employee_type text NOT NULL,
  group_name text,
  employee_id text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_name text NOT NULL,
  vendor_id text,
  purchase_date date NOT NULL,
  delivery_date date,
  product_name text NOT NULL,
  quantity integer NOT NULL,
  unit_price decimal(10,2) NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  status text NOT NULL DEFAULT 'pending',
  due_date timestamptz NOT NULL,
  assigned_to uuid REFERENCES employees(id),
  is_recurring boolean DEFAULT false,
  recurrence_pattern text,
  recurrence_end_date timestamptz,
  created_by uuid REFERENCES employees(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Employees can view their own data"
  ON employees
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Employees can view all purchases"
  ON purchases
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Employees can view assigned tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = assigned_to OR auth.uid() = created_by);