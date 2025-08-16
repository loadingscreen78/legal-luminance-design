import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Order, OrderItem, Transaction } from '@/types/database';
import { useAuth } from './useAuth';

export const useOrders = () => {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!user) return;

    setLoading(true);
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items(*),
          transactions(*)
        `)
        .order('created_at', { ascending: false });

      // If not admin, only fetch user's orders
      if (!isAdmin) {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: {
    items: Array<{
      product_id: string;
      product_title: string;
      product_category: string;
      quantity: number;
      unit_price: number;
      total_price: number;
    }>;
    total_amount: number;
    shipping_address: {
      full_name: string;
      phone: string;
      address: string;
      pincode: string;
    };
    payment_method: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase.rpc('create_order_with_items', {
      p_user_id: user.id,
      p_total_amount: orderData.total_amount,
      p_shipping_address: orderData.shipping_address,
      p_payment_method: orderData.payment_method,
      p_items: orderData.items,
    });

    if (error) throw error;

    // Refresh orders
    await fetchOrders();

    return data;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    if (!isAdmin) throw new Error('Admin access required');

    const { error } = await supabase
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId);

    if (error) throw error;

    // Refresh orders
    await fetchOrders();
  };

  const createTransaction = async (transactionData: {
    order_id: string;
    transaction_id?: string;
    amount: number;
    status: Transaction['status'];
    payment_method?: string;
    gateway_response?: Record<string, any>;
  }) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transactionData)
      .select()
      .single();

    if (error) throw error;

    // Update order payment status
    await supabase
      .from('orders')
      .update({ 
        payment_status: transactionData.status === 'success' ? 'paid' : 'failed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', transactionData.order_id);

    // Refresh orders
    await fetchOrders();

    return data;
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, isAdmin]);

  return {
    orders,
    loading,
    createOrder,
    updateOrderStatus,
    createTransaction,
    refetch: fetchOrders,
  };
};