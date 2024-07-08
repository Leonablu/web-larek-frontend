// Перечисление событий
export enum Events {
	PRODUCT_ADDED = 'product_added',
	ORDER_PLACED = 'order_placed',
}
// Интерфейс события добавления продукта
export interface ProductAddedEvent {
	productId: string;
}
// Интерфейс события оформления заказа
export interface OrderPlacedEvent {
	orderId: string;
	orderTotal: number;
}
