import { Component } from '../../components/base/component';
import { closeModal, openModal } from '../../components/base/modal';

// Интерфейс для модального окна об успешной покупке
export interface SuccessPurchase {
	message: string;
	orderId: string;
}
// Тип настроек для модального окна об успешной покупке
export interface SuccessPurchaseSetting {
	message: string;
	orderId: string;
}

// Компонент успешного заказа
export class SuccessPurchaseComponent extends Component<SuccessPurchase> {
	private modalElement: HTMLElement;
	private messageElement: HTMLElement;
	private orderIdElement: HTMLElement;
	private closeButton: HTMLButtonElement;

	constructor(container: HTMLElement) {
		super(container);
		this.modalElement = document.querySelector(
			'#success-purchase-modal'
		) as HTMLElement;

		this.messageElement = this.modalElement.querySelector(
			'.film__description'
		) as HTMLElement;
		this.orderIdElement = this.modalElement.querySelector(
			'.film__title'
		) as HTMLElement;
		this.closeButton = this.modalElement.querySelector(
			'.order-success__close'
		) as HTMLButtonElement;

		// Добавляем обработчик для кнопки закрытия модального окна
		this.closeButton.addEventListener('click', () => {
			this.close();
		});

		// Добавляем обработчик для кнопки закрытия модального окна (крестик)
		const modalCloseButton = this.modalElement.querySelector(
			'.modal__close'
		) as HTMLButtonElement;
		modalCloseButton.addEventListener('click', () => {
			this.close();
		});
	}

	public open(total: string) {
		if (!this.modalElement) return;
		openModal(this.modalElement);

		this.messageElement.textContent = `Списано ${total}`;
		this.orderIdElement.textContent = 'Заказ оформлен';
	}

	public close() {
		if (!this.modalElement) return;
		closeModal(this.modalElement);
	}
}
