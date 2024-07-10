import { ComponentWithModal } from './base/component-with-modal';
import { BasketItem, DisplayBasket } from '../types/view/basket';
import { DisplayProductSetting } from '../types/view/product';
import { paymentFormComponent } from '..';

// Компонент корзины
export class BasketComponent extends ComponentWithModal<DisplayBasket> {
	private basketItemsContainer: HTMLElement;
	private totalPriceElement: HTMLElement;
	private orderButton: HTMLButtonElement;
	private basketItemTemplate: HTMLTemplateElement;
	private basketCounter: HTMLElement;
	private basketButton: HTMLButtonElement;
	private closeButton: HTMLButtonElement;

	// Данные корзины по умолчанию
	public static exampleBasketData: DisplayBasket = {
		items: [],
		total: '0 синапсов',
	};

	// Инициализация элементов интерфейса
	constructor(container: HTMLElement, modalElement: HTMLElement) {
		super(container, modalElement);

		this.basketItemsContainer = this.container.querySelector(
			'.basket__list'
		) as HTMLElement;
		this.totalPriceElement = this.container.querySelector(
			'.basket__price'
		) as HTMLElement;
		this.orderButton = this.container.querySelector(
			'.order__button'
		) as HTMLButtonElement;
		this.closeButton = this.container.querySelector(
			'.modal__close'
		) as HTMLButtonElement;

		this.basketItemTemplate = document.getElementById(
			'card-basket'
		) as HTMLTemplateElement;
		if (!this.basketItemTemplate) {
			throw new Error('Basket item template not found in the DOM.');
		}

		this.basketCounter = document.querySelector(
			'.header__basket-counter'
		) as HTMLElement;
		this.basketButton = document.querySelector(
			'.header__basket'
		) as HTMLButtonElement;

		this.init();
	}

	// Инициализация компонента
	private init() {
		this.attachEventListeners();
	}

	// Подключение обработчиков событий
	private attachEventListeners() {
		// Обработчик клика по кнопке оформления заказа
		this.orderButton.addEventListener('click', () => {
			this.closeModal();
			paymentFormComponent.open();
		});

		// Обработчик клика по кнопке закрытия модального окна
		this.closeButton.addEventListener('click', () => {
			this.closeModal();
		});

		// Обработчик клика по кнопке открытия корзины в шапке
		this.basketButton.addEventListener('click', () => {
			this.openModal();
			this.setBasketData(BasketComponent.exampleBasketData);
		});

		// Обработчик события добавления продукта в корзину
		window.addEventListener(
			'addToBasket',
			(event: CustomEvent<DisplayProductSetting>) => {
				this.handleAddToBasket(event.detail);
			}
		);
	}

	// Обработка добавления товара в корзину
	private handleAddToBasket(product: DisplayProductSetting) {
		const existingItem = BasketComponent.exampleBasketData.items.find(
			(item) => item.product.id === product.id
		);

		if (existingItem) {
			console.log('Этот товар уже в корзине');
		} else {
			const newItem = {
				product: {
					id: product.id,
					title: product.title,
					description: product.description,
					image: product.image,
					price: product.price,
				},
				quantity: 1,
			};

			BasketComponent.exampleBasketData.items.push(newItem);
			BasketComponent.exampleBasketData.total = this.calculateTotal(
				BasketComponent.exampleBasketData.items
			);
			this.setBasketData(BasketComponent.exampleBasketData);
			this.basketCounter.textContent =
				BasketComponent.exampleBasketData.items.length.toString();
		}
	}

	// Отрисовка элемента корзины
	private renderBasketItem(item: BasketItem, index: number): HTMLElement {
		const templateContent = document.importNode(
			this.basketItemTemplate.content,
			true
		);
		const itemElement = templateContent.querySelector(
			'.basket__item'
		) as HTMLElement;

		this.setText(
			itemElement.querySelector('.basket__item-index') as HTMLElement,
			(index + 1).toString()
		);
		this.setText(
			itemElement.querySelector('.card__title') as HTMLElement,
			item.product.title
		);
		this.setText(
			itemElement.querySelector('.card__price') as HTMLElement,
			item.product.price !== null
				? item.product.price + ' синапсов'
				: 'Бесценно'
		);

		itemElement
			.querySelector('.basket__item-delete')!
			.addEventListener('click', () => {
				this.removeItem(index);
			});

		return itemElement;
	}

	// Отрисовка всех элементов корзины
	private renderBasketItems(items: BasketItem[]) {
		if (!this.basketItemsContainer) return;
		this.basketItemsContainer.innerHTML = '';
		items.forEach((item, index) => {
			const itemElement = this.renderBasketItem(item, index);
			this.basketItemsContainer.appendChild(itemElement);
		});
	}

	// Обновление общей стоимости корзины
	private updateTotalPrice(total: string) {
		this.setText(this.totalPriceElement, total);
	}

	// Включение/выключение кнопки оформления заказа
	private toggleButton(disabled: boolean) {
		this.setDisabled(this.orderButton, disabled);
	}

	// Установка данных корзины в интерфейсе
	public setBasketData(data: DisplayBasket) {
		this.renderBasketItems(data.items);
		this.updateTotalPrice(data.total);
		this.toggleButton(data.items.length === 0);

		this.basketCounter.textContent = data.items.length.toString();
	}
	// Удаление товара из корзины
	private removeItem(index: number) {
		if (index >= 0 && index < BasketComponent.exampleBasketData.items.length) {
			BasketComponent.exampleBasketData.items.splice(index, 1);
			BasketComponent.exampleBasketData.total = this.calculateTotal(
				BasketComponent.exampleBasketData.items
			);
			this.setBasketData(BasketComponent.exampleBasketData);
			this.basketCounter.textContent =
				BasketComponent.exampleBasketData.items.length.toString();
		}
	}

	// Вычисление общей стоимости корзины
	private calculateTotal(items: BasketItem[]): string {
		let total = 0;
		items.forEach((item) => {
			total += item.product.price * item.quantity;
		});
		return total.toString() + ' синапсов';
	}

	// Функция для очистки корзины
	public clearBasket() {
		BasketComponent.exampleBasketData.items = [];
		BasketComponent.exampleBasketData.total = '0 синапсов';

		this.setBasketData(BasketComponent.exampleBasketData);
		this.basketCounter.textContent =
			BasketComponent.exampleBasketData.items.length.toString();
	}
}
