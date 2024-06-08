import { DisplayProduct } from "./product";
import { DisplayCart } from "./cart";
import { ContactForm } from "../models/forms";

// Интерфейс для главной страницы
export interface MainPage {
  products: DisplayProduct[];
  cart: DisplayCart;
  contactForm: ContactForm;
}