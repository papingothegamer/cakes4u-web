import { supabase } from '../lib/supabase';
import { Cake } from '../types';

export const cakeService = {
  async getAllCakes(): Promise<Cake[]> {
    const { data, error } = await supabase
      .from('cakes')
      .select('*')
      .eq('available', true);

    if (error) throw error;
    return data;
  },

  async getCakesByCategory(category: string): Promise<Cake[]> {
    const { data, error } = await supabase
      .from('cakes')
      .select('*')
      .eq('category', category)
      .eq('available', true);

    if (error) throw error;
    return data;
  },

  async getCakeById(id: string): Promise<Cake | null> {
    const { data, error } = await supabase
      .from('cakes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },
};