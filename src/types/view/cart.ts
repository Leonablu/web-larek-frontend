import { DisplayProduct } from "./product";

// Интерфейс для элемента в корзине
export interface CartItem {
  product: DisplayProduct;
  quantity: number;
}
// Интерфейс для отображения корзины
export interface DisplayCart {
  items: CartItem[];
  total: string; 
}