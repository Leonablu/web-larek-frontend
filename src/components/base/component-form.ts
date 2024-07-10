import { Component } from './component';

// Компонент форм вместе с базовым компонентом
export abstract class Form<T> extends Component<T> {
	protected submitButton: HTMLButtonElement;

	constructor(container: HTMLElement) {
		super(container);
		this.submitButton = container.querySelector('.button') as HTMLButtonElement;
		this.setupFormListeners();
	}

	private setupFormListeners() {
		this.container.addEventListener('submit', this.onSubmit.bind(this));
	}

	protected onSubmit(event: Event) {
		event.preventDefault();
		this.handleFormSubmit();
	}

	protected abstract handleFormSubmit(): void;

	protected enableSubmitButton() {
		this.setDisabled(this.submitButton, false);
	}

	protected disableSubmitButton() {
		this.setDisabled(this.submitButton, true);
	}
}
