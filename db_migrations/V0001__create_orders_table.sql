CREATE TABLE t_p69549265_home_appliance_repai.orders (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  breakdown TEXT,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);