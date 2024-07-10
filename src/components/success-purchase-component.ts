import { SuccessPurchase } from '../types/view/successPurchase';
import { ComponentWithModal } from './base/component-with-modal';

// Компонент успешного заказа
export class SuccessPurchaseComponent extends ComponentWithModal<SuccessPurchase> {
	private messageElement: HTMLElement;
	private orderIdElement: HTMLElement;
	private closeButton: HTMLButtonElement;

	constructor(container: HTMLElement) {
		const modalElement = document.querySelector(
			'#success-purchase-modal'
		) as HTMLElement;
		super(container, modalElement);

		this.messageElement = modalElement.querySelector(
			'.film__description'
		) as HTMLElement;
		this.orderIdElement = modalElement.querySelector(
			'.film__title'
		) as HTMLElement;
		this.closeButton = modalElement.querySelector(
			'.order-success__close'
		) as HTMLButtonElement;

		// Добавляем обработчик для кнопки закрытия модального окна
		this.closeButton.addEventListener('click', () => {
			this.close();
		});

		// Добавляем обработчик для кнопки закрытия модального окна (крестик)
		const modalCloseButton = modalElement.querySelector(
			'.modal__close'
		) as HTMLButtonElement;
		modalCloseButton.addEventListener('click', () => {
			this.close();
		});
	}

	// Открытие модального окна
	public open(total: string) {
		this.openModal();
		this.setText(this.messageElement, `Списано ${total}`);
		this.setText(this.orderIdElement, 'Заказ оформлен');
	}

	// Закрытие модального окна
	public close() {
		this.closeModal();
	}
}
