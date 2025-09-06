import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

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
  // Joined data from orders
  orders?: {
    id: string;
    user_id: string;
    order_number: string;
    total_amount: number;
    shipping_address: any;
    profiles?: {
      full_name?: string;
    };
  };
}

export const useTransactions = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let query = supabase
        .from('transactions')
        .select(`
          *,
          orders (
            id,
            user_id,
            order_number,
            total_amount,
            shipping_address,
            profiles (
              full_name
            )
          )
        `)
        .order('created_at', { ascending: false });

      // Regular users only see their own transactions
      if (!isAdmin) {
        query = query.eq('orders.user_id', user.id);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setTransactions((data || []) as Transaction[]);
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch transactions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;
    
    fetchTransactions();

    const channel = supabase
      .channel('transactions-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'transactions' },
        () => {
          fetchTransactions(); // Refetch when transactions change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isAdmin]);

  const getRevenueStats = () => {
    if (!transactions.length) return { total: 0, thisMonth: 0, thisWeek: 0 };

    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const successfulTransactions = transactions.filter(t => t.status === 'success');

    const total = successfulTransactions.reduce((sum, t) => sum + t.amount, 0);
    const thisMonthRevenue = successfulTransactions
      .filter(t => new Date(t.created_at) >= thisMonth)
      .reduce((sum, t) => sum + t.amount, 0);
    const thisWeekRevenue = successfulTransactions
      .filter(t => new Date(t.created_at) >= thisWeek)
      .reduce((sum, t) => sum + t.amount, 0);

    return { 
      total, 
      thisMonth: thisMonthRevenue, 
      thisWeek: thisWeekRevenue 
    };
  };

  return {
    transactions,
    loading,
    getRevenueStats,
    refetch: fetchTransactions
  };
};