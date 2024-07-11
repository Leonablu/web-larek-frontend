import { Component } from './component';

export class Modal extends Component<any> {
	private modalElement: HTMLElement;
	private isOpen: boolean;

	constructor(modalElement: HTMLElement) {
		super(modalElement);
		this.modalElement = modalElement;
		this.isOpen = false;

		this.init();
	}

	private init() {
		this.modalElement.addEventListener(
			'click',
			this.onModalOverlayClick.bind(this)
		);
	}

	private toggleModal(state = true) {
		this.toggleClass(this.modalElement, 'modal_active', state);
		this.isOpen = state;
	}

	private handleEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			this.close();
		}
	};

	private onModalOverlayClick(event: MouseEvent) {
		if (event.target === this.modalElement) {
			this.close();
		}
	}

	public open() {
		this.toggleModal(true);
		document.addEventListener('keydown', this.handleEscape);
	}

	public close() {
		this.toggleModal(false);
		document.removeEventListener('keydown', this.handleEscape);
	}

	public getElement(): HTMLElement {
		return this.modalElement;
	}
}
