-- Fix the remaining security warnings - update existing functions to set search_path

-- Fix the generate_order_number function
CREATE OR REPLACE FUNCTION public.generate_order_number()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  RETURN 'LA' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(EXTRACT(EPOCH FROM NOW())::bigint % 10000, 4, '0');
END;
$function$;

-- Fix the create_order_with_items function  
CREATE OR REPLACE FUNCTION public.create_order_with_items(p_user_id uuid, p_total_amount numeric, p_shipping_address jsonb, p_payment_method text, p_items jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
DECLARE
  v_order_id uuid;
  v_order_number text;
  v_item jsonb;
BEGIN
  -- Generate order number
  v_order_number := public.generate_order_number();
  
  -- Create order
  INSERT INTO public.orders (
    user_id,
    order_number,
    total_amount,
    shipping_address,
    payment_method
  ) VALUES (
    p_user_id,
    v_order_number,
    p_total_amount,
    p_shipping_address,
    p_payment_method
  ) RETURNING id INTO v_order_id;
  
  -- Create order items
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    INSERT INTO public.order_items (
      order_id,
      product_id,
      product_title,
      product_category,
      quantity,
      unit_price,
      total_price
    ) VALUES (
      v_order_id,
      v_item->>'product_id',
      v_item->>'product_title',
      v_item->>'product_category',
      (v_item->>'quantity')::integer,
      (v_item->>'unit_price')::decimal,
      (v_item->>'total_price')::decimal
    );
  END LOOP;
  
  RETURN v_order_id;
END;
$function$;