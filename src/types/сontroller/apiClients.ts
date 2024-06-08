// Интерфейс API-клиента
import { Product } from "../models/product";
import { Order } from "../models/order";
// Интерфейс API-клиента
export interface APIClientInterface {
  getProducts(): Promise<Product[]>;
  createOrder(products: Product[]): Promise<Order>;
}