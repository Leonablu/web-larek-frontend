import { DisplayProduct } from './product';
import { Component } from '../../components/base/component';
import { exampleBasketData } from '../../index';
import { openModal, closeModal } from '../../components/base/modal';
// Интерфейс для элемента в корзине
export interface BasketItem {
	product: DisplayProduct;
	quantity: number;
}

// Интерфейс для отображения корзины
export interface DisplayBasket {
	items: BasketItem[];
	total: string;
}

// Тип настроек для отображения элемента в корзине
export interface BasketItemSetting {
	index: number;
	title: string;
	price: string;
	canRemove: boolean; // Показывает, может ли элемент быть удален
}

// Тип настроек для отображения корзины
export interface DisplayBasketSetting {
	title: string;
	checkoutButton: boolean; // Показывает, показывать ли кнопку оформления заказа
	price: string;
}

// Компонент корзины
export class BasketComponent extends Component<DisplayBasket> {
	private basketItemsContainer: HTMLElement;
	private totalPriceElement: HTMLElement;
	private modalElement: HTMLElement;
	private orderButton: HTMLButtonElement;

	constructor(container: HTMLElement) {
		super(container);

		this.basketItemsContainer = this.container.querySelector(
			'.basket__list'
		) as HTMLElement;
		this.totalPriceElement = this.container.querySelector(
			'.basket__price'
		) as HTMLElement;
		this.modalElement = this.container.closest('.modal') as HTMLElement;
		this.orderButton = this.container.querySelector(
			'.order__button'
		) as HTMLButtonElement;
	}

	private renderBasketItem(item: BasketItem, index: number): HTMLElement {
		const itemElement = document.createElement('li');
		itemElement.className = 'basket__item card card_compact';
		itemElement.innerHTML = `
        <span class="basket__item-index">${index + 1}</span>
        <span class="card__title">${item.product.title}</span>
        <span class="card__price">${
					item.product.price !== null
						? item.product.price + ' синапсов'
						: 'Бесценно'
				}</span>
        <button class="basket__item-delete" aria-label="удалить"></button>
      `;

		itemElement
			.querySelector('.basket__item-delete')!
			.addEventListener('click', () => {
				this.removeItem(index);
			});

		return itemElement;
	}

	private renderBasketItems(items: BasketItem[]) {
		if (!this.basketItemsContainer) return;
		this.basketItemsContainer.innerHTML = '';
		items.forEach((item, index) => {
			const itemElement = this.renderBasketItem(item, index);
			this.basketItemsContainer.appendChild(itemElement);
		});
	}

	private updateTotalPrice(total: string) {
		if (!this.totalPriceElement) return;
		this.totalPriceElement.textContent = total;
	}

	private toggleOrderButton(items: BasketItem[]) {
		if (items.length > 0) {
			this.orderButton.removeAttribute('disabled');
		} else {
			this.orderButton.setAttribute('disabled', 'true');
		}
	}

	public open() {
		if (!this.modalElement) return;
		openModal(this.modalElement);
	}

	public close() {
		if (!this.modalElement) return;
		closeModal(this.modalElement);
	}

	public setBasketData(data: DisplayBasket) {
		this.renderBasketItems(data.items);
		this.updateTotalPrice(data.total);
		this.toggleOrderButton(data.items);
	}

	private removeItem(index: number) {
		const basketCounter = document.querySelector(
			'.header__basket-counter'
		) as HTMLElement;
		// Удаляем элемент из массива items по индексу
		if (index >= 0 && index < exampleBasketData.items.length) {
			exampleBasketData.items.splice(index, 1);
			exampleBasketData.total = calculateTotal(exampleBasketData.items);
			this.setBasketData(exampleBasketData);
			basketCounter.textContent = exampleBasketData.items.length.toString();
		}

		function calculateTotal(items: BasketItem[]): string {
			let total = 0;
			items.forEach((item) => {
				total += item.product.price * item.quantity;
			});
			return total.toString() + ' синапсов';
		}
	}
}
