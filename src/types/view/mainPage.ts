import { DisplayProduct } from "./product";
import { DisplayBasket } from "./basket";
import { ContactForm } from "../models/forms";

// Интерфейс для главной страницы
export interface MainPage {
  products: DisplayProduct[];
  basket: DisplayBasket;
  contactForm: ContactForm;
}
// Тип настроек для главной страницы
export interface MainPageSetting {
  products: DisplayProduct[];
  basket: DisplayBasket;
  contactForm: ContactForm;
}