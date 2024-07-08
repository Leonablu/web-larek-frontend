import { DisplayProduct } from './product';
import { DisplayBasket } from './basket';
import { ContactsForms } from '../models/contactsForms';

// Интерфейс для главной страницы
export interface MainPage {
	products: DisplayProduct[];
	basket: DisplayBasket;
	contactForm: ContactsForms;
}
// Тип настроек для главной страницы
export interface MainPageSetting {
	products: DisplayProduct[];
	basket: DisplayBasket;
	contactForm: ContactsForms;
}
