// Тип данных для отображения продукта
export interface DisplayProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	price: number;
}

// Тип настроек для отображения продукта
export interface DisplayProductSetting {
	id: string;
	category: string;
	price: number;
	title: string;
	image: string;
	description: string;
}
