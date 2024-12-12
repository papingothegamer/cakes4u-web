export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  available: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface CartItem {
  cake: Cake;
  quantity: number;
}