import './scss/styles.scss';

import { ProductAPI } from './types/сontroller/apiClients';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import {
	DisplayProductSetting,
	ProductListComponent,
} from './types/view/product';
import { BasketComponent, DisplayBasket } from './types/view/basket';
import { PaymentFormComponent } from './types/view/payForms';
import { ContactFormComponent } from './types/view/contactsForms';
const events = new EventEmitter();
export const api = new ProductAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны
export const basketButton = document.querySelector(
	'.header__basket'
) as HTMLElement;
export const basketCounter = document.querySelector(
	'.header__basket-counter'
) as HTMLElement;
export const basketModalElement = document.getElementById(
	'basket-modal'
) as HTMLElement;
export const paymentModalElement = document.getElementById(
	'payment-modal'
) as HTMLElement;
export const contactModalElement = document.getElementById(
	'contact-form-modal'
) as HTMLElement;

export const basketComponent = new BasketComponent(basketModalElement!);
export const paymentFormComponent = new PaymentFormComponent(
	paymentModalElement!
);
export const contactFormComponent = new ContactFormComponent(
	contactModalElement!
);

// Пример данных корзины
export const exampleBasketData: DisplayBasket = {
	items: [],
	total: '0 синапсов',
};

// Установка данных корзины
basketComponent.setBasketData(exampleBasketData);
basketCounter.textContent = exampleBasketData.items.length.toString();

// Открытие корзины при нажатии на кнопку
basketButton?.addEventListener('click', () => {
	basketComponent.open();
});

// Закрытие корзины при нажатии на кнопку закрытия
const closeButton = basketModalElement.querySelector(
	'.modal__close'
) as HTMLElement;
closeButton?.addEventListener('click', () => {
	basketComponent.close();
});

// Закрытие формы выбора оплаты при нажатии на кнопку закрытия
const closeButtonPayment = paymentModalElement.querySelector(
	'.modal__close'
) as HTMLElement;
closeButtonPayment?.addEventListener('click', () => {
	paymentFormComponent.close();
});

const checkoutButton = basketModalElement.querySelector(
	'.order__button'
) as HTMLElement;
checkoutButton?.addEventListener('click', () => {
	basketComponent.close();
	paymentFormComponent.open();
});

// Обработчик события для добавления в корзину
window.addEventListener(
	'addToBasket',
	(event: CustomEvent<DisplayProductSetting>) => {
		const product = event.detail;

		// Проверяем, существует ли товар в корзине
		const existingItem = exampleBasketData.items.find(
			(item) => item.product.id === product.id
		);

		if (existingItem) {
			console.log('Этот товар уже в корзине');
		} else {
			// Если товара нет в корзине, добавляем его
			const newItem = {
				product: {
					id: product.id,
					title: product.title,
					description: product.description,
					image: product.image,
					price: product.price,
				},
				quantity: 1,
			};

			exampleBasketData.items.push(newItem);
			exampleBasketData.total = calculateTotal(exampleBasketData.items);
			basketComponent.setBasketData(exampleBasketData);
			basketCounter.textContent = exampleBasketData.items.length.toString();
		}
	}
);

function calculateTotal(items: any[]): string {
	// Логика для подсчета общей суммы
	let total = 0;
	items.forEach((item) => {
		total += item.product.price * item.quantity;
	});
	return `${total} синапсов`;
}

// Получаем лоты с сервера
api
	.getProductList()
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.error(err);
	});

api
	.getProductList()
	.then((result) => {
		const container = document.querySelector('.gallery') as HTMLElement;

		if (container) {
			container.innerHTML = '';

			result.forEach((product) => {
				const productListComponent = new ProductListComponent(
					document.createElement('div'),
					product
				);
				const renderedElement = productListComponent.render();
				container.appendChild(renderedElement);
			});
		} else {
			console.error('Element with data-element="catalog" not found');
		}
	})
	.catch((err) => {
		console.error(err);
	});
