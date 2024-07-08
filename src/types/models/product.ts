// Тип данных для отдельного продукта
export interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

// Тип данных для списка продуктов
export interface ProductList {
	total: number;
	items: Product[];
}
