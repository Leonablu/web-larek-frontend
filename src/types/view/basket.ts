import { DisplayProduct } from "./product";

// Интерфейс для элемента в корзине
export interface BasketItem {
  product: DisplayProduct;
  quantity: number;
}
// Интерфейс для отображения корзины
export interface DisplayBasket {
  items: BasketItem[];
  total: string; 
}
// Тип настроек для отображения элемента в корзине
export interface BasketItemSetting {
  index: number;
  title: string;
  price: string;
  canRemove: boolean; // Показывает, может ли элемент быть удален
}
// Тип настроек для отображения корзины
export interface DisplayBasketSetting {
  title: string;
  checkoutButton: boolean; // Показывает, показывать ли кнопку оформления заказа
  price: string;
}

