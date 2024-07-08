import { contactFormComponent } from '../..';
import { Component } from '../../components/base/component';
import { openModal, closeModal } from '../../components/base/modal';

// Интерфейс для отображения формы способа оплаты
export interface DisplayPaymentForm {
	onlinePayment: boolean;
	deliveryAddress: string;
}

// Тип настроек для отображения формы способа оплаты
export interface DisplayPaymentFormSetting {
	onlinePayment: boolean;
	deliveryAddress: string;
}

// Компонент формы оплаты
export class PaymentFormComponent extends Component<DisplayPaymentForm> {
	private modalElement: HTMLElement;
	private selectedPaymentMethod: 'online' | 'offline' = 'online';
	private deliveryAddressInput: HTMLInputElement;
	private addressErrorElement: HTMLElement;
	private nextButton: HTMLButtonElement;

	constructor(container: HTMLElement) {
		super(container);
		this.modalElement = this.container.closest('.modal') as HTMLElement;

		const onlinePaymentBtn = this.modalElement.querySelector(
			'#online-payment-btn'
		) as HTMLButtonElement;
		const offlinePaymentBtn = this.modalElement.querySelector(
			'#offline-payment-btn'
		) as HTMLButtonElement;

		onlinePaymentBtn.addEventListener('click', () => {
			this.selectedPaymentMethod = 'online';
			this.updateForm();
			this.checkNextButtonState();
		});

		offlinePaymentBtn.addEventListener('click', () => {
			this.selectedPaymentMethod = 'offline';
			this.updateForm();
			this.checkNextButtonState();
		});

		onlinePaymentBtn.classList.add('button_alt-active');
		offlinePaymentBtn.classList.remove('button_alt-active');

		this.deliveryAddressInput = this.modalElement.querySelector(
			'.form__input'
		) as HTMLInputElement;
		this.addressErrorElement = this.modalElement.querySelector(
			'#address-error'
		) as HTMLElement;
		this.nextButton = this.modalElement.querySelector(
			'.modal__actions button'
		) as HTMLButtonElement;

		this.deliveryAddressInput.addEventListener('input', () => {
			this.hideErrorMessage();
			this.checkNextButtonState();
		});

		// Проверка состояния при загрузке
		this.checkNextButtonState();
		this.validateAddressOnLoad();

		// Добавляем обработчик для кнопки "Далее"
		this.nextButton.addEventListener('click', (event) => {
			event.preventDefault();
			this.openContactFormModal();
		});

		const closeButton = this.modalElement.querySelector(
			'.modal__close'
		) as HTMLButtonElement;
		closeButton.addEventListener('click', () => {
			this.close();
		});
	}

	private updateForm() {
		const onlinePaymentBtn = this.modalElement.querySelector(
			'#online-payment-btn'
		) as HTMLButtonElement;
		const offlinePaymentBtn = this.modalElement.querySelector(
			'#offline-payment-btn'
		) as HTMLButtonElement;

		if (this.selectedPaymentMethod === 'online') {
			onlinePaymentBtn.classList.add('button_alt-active');
			offlinePaymentBtn.classList.remove('button_alt-active');
		} else {
			onlinePaymentBtn.classList.remove('button_alt-active');
			offlinePaymentBtn.classList.add('button_alt-active');
		}

		console.log('Выбран способ оплаты:', this.selectedPaymentMethod);
	}

	private checkNextButtonState() {
		if (this.deliveryAddressInput.value.trim() !== '') {
			this.nextButton.disabled = false;
		} else {
			this.nextButton.disabled = true;
		}
	}

	private validateAddressOnLoad() {
		if (this.deliveryAddressInput.value.trim() === '') {
			this.showErrorMessage('Пожалуйста, введите адрес доставки');
		}
	}

	private showErrorMessage(message: string) {
		this.addressErrorElement.textContent = message;
		this.addressErrorElement.style.display = 'block';
	}

	private hideErrorMessage() {
		this.addressErrorElement.style.display = 'none';
	}

	public open() {
		if (!this.modalElement) return;
		openModal(this.modalElement);
	}

	public close() {
		if (!this.modalElement) return;
		closeModal(this.modalElement);
	}

	private openContactFormModal() {
		this.close();
		contactFormComponent.open();
	}

	public getSelectedPaymentMethod(): 'online' | 'offline' {
		return this.selectedPaymentMethod;
	}

	public getDeliveryAddress(): string {
		return this.deliveryAddressInput.value.trim();
	}
}
