import { Component } from './component';
import { Modal } from './modal';

// Компонент с модальным окном вместе с базовым компонентом
export abstract class ComponentWithModal<T> extends Component<T> {
	protected modal: Modal;

	constructor(container: HTMLElement, modalElement: HTMLElement) {
		super(container);
		this.modal = new Modal(modalElement);
	}

	openModal() {
		this.modal.open();
	}

	closeModal() {
		this.modal.close();
	}
}
