export interface Profile {
  id: string;
  user_id: string;
  full_name?: string;
  phone?: string;
  address?: string;
  pincode?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  user_id: string;
  admin_level: 'admin' | 'super_admin';
  permissions: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: {
    full_name: string;
    phone: string;
    address: string;
    pincode: string;
  };
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_title: string;
  product_category?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface Transaction {
  id: string;
  order_id: string;
  transaction_id?: string;
  amount: number;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  payment_method?: string;
  gateway_response?: Record<string, any>;
  created_at: string;
  updated_at: string;
}