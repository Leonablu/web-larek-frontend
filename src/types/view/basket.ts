import { DisplayProduct } from './product';

// Тип данных для элемента в корзине.
export interface BasketItem {
	product: DisplayProduct;
	quantity: number;
}
// Тип данных для отображения корзины.
export interface DisplayBasket {
	items: BasketItem[];
	total: string;
}
// Тип настроек для элемента в корзине.
export interface BasketItemSetting {
	index: number;
	title: string;
	price: string;
	canRemove: boolean;
}
// Тип настроек для отображения корзины.
export interface DisplayBasketSetting {
	title: string;
	checkoutButton: boolean;
	price: string;
}
