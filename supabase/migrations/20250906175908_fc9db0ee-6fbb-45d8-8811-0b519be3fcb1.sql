-- Create products table for managing books, journals, and catalogs
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  author text,
  description text,
  price numeric NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'books',
  stock integer NOT NULL DEFAULT 0,
  image_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create category enum constraint
ALTER TABLE public.products 
ADD CONSTRAINT products_category_check 
CHECK (category IN ('books', 'journals', 'catalogs'));

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products
CREATE POLICY "Everyone can read active products" 
ON public.products 
FOR SELECT 
USING (is_active = true OR EXISTS (
  SELECT 1 FROM admin_users 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Admins can create products" 
ON public.products 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE user_id = auth.uid() 
  AND admin_level = ANY (ARRAY['admin'::text, 'super_admin'::text])
));

CREATE POLICY "Admins can update products" 
ON public.products 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE user_id = auth.uid() 
  AND admin_level = ANY (ARRAY['admin'::text, 'super_admin'::text])
));

CREATE POLICY "Admins can delete products" 
ON public.products 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE user_id = auth.uid() 
  AND admin_level = ANY (ARRAY['admin'::text, 'super_admin'::text])
));

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true);

-- Create storage policies for product images
CREATE POLICY "Product images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'product-images' AND EXISTS (
  SELECT 1 FROM admin_users 
  WHERE user_id = auth.uid() 
  AND admin_level = ANY (ARRAY['admin'::text, 'super_admin'::text])
));

CREATE POLICY "Admins can update product images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'product-images' AND EXISTS (
  SELECT 1 FROM admin_users 
  WHERE user_id = auth.uid() 
  AND admin_level = ANY (ARRAY['admin'::text, 'super_admin'::text])
));

CREATE POLICY "Admins can delete product images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'product-images' AND EXISTS (
  SELECT 1 FROM admin_users 
  WHERE user_id = auth.uid() 
  AND admin_level = ANY (ARRAY['admin'::text, 'super_admin'::text])
));

-- Create function to update products timestamp
CREATE OR REPLACE FUNCTION public.update_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_products_updated_at();

-- Enable realtime for products table
ALTER TABLE public.products REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;

-- Enable realtime for orders and transactions (for admin real-time updates)
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

ALTER TABLE public.transactions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;