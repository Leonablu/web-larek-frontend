import { contactFormComponent, paymentFormComponent } from '..';
import { DisplayPaymentForm } from '../types/view/payForms';
import { Form } from './base/component-form';
import { Modal } from './base/modal';

// Класс компонента формы оплаты
export class PaymentFormComponent extends Form<DisplayPaymentForm> {
	private modal: Modal;
	private selectedPaymentMethod: 'online' | 'offline' = 'online';
	private deliveryAddressInput: HTMLInputElement;
	private addressErrorElement: HTMLElement;
	private nextButton: HTMLButtonElement;
	private onlinePaymentBtn: HTMLButtonElement;
	private offlinePaymentBtn: HTMLButtonElement;

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
			const template = document.getElementById('order') as HTMLTemplateElement;
			if (!template) {
				throw new Error('Contacts template not found');
			}
			const templateContent = template.content.cloneNode(true) as HTMLElement;
			modalContent.appendChild(templateContent);
		}

		// Инициализация кнопок выбора метода оплаты
		this.onlinePaymentBtn = modalElement.querySelector(
			'#online-payment-btn'
		) as HTMLButtonElement;
		this.offlinePaymentBtn = modalElement.querySelector(
			'#offline-payment-btn'
		) as HTMLButtonElement;

		// Обработчики событий для кнопок выбора метода оплаты
		this.onlinePaymentBtn.addEventListener('click', () => {
			this.selectedPaymentMethod = 'online';
			this.updateForm();
			this.checkNextButtonState();
		});

		this.offlinePaymentBtn.addEventListener('click', () => {
			this.selectedPaymentMethod = 'offline';
			this.updateForm();
			this.checkNextButtonState();
		});

		this.deliveryAddressInput = modalElement.querySelector(
			'.form__input'
		) as HTMLInputElement;
		this.addressErrorElement = modalElement.querySelector(
			'#address-error'
		) as HTMLElement;
		this.nextButton = modalElement.querySelector(
			'.modal__actions button'
		) as HTMLButtonElement;

		// Обработчик события ввода в поле адреса доставки
		this.deliveryAddressInput.addEventListener('input', () => {
			this.hideErrorMessage();
			this.checkNextButtonState();
		});

		// Обработчик события отправки формы
		const form = modalElement.querySelector('form');
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			this.onSubmit(event);
		});

		// Обработчик события закрытия модального окна
		const closeButton = modalElement.querySelector(
			'.modal__close'
		) as HTMLButtonElement;
		closeButton.addEventListener('click', () => {
			this.close();
		});

		// Проверка состояния при загрузке
		this.checkNextButtonState();
		this.validateAddressOnLoad();
	}

	// Обновление состояния формы в зависимости от выбранного метода оплаты
	private updateForm() {
		if (this.selectedPaymentMethod === 'online') {
			this.toggleClass(this.onlinePaymentBtn, 'button_alt-active', true);
			this.toggleClass(this.offlinePaymentBtn, 'button_alt-active', false);
		} else {
			this.toggleClass(this.onlinePaymentBtn, 'button_alt-active', false);
			this.toggleClass(this.offlinePaymentBtn, 'button_alt-active', true);
		}

		console.log('Выбран способ оплаты:', this.selectedPaymentMethod);
	}

	// Проверка состояния кнопки "Далее" в зависимости от валидности поля адреса доставки
	private checkNextButtonState() {
		this.setDisabled(
			this.nextButton,
			this.deliveryAddressInput.value.trim() === ''
		);
	}

	// Валидация адреса доставки при загрузке формы
	private validateAddressOnLoad() {
		if (this.deliveryAddressInput.value.trim() === '') {
			this.showErrorMessage('Пожалуйста, введите адрес доставки');
		}
	}

	// Отображение сообщения об ошибке
	private showErrorMessage(message: string) {
		this.setText(this.addressErrorElement, message);
		this.setVisible(this.addressErrorElement);
	}

	// Скрытие сообщения об ошибке
	private hideErrorMessage() {
		this.setHidden(this.addressErrorElement);
	}

	// Открытие модального окна
	public open() {
		this.modal.open();
	}

	// Закрытие модального окна
	public close() {
		this.modal.close();
	}

	// Реализация абстрактного метода handleFormSubmit
	protected handleFormSubmit(): void {
		paymentFormComponent.close();
		contactFormComponent.open();
	}

	public getSelectedPaymentMethod(): 'online' | 'offline' {
		return this.selectedPaymentMethod;
	}

	public getDeliveryAddress(): string {
		return this.deliveryAddressInput.value.trim();
	}
}
