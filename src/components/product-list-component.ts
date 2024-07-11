import { DisplayProductSetting } from '../types/view/product';
import { ComponentWithModal } from './base/component-with-modal';
import { IEvents } from './base/events';
import { Model } from './base/model';

// Компонент карточки товара
export class ProductModel extends Model<DisplayProductSetting> {
	constructor(data: Partial<DisplayProductSetting>, events: IEvents) {
		super(data, events);
	}

	update(data: Partial<DisplayProductSetting>) {
		Object.assign(this, data);
		this.emitChanges('product:updated', this);
	}
}

export class ProductListComponent extends ComponentWithModal<DisplayProductSetting> {
	constructor(
		container: HTMLElement,
		modalElement: HTMLElement,
		private product: DisplayProductSetting
	) {
		super(container, modalElement);
		this.render();
		this.addClickListener();
	}

	// Метод отрисовки карточки товара
	render(): HTMLElement {
		const { description, image, title, category, price } = this.product;

		const template = document.getElementById(
			'card-catalog'
		) as HTMLTemplateElement;
		if (!template || !template.content) {
			console.error(
				'Template with id "card-catalog" not found or has no content'
			);
			return this.container;
		}

		const productElement = template.content.cloneNode(true) as HTMLElement;

		const imageElement = productElement.querySelector(
			'.card__image'
		) as HTMLImageElement;
		const titleElement = productElement.querySelector(
			'.card__title'
		) as HTMLElement;
		const priceElement = productElement.querySelector(
			'.card__price'
		) as HTMLElement;
		const categoryElement = productElement.querySelector(
			'.card__category'
		) as HTMLElement;

		if (!imageElement || !titleElement || !priceElement || !categoryElement) {
			console.error('One of the template elements is not found');
			return this.container;
		}

		this.setImage(imageElement, image);
		this.setText(titleElement, title);
		this.setText(
			priceElement,
			price === null ? 'Бесценно' : `${price} синапсов`
		);
		this.setText(categoryElement, category);

		const categoryClassMap: { [key: string]: string } = {
			'софт-скил': 'card__category_soft',
			'хард-скил': 'card__category_hard',
			'другое': 'card__category_other',
			'дополнительное': 'card__category_additional',
			'кнопка': 'card__category_button',
		};

		if (categoryClassMap[category]) {
			categoryElement.classList.add(categoryClassMap[category]);
		}

		this.container.innerHTML = '';
		this.container.appendChild(productElement);

		return this.container;
	}

	// Метод добавления обработчика клика для отображения модального окна
	addClickListener() {
		this.container.addEventListener('click', () => this.showModal());
	}

	// Метод отображения модального окна с деталями товара
	showModal() {
		const { description, image, title, category, price } = this.product;

		const template = document.getElementById(
			'card-preview'
		) as HTMLTemplateElement;

		if (template && template.content) {
			const modalContent = template.content.cloneNode(true) as HTMLElement;

			const imageElement = modalContent.querySelector(
				'.card__image'
			) as HTMLImageElement;
			const titleElement = modalContent.querySelector(
				'.card__title'
			) as HTMLElement;
			const descriptionElement = modalContent.querySelector(
				'.card__text'
			) as HTMLElement;
			const priceElement = modalContent.querySelector(
				'.card__price'
			) as HTMLElement;
			const categoryElement = modalContent.querySelector(
				'.card__category'
			) as HTMLElement;
			const addToBasketButton = modalContent.querySelector(
				'.button'
			) as HTMLButtonElement;

			if (
				imageElement &&
				titleElement &&
				descriptionElement &&
				priceElement &&
				categoryElement &&
				addToBasketButton
			) {
				this.setImage(imageElement, image);
				this.setText(titleElement, title);
				this.setText(descriptionElement, description);
				this.setText(
					priceElement,
					price === null ? 'Бесценно' : `${price} синапсов`
				);
				this.setText(categoryElement, category);

				const modalContentContainer = this.modal
					.getElement()
					.querySelector('.modal__content');
				if (modalContentContainer) {
					modalContentContainer.innerHTML = '';
					modalContentContainer.appendChild(modalContent);
				}

				this.openModal();

				// Добавляем обработчик события для кнопки "В корзину"
				addToBasketButton.addEventListener('click', () => {
					if (price === null) {
						console.error('Нельзя добавить бесценный товар в корзину');
						return;
					}

					const addToBasketEvent = new CustomEvent('addToBasket', {
						detail: this.product,
					});
					window.dispatchEvent(addToBasketEvent);
				});

				// Проверяем на бесценность и деактивируем кнопку при необходимости
				if (price === null) {
					this.setDisabled(addToBasketButton, true);
				} else {
					this.setDisabled(addToBasketButton, false);
				}

				// Добавляем обработчик события для закрытия модального окна
				this.addModalCloseListener(this.modal.getElement());
			} else {
				console.error('One of the modal elements is not found');
			}
		} else {
			console.error('Template or modal container not found');
		}
	}

	// Метод добавления обработчика закрытия модального окна
	addModalCloseListener(modalElement: HTMLElement) {
		const closeModal = () => {
			this.closeModal();
			modalElement.querySelector('.modal__content')!.innerHTML = '';
			modalElement.removeEventListener('click', closeModalEvent);
			document.removeEventListener('keydown', closeOnEscape);
		};

		const closeModalEvent = (event: Event) => {
			if (
				event.target === modalElement ||
				(event.target as HTMLElement).classList.contains('modal__close')
			) {
				closeModal();
			}
		};

		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeModal();
			}
		};

		modalElement.addEventListener('click', closeModalEvent);
		document.addEventListener('keydown', closeOnEscape);
	}
}
