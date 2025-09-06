import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  title: string;
  author?: string;
  description?: string;
  price: number;
  category: 'books' | 'journals' | 'catalogs';
  stock: number;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useProducts = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase.from('products').select('*').order('created_at', { ascending: false });
      
      // Regular users only see active products
      if (!isAdmin) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setProducts((data || []) as Product[]);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user || !isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only admins can create products.",
        variant: "destructive",
      });
      return { error: new Error('Access denied') };
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product created successfully!",
      });

      await fetchProducts(); // Refresh the list
      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create product. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const updateProduct = async (productId: string, updates: Partial<Product>) => {
    if (!user || !isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only admins can update products.",
        variant: "destructive",
      });
      return { error: new Error('Access denied') };
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', productId)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product updated successfully!",
      });

      await fetchProducts(); // Refresh the list
      return { data, error: null };
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update product. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!user || !isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only admins can delete products.",
        variant: "destructive",
      });
      return { error: new Error('Access denied') };
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully!",
      });

      await fetchProducts(); // Refresh the list
      return { error: null };
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete product. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const uploadProductImage = async (file: File, productId?: string) => {
    if (!user || !isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only admins can upload images.",
        variant: "destructive",
      });
      return { error: new Error('Access denied') };
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${productId || Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return { data: data.publicUrl, error: null };
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel('products-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchProducts(); // Refetch when products change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isAdmin]);

  return {
    products,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    refetch: fetchProducts
  };
};