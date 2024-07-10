import { Form } from './base/component-form';
import { Modal } from './base/modal';
import { DisplayContactForm } from '../types/view/contactsForms';
import { contactFormComponent, paymentFormComponent } from '..';
import { BasketComponent } from './basket-component';

// Компонент формы контактной информации
export class ContactFormComponent extends Form<DisplayContactForm> {
	private modal: Modal;
	private emailInput: HTMLInputElement;
	private phoneNumberInput: HTMLInputElement;
	private errorEmail: HTMLElement;
	private errorPhone: HTMLElement;
	private payButton: HTMLButtonElement;
	private closeButton: HTMLButtonElement;
	private onSuccessPurchase?: (orderData: any) => void;

	// Инициализация элементов интерфейса
	constructor(container: HTMLElement) {
		super(container);

		const modalElement = this.container.closest('.modal') as HTMLElement;
		this.modal = new Modal(modalElement);
		// Клонирование шаблона из <template>
		const modalContent = container.querySelector(
			'.modal__content'
		) as HTMLElement;

		if (modalContent.children.length === 0) {
			const template = document.getElementById(
				'contacts'
			) as HTMLTemplateElement;
			if (!template) {
				throw new Error('Contacts template not found');
			}
			const templateContent = template.content.cloneNode(true) as HTMLElement;
			modalContent.appendChild(templateContent);
		}

		this.emailInput = modalElement.querySelector(
			'.form__input[type="text"][placeholder="Введите Email"]'
		) as HTMLInputElement;
		this.phoneNumberInput = modalElement.querySelector(
			'.form__input[type="text"][placeholder="+7 ("]'
		) as HTMLInputElement;
		this.errorEmail = modalElement.querySelector('.error-email') as HTMLElement;
		this.errorPhone = modalElement.querySelector('.error-phone') as HTMLElement;
		this.payButton = modalElement.querySelector(
			'.pay__button'
		) as HTMLButtonElement;
		this.closeButton = modalElement.querySelector(
			'.modal__close'
		) as HTMLButtonElement;

		// Добавляем слушатели событий на изменение в полях ввода
		this.emailInput.addEventListener('input', () => {
			this.validateEmail();
			this.updatePayButtonState();
		});
		this.phoneNumberInput.addEventListener('input', () => {
			this.validatePhoneNumber();
			this.updatePayButtonState();
		});

		this.updatePayButtonState();

		this.init();
	}

	// Инициализация компонента
	private init() {
		this.attachEventListeners();
	}

	// Подключение обработчиков событий
	private attachEventListeners() {
		this.payButton.addEventListener('click', () => {
			if (this.validateEmail() && this.validatePhoneNumber()) {
				const orderData = this.openSuccessPurchaseModal();
				if (this.onSuccessPurchase) {
					this.onSuccessPurchase(orderData);
				}
			} else {
				console.log(
					'Пожалуйста, заполните корректно форму контактной информации.'
				);
			}
		});

		// Закрытие окна контактов при нажатии на кнопку закрытия
		this.closeButton.addEventListener('click', () => {
			this.close();
		});
	}

	// Обновление состояния кнопки оплаты
	private updatePayButtonState() {
		const isValidEmail = this.validateEmail();
		const isValidPhone = this.validatePhoneNumber();

		if (isValidEmail && isValidPhone) {
			this.enableSubmitButton();
		} else {
			this.disableSubmitButton();
		}
	}

	// Валидация Email
	public validateEmail(): boolean {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValid = emailPattern.test(this.emailInput.value.trim());

		this.errorEmail.style.display = isValid ? 'none' : 'block';

		return isValid;
	}

	// Валидация номера телефона
	public validatePhoneNumber(): boolean {
		const phonePattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
		const isValid = phonePattern.test(this.phoneNumberInput.value.trim());

		this.errorPhone.style.display = isValid ? 'none' : 'block';

		return isValid;
	}

	// Открытие модального окна
	public open() {
		this.modal.open();
	}

	// Закрытие модального окна
	public close() {
		this.modal.close();
	}

	getEmailInputValue(): string {
		return this.emailInput.value.trim();
	}

	getPhoneNumberInputValue(): string {
		return this.phoneNumberInput.value.trim();
	}

	// Провекрка Email и номоера телефона
	protected handleFormSubmit(): void {
		const formData = {
			email: this.getEmailInputValue(),
			phoneNumber: this.getPhoneNumberInputValue(),
		};
		console.log('Отправка данных:', formData);
	}

	// Обработка успешного оформления покупки
	private openSuccessPurchaseModal() {
		const products: string[] = BasketComponent.exampleBasketData.items.map(
			(item) => item.product.id
		);
		const totalAmount = parseFloat(
			BasketComponent.exampleBasketData.total.replace(' синапсов', '')
		);

		const orderData = {
			payment: paymentFormComponent.getSelectedPaymentMethod(),
			email: contactFormComponent.getEmailInputValue(),
			phone: contactFormComponent.getPhoneNumberInputValue(),
			address: paymentFormComponent.getDeliveryAddress(),
			total: totalAmount,
			items: products,
		};

		console.log('Отправка данных на сервер:', orderData);
		return orderData;
	}

	// Установка обратного вызова успешного оформления покупки
	public setOnSuccessPurchase(callback: (orderData: any) => void) {
		this.onSuccessPurchase = callback;
	}
}
