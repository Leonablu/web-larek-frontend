import { Product } from '../models/product';
// Интерфейс для сервиса работы с корзиной
export interface BasketServiceInterface {
	addToBasket(product: Product): void;
	removeFromBasket(productId: string): void;
	getBasketItems(): Product[];
	getBasketItemCount(): number;
	clearBasket(): void;
}
