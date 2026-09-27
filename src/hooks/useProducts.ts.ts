import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrop = async () => {
      try {
        setLoading(true);
        
        // Sabse simple aur bulletproof query
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          console.error('Asli Error:', error);
          throw error;
        }
        
        if (data) {
          setProducts(data as Product[]);
        }
      } catch (err: any) {
        console.error('Supabase fetch error:', err.message);
        setError('FAILED TO LOAD THE DROP. PLEASE REFRESH.');
      } finally {
        setLoading(false);
      }
    };

    fetchDrop();
  }, []);

  return { products, loading, error };
};