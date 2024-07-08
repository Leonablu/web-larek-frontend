import { Product } from '../models/product';
import { Order } from '../models/order';
import { Api, ApiListResponse } from '../../components/base/api';

// Интерфейс API-клиента
export interface IProductAPI {
	getProductList: () => Promise<Product[]>;
	createOrder(orderData: {
		payment: string;
		email: string;
		phone: string;
		address: string;
		total: number;
		items: string[];
	}): Promise<Order>;
}

export class ProductAPI extends Api implements IProductAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductList(): Promise<Product[]> {
		return this.get('/product').then((data: ApiListResponse<Product>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	createOrder(orderData: {
		payment: string;
		email: string;
		phone: string;
		address: string;
		total: number;
		items: string[];
	}): Promise<Order> {
		return this.post('/order', orderData).then((data: Order) => data);
	}
}
