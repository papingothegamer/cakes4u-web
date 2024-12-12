export interface Database {
  public: {
    Tables: {
      cakes: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          image: string;
          category: string;
          ingredients: string[];
          available: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['cakes']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['cakes']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          status: 'pending' | 'processing' | 'completed' | 'cancelled';
          total: number;
          payment_intent: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          cake_id: string;
          quantity: number;
          price: number;
        };
        Insert: Omit<Database['public']['Tables']['order_items']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>;
      };
      custom_orders: {
        Row: {
          id: string;
          user_id: string;
          occasion: string;
          size: string;
          flavor: string;
          details: string;
          required_date: string;
          status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['custom_orders']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['custom_orders']['Insert']>;
      };
    };
  };
}