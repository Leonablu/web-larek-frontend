import { Product } from "../models/product";
// Интерфейс для сервиса работы с корзиной
export interface CartServiceInterface {
  addToCart(product: Product): void;
  removeFromCart(productId: string): void;
  getCartItems(): Product[];
  getCartItemCount(): number;
  clearCart(): void;
}