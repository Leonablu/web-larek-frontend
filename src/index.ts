import './scss/styles.scss';

import { ProductAPI } from './components/apiClients';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ProductListComponent } from './components/product-list-component';
import { PaymentFormComponent } from './components/pay-forms-component';
import { ContactFormComponent } from './components/contact-forms-component';
import { BasketComponent } from './components/basket-component';
import { SuccessPurchaseComponent } from './components/success-purchase-component';

const events = new EventEmitter();
export const api = new ProductAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны
export const basketModalElement = document.getElementById(
	'basket-modal'
) as HTMLElement;
export const paymentModalElement = document.getElementById(
	'payment-modal'
) as HTMLElement;
export const contactModalElement = document.getElementById(
	'contact-form-modal'
) as HTMLElement;

export const basketComponent = new BasketComponent(
	basketModalElement,
	basketModalElement!
);
export const paymentFormComponent = new PaymentFormComponent(
	paymentModalElement!
);
export const contactFormComponent = new ContactFormComponent(
	contactModalElement!
);

// Установка обработчика успешной покупки для формы контактов
contactFormComponent.setOnSuccessPurchase((orderData) => {
	api
		.createOrder(orderData)
		.then((order) => {
			const successPurchaseModal = new SuccessPurchaseComponent(document.body);
			successPurchaseModal.open(BasketComponent.exampleBasketData.total);
			basketComponent.clearBasket();
			contactFormComponent.close();
		})
		.catch((error) => {
			console.error('Ошибка при отправке заказа на сервер:', error);
			if (error.response) {
				console.error('Ответ сервера:', error.response.data);
			}
		});
});

// Получение списка продуктов и отрисовка их на странице
api
	.getProductList()
	.then((result) => {
		const container = document.querySelector('.gallery') as HTMLElement;
		const modalContainer = document.getElementById(
			'modal-container'
		) as HTMLElement;

		if (container) {
			container.innerHTML = '';

			result.forEach((product) => {
				const productListComponent = new ProductListComponent(
					document.createElement('div'),
					modalContainer,
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
