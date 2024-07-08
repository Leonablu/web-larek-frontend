import { Component } from '../../components/base/component';
import { Model } from '../../components/base/model';
import { IEvents } from '../../components/base/events';
import { closeModal, openModal } from '../../components/base/modal';
// Тип данных для отображения продукта
export interface DisplayProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	price: number;
}
// Тип настроек для отображения продукта
export interface DisplayProductSetting {
	id: string;
	category: string;
	price: number;
	title: string;
	image: string;
	description: string;
}

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

export class ProductListComponent extends Component<DisplayProductSetting> {
	constructor(container: HTMLElement, private product: DisplayProductSetting) {
		super(container);
		this.render();
		this.addClickListener();
	}

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

		imageElement.src = image;
		titleElement.textContent = title;
		priceElement.textContent =
			price === null ? 'Бесценно' : `${price} синапсов`;
		categoryElement.textContent = category;

		const categoryClassMap: { [key: string]: string } = {
			'софт-скил': 'card__category_soft',
			'хард-скил': 'card__category_hard',
			другое: 'card__category_other',
			дополнительное: 'card__category_additional',
			кнопка: 'card__category_button',
		};

		if (categoryClassMap[category]) {
			categoryElement.classList.add(categoryClassMap[category]);
		}

		this.container.innerHTML = '';
		this.container.appendChild(productElement);

		return this.container;
	}

	addClickListener() {
		this.container.addEventListener('click', () => this.showModal());
	}

	showModal() {
		const { description, image, title, category, price } = this.product;

		const modal = document.getElementById('modal-container');
		const template = document.getElementById(
			'card-preview'
		) as HTMLTemplateElement;

		if (modal && template && template.content) {
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
				imageElement.src = image;
				titleElement.textContent = title;
				descriptionElement.textContent = description;
				priceElement.textContent =
					price === null ? 'Бесценно' : `${price} синапсов`;
				categoryElement.textContent = category;

				const modalContentContainer = modal.querySelector('.modal__content');
				if (modalContentContainer) {
					modalContentContainer.innerHTML = ''; // Очищаем контейнер перед добавлением нового содержимого
					modalContentContainer.appendChild(modalContent);
				}

				openModal(modal); // Открываем модальное окно

				// Добавляем обработчик события для кнопки "В корзину"
				addToBasketButton.addEventListener('click', () => {
					const addToBasketEvent = new CustomEvent('addToBasket', {
						detail: this.product,
					});
					window.dispatchEvent(addToBasketEvent);
				});

				// Добавляем обработчик события для закрытия модального окна
				this.addModalCloseListener(modal);
			} else {
				console.error('One of the modal elements is not found');
			}
		} else {
			console.error('Modal container or template not found');
		}
	}

	addModalCloseListener(modal: HTMLElement) {
		const closeModalEvent = (event: Event) => {
			if (
				event.target === modal ||
				(event.target as HTMLElement).classList.contains('modal__close')
			) {
				closeModal(modal); // Закрываем модальное окно
				modal.querySelector('.modal__content')!.innerHTML = ''; // Очищаем контент модального окна
				modal.removeEventListener('click', closeModalEvent); // Удаляем обработчик после закрытия
				document.removeEventListener('keydown', closeOnEscape); // Удаляем обработчик для Escape
			}
		};

		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeModal(modal); // Закрываем модальное окно
				modal.querySelector('.modal__content')!.innerHTML = ''; // Очищаем контент модального окна
				document.removeEventListener('keydown', closeOnEscape); // Удаляем обработчик после закрытия
				modal.removeEventListener('click', closeModalEvent); // Удаляем обработчик для клика
			}
		};

		modal.addEventListener('click', closeModalEvent);
		document.addEventListener('keydown', closeOnEscape);
	}
}
