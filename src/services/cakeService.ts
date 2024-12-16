import { supabase } from '../lib/supabase';
import { Cake } from '../types';

const parseCakeData = (cake: any): Cake => {
  return {
    ...cake,
    // Parse ingredients string into array if it's a string
    ingredients: typeof cake.ingredients === 'string' 
      ? JSON.parse(cake.ingredients.replace(/'/g, '"'))
      : cake.ingredients
  };
};

export const cakeService = {
  async getAllCakes(): Promise<Cake[]> {
    const { data, error } = await supabase
      .from('cakes')
      .select('*')
      .eq('available', true);

    if (error) throw error;
    return data.map(parseCakeData);
  },

  async getCakesByCategory(category: string): Promise<Cake[]> {
    const { data, error } = await supabase
      .from('cakes')
      .select('*')
      .eq('category', category)
      .eq('available', true);

    if (error) throw error;
    return data.map(parseCakeData);
  },

  async getCakeById(id: string): Promise<Cake | null> {
    const { data, error } = await supabase
      .from('cakes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data ? parseCakeData(data) : null;
  },
};