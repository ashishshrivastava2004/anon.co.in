import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

// Helper to Safely Parse JSON Strings/Arrays at the source
const safeParseArray = (field: any) => {
  if (Array.isArray(field)) return field;
  if (typeof field === 'string') {
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

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
          // Data ko state me set karne se pehle sanitize (clean) kar rahe hain
          const sanitizedData = data.map((item: any) => ({
            ...item,
            // Fallback for both 'images_url' (DB column) and 'images' (frontend type)
            images: safeParseArray(item.images_url || item.images),
            sizes: safeParseArray(item.sizes)
          }));
          
          setProducts(sanitizedData as Product[]);
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