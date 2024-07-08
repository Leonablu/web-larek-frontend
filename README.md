# Проектная работа "Веб-ларек"
https://github.com/Leonablu/web-larek-frontend.git 

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/ — типы данных
  - src/types/models/ — модели данных
    - product.ts — Тип данных для отдельного продукта и списка продуктов
    - order.ts — Тип данных для заказа
    - payForms.ts — Тип данных для форм оплаты
    - contactsForms.ts — Тип данных для форм контактов
  - src/types/view/ — типы данных для отображения
    - product.ts — Тип данных для отображения продукта
    - order.ts — Тип данных для отображения заказа
    - basket.ts - Тип данных для корзины
    - mainPage.ts - Тип данных для интерфейса
    - successPurchase - Тип данных для модального окна об успешной покупке
    - payForms.ts — Тип данных для модального окна форм оплаты
    - contactsForms.ts — Тип данных для модального окна форм контактов
  - src/types/controller/ — контроллер
    - apiClients.ts — Интерфейсы для API-клиентов
    - basket.ts — Интерфейсы для сервиса работы с корзиной
    - events.ts — Перечисления и интерфейсы для событий
    - src/types/base/ — модели данных
    - component.ts - базовый класс для управления DOM-элементами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура проекта

Проект состоит из следующих основных частей:

1. Данные (models):
- Хранят типы данных, используемые в приложении.
- Включают в себя интерфейсы для продуктов, заказов и форм.

2. Отображения (view):
- Содержат интерфейсы для отображения данных на экране.
- Включают в себя интерфейсы для отображения продуктов, заказов, корзины и главной страницы.

3. Контроллеры (controller):
- Содержат интерфейсы для работы с API и корзиной.
- Включают в себя интерфейсы для API-клиента, сервиса корзины и событий.

## Назначение частей и их функции

### Данные (models)

1. Product:
- Описывает тип данных для отдельного продукта.
- Свойства:
  - `id: string` - Идентификатор продукта.
  - `description: string` - Описание продукта.
  - `image: string` - URL изображения продукта.
  - `title: string` - Название продукта.
  - `category: string` - Категория продукта.
  - `price: number` - Цена продукта.

2. ProductList:
- Описывает тип данных для списка продуктов.
- Свойства:
  - `total: number` - Общее количество продуктов.
  - `items: Product[]` - Массив продуктов.

3. Order:
- Описывает тип данных для заказа.
- Свойства:
  - `id: string` - Идентификатор заказа.
  - `total: number` - Общая сумма заказа.

4. PaymentForm:
- Описывает тип данных для формы способа оплаты.
- Свойства:
  - `onlinePayment: boolean` - Флаг онлайн-оплаты.
  - `deliveryAddress: string` - Адрес доставки.

5. ContactForm:
- Описывает тип данных для формы контактной информации.
- Свойства:
  - `email: string` - Электронная почта.
  - `phoneNumber: string` - Номер телефона.

### Отображения (view)

1. DisplayProduct:
- Описывает тип данных для отображения продукта.
- Свойства:
  - `id: string` - Идентификатор продукта.
  - `title: string` - Название продукта.
  - `description: string` - Описание продукта.
  - `image: string` - URL изображения продукта.
  - `price: string` - Цена продукта.

2. DisplayOrder:
- Описывает тип данных для отображения заказа.
- Свойства:
  - `id: string` - Идентификатор заказа.
  - `total: string` - Общая сумма заказа.

3. Basket Item:
- Описывает тип данных для элемента в корзине.
- Свойства:
  - `product: DisplayProduct` - Продукт в корзине.
  - `quantity: number` - Количество продукта.

4. DisplayBasket:
- Описывает тип данных для отображения корзины.
- Свойства:
  - `items: BasketItem[]` - Массив элементов в корзине.
  - `total: string` - Общая сумма корзины.

5. MainPage:
- Описывает тип данных для главной страницы.
- Свойства:
  - `products: DisplayProduct[]` - Массив продуктов.
  - `basket: DisplayBasket` - Корзина.
  - `contactForm: ContactForm` - Форма контактной информации.

6. SuccessPurchase:
- Описывает тип данных для модального окна об успешной покупке.
- Свойства:
  - `message: string` - Сообщение об успешной покупке.
  - `orderId: string` - Идентификатор заказа.


### Контроллеры (controller)

1. APIClientInterface:
- Интерфейс для работы с API.
- Методы:
  - `getProducts(): Promise<Product[]>` - Получение списка продуктов.
  - `createOrder(products: Product[]): Promise<Order>` - Создание заказа.

2. BasketServiceInterface:
- Интерфейс для работы с корзиной.
- Методы:
  - `addToBasket(product: Product): void` - Добавление продукта в корзину.
  - `removeFromBasket(productId: string): void` - Удаление продукта из корзины.
  - `getBasketItems(): Product[]` - Получение продуктов в корзине.
  - `clearBasket(): void` - Очистка корзины.

3. Events:
- Перечисление событий.
- События:
  - `PRODUCT_ADDED = "product_added"` - Событие добавления продукта.
  - `ORDER_PLACED = "order_placed"` - Событие оформления заказа.

4. ProductAddedEvent:
- Описывает структуру данных для события добавления продукта.
- Свойства:
  - `productId: string` - Идентификатор добавленного продукта.

5. OrderPlacedEvent:
- Описывает структуру данных для события оформления заказа.
- Свойства:
  - `orderId: string` - Идентификатор заказа.
  - `orderTotal: number` - Общая сумма заказа.

## Взаимодействие частей

- Данные (models) предоставляют типы данных, которые используются в отображениях (view) и контроллерах (controller).
- Отображения (view) используют данные из models для отображения информации на экране.
- Контроллеры (controller) взаимодействуют с models для получения и обработки данных, а также управляют событиями и API-запросами.

## Компоненты приложения

1. APIClient
- Обеспечивает взаимодействие с внешним API для получения продуктов и создания заказов.
- Конструктор:
  - baseURL: `string` - базовый URL для API.
- Методы:
  - getProducts: `Promise<Product[]>` - Получение списка продуктов..
  - createOrder: `Promise<Order>` - Создает заказ на основе переданных продуктов.

2. Basket
Service:
- Управляет добавлением, удалением и очисткой продуктов в корзине.
- Конструктор:
  - `Basket: BasketItem[]` - Массив элементов в корзине.
- Методы:
  - `addToBasket(product: Product): void` - Добавление продукта в корзину.
  - `removeFromBasket(productId: string): void` - Удаление продукта из корзины.
  - `getBasketItems(): Product[]` - Получение продуктов в корзине.
  - `clearBasket(): void` - Очистка корзины.

3. MainPage:
- Отображает главную страницу с продуктами, корзиной и формой контактной информации.
- Конструктор:
  - `products: DisplayProduct[]` - Массив продуктов.
  - `Basket: DisplayBasket` - Корзина.
  - `contactForm: ContactForm` - Форма контактной информации.
- Методы:
  - `render(): void` - Отображение главной страницы.

4. SuccessPurchaseModal:
- Отображает модальное окно об успешной покупке.
- Конструктор:
  - `message: string` - Сообщение об успешной покупке.
  - `orderId: string` - Идентификатор заказа.
- Методы:
  - `how(): void` - Показать модальное окно.
  - `hide(): void` - Скрыть модальное окно.

## Реализация процессов в приложении

Процессы в приложении реализованы через события и promise-based flow:

- События: Используются для взаимодействия между различными частями приложения. Например, событие PRODUCT_ADDED вызывается при добавлении продукта в корзину.
- Promise-based flow: Используется для взаимодействия с API. Например, методы getProducts и createOrder возвращают промисы, которые разрешаются при успешном выполнении запросов к API.

## Базовый класс для управления DOM-элементами

### Component

Базовый класс для управления DOM-элементами.

Конструктор:
- `element: HTMLElement` - DOM-элемент, с которым будет работать компонент.

Свойства:
- `protected element: HTMLElement` - DOM-элемент, с которым работает компонент.

Код: 
`
/**
 * Базовый компонент
 */
export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {
		// Учитывайте что код в конструкторе исполняется ДО всех объявлений в дочернем классе
	}

	// Инструментарий для работы с DOM в дочерних компонентах

	// Переключить класс
	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}

	// Установить текстовое содержимое
	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	// Сменить статус блокировки
	setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	// Скрыть
	protected setHidden(element: HTMLElement) {
		element.style.display = 'none';
	}

	// Показать
	protected setVisible(element: HTMLElement) {
		element.style.removeProperty('display');
	}

	// Установить изображение с алтернативным текстом
	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	// Вернуть корневой DOM-элемент
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
`

## Основные типы/интерфейсы проекта

1. Product:
`export interface Product {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}`

2. ProductList:
`export interface ProductList {
  total: number;
  items: Product[];
}`

3. Order:
`export interface Order {
  id: string;
  total: number;
}`

4. PaymentForm:
`export interface PaymentForm {
  onlinePayment: boolean;
  deliveryAddress: string;
}`

5. ContactForm:
`export interface ContactForm {
  email: string;
  phoneNumber: string;
}`

6. DisplayProduct:
`export interface DisplayProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}`

7. DisplayOrder:
`export interface DisplayOrder {
  id: string;
  total: string;
}`

8. BasketItem:
`export interface BasketItem {
  product: DisplayProduct;
  quantity: number;
}`

9. DisplayBasket:
`export interface DisplayBasket
 {
  items: BasketItem[];
  total: string;
}`

10. MainPage:
`export interface MainPage {
  products: DisplayProduct[];
  Basket: DisplayBasket;
  contactForm: ContactForm;
}`

11. SuccessPurchase:
`export interface SuccessPurchase {
  message: string;
  orderId: string;
}`

12. APIClientInterface:
`export interface APIClientInterface {
  getProducts(): Promise<Product[]>;
  createOrder(products: Product[]): Promise<Order>;
}`

13. BasketServiceInterface:
`export interface BasketServiceInterface {
  addToBasket(product: Product): void;
  removeFromBasket(productId: string): void;
  getBasketItems(): Product[];
  clearBasket(): void;
}`

14. Events:
`export enum Events {
  PRODUCT_ADDED = "product_added",
  ORDER_PLACED = "order_placed"
}`

15. ProductAddedEvent:
`export interface ProductAddedEvent {
  productId: string;
}`

16. OrderPlacedEvent:
`export interface OrderPlacedEvent {
  orderId: string;
  orderTotal: number;
}`
















