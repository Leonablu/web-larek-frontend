import {
	api,
	basketComponent,
	basketCounter,
	exampleBasketData,
	paymentFormComponent,
} from '../..';
import { Component } from '../../components/base/component';
import { closeModal, openModal } from '../../components/base/modal';
import { BasketItem } from './basket';
import { SuccessPurchaseComponent } from './successPurchase';

// Интерфейс для отображения формы контактной информации
export interface DisplayContactForm {
	email: string;
	phoneNumber: string;
}

// Тип настроек для отображения формы контактной информации
export interface DisplayContactFormSetting {
	email: string;
	phoneNumber: string;
}

// Компонент формы контактной информации
export class ContactFormComponent extends Component<DisplayContactForm> {
	private modalElement: HTMLElement;
	private emailInput: HTMLInputElement;
	private phoneNumberInput: HTMLInputElement;
	private payButton: HTMLButtonElement;
	private errorEmail: HTMLElement;
	private errorPhone: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);
		this.modalElement = this.container.closest('.modal') as HTMLElement;

		this.emailInput = this.modalElement.querySelector(
			'.form__input[type="text"][placeholder="Введите Email"]'
		) as HTMLInputElement;
		this.phoneNumberInput = this.modalElement.querySelector(
			'.form__input[type="text"][placeholder="+7 ("]'
		) as HTMLInputElement;
		this.payButton = this.modalElement.querySelector(
			'.modal__actions button'
		) as HTMLButtonElement;
		this.errorEmail = this.modalElement.querySelector(
			'.error-email'
		) as HTMLElement;
		this.errorPhone = this.modalElement.querySelector(
			'.error-phone'
		) as HTMLElement;

		// Добавляем слушатели событий на изменение в полях ввода
		this.emailInput.addEventListener('input', () => {
			this.validateEmail();
			this.updatePayButtonState(); // Обновляем состояние кнопки после ввода Email
		});
		this.phoneNumberInput.addEventListener('input', () => {
			this.validatePhoneNumber();
			this.updatePayButtonState(); // Обновляем состояние кнопки после ввода номера телефона
		});

		this.updatePayButtonState();

		this.payButton.addEventListener('click', (event) => {
			event.preventDefault();
			if (this.validateEmail() && this.validatePhoneNumber()) {
				this.openSuccessPurchaseModal();
			}
		});

		const closeButton = this.modalElement.querySelector(
			'.modal__close'
		) as HTMLButtonElement;
		closeButton.addEventListener('click', () => {
			this.close();
		});
	}

	private updatePayButtonState() {
		const isValidEmail = this.validateEmail();
		const isValidPhone = this.validatePhoneNumber();

		if (isValidEmail && isValidPhone) {
			this.payButton.disabled = false;
		} else {
			this.payButton.disabled = true;
		}
	}

	private validateEmail(): boolean {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярное выражение для проверки Email
		const isValid = emailPattern.test(this.emailInput.value.trim());

		if (!isValid) {
			this.errorEmail.style.display = 'block';
		} else {
			this.errorEmail.style.display = 'none';
		}

		return isValid;
	}

	private validatePhoneNumber(): boolean {
		const phonePattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/; // Регулярное выражение для проверки номера телефона
		const isValid = phonePattern.test(this.phoneNumberInput.value.trim());

		if (!isValid) {
			this.errorPhone.style.display = 'block';
		} else {
			this.errorPhone.style.display = 'none';
		}

		return isValid;
	}

	public open() {
		if (!this.modalElement) return;
		openModal(this.modalElement);
	}

	public close() {
		if (!this.modalElement) return;
		closeModal(this.modalElement);
	}

	private openSuccessPurchaseModal() {
		if (this.validateEmail() && this.validatePhoneNumber()) {
			const products: string[] = exampleBasketData.items.map(
				(item: BasketItem) => item.product.id
			);
			const totalAmount = parseFloat(
				exampleBasketData.total.replace(' синапсов', '')
			);

			const orderData = {
				payment: paymentFormComponent.getSelectedPaymentMethod(),
				email: this.emailInput.value.trim(),
				phone: this.phoneNumberInput.value.trim(),
				address: paymentFormComponent.getDeliveryAddress(),
				total: totalAmount,
				items: products,
			};

			console.log('Отправка данных на сервер:', orderData); // Логирование данных перед отправкой

			api
				.createOrder(orderData)
				.then((order) => {
					const successPurchaseModal = new SuccessPurchaseComponent(
						document.body
					);
					successPurchaseModal.open(exampleBasketData.total);
					this.clearBasket();
					this.close();
				})
				.catch((error) => {
					console.error('Ошибка при отправке заказа на сервер:', error);
					if (error.response) {
						console.error('Ответ сервера:', error.response.data);
					}
				});
		}
	}

	private clearBasket() {
		exampleBasketData.items = [];
		exampleBasketData.total = '0 синапсов';

		basketComponent.setBasketData(exampleBasketData);
		basketCounter.textContent = exampleBasketData.items.length.toString();
	}
}
