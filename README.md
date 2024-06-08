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
  - forms.ts — Тип данных для форм
 - src/types/view/ — типы данных для отображения
  - product.ts — Тип данных для отображения продукта
  - order.ts — Тип данных для отображения заказа
  - сart.ts - Тип данных для корзины
  - mainPage.ts - Тип данных для интерфейса
  - successPurchase - Тип данных для модального окна об успешной покупке
 - src/controller/ — контроллер
  - apiClients.ts — Интерфейсы для API-клиентов
  - cart.ts — Интерфейсы для сервиса работы с корзиной
  - events.ts — Перечисления и интерфейсы для событий

- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
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

Данные (models)

- Product: Описывает тип данных для отдельного продукта.
- ProductList: Описывает тип данных для списка продуктов.
- Order: Описывает тип данных для заказа.
- PaymentForm: Описывает тип данных для формы способа оплаты.
- ContactForm: Описывает тип данных для формы контактной информации.

Отображения (view)

- DisplayProduct: Описывает тип данных для отображения продукта.
- DisplayOrder: Описывает тип данных для отображения заказа.
- CartItem: Описывает тип данных для элемента в корзине.
- DisplayCart: Описывает тип данных для отображения корзины.
- MainPage: Описывает тип данных для главной страницы.
- SuccessPurchase: Описывает тип данных для модального окна об успешной покупке.

Контроллеры (controller)

- APIClientInterface: Интерфейс для работы с API.
- CartServiceInterface: Интерфейс для работы с корзиной.
- Events: Перечисление событий.
- ProductAddedEvent: Интерфейс события добавления продукта.
- OrderPlacedEvent: Интерфейс события оформления заказа.

## Взаимодействие частей

- Данные (models) предоставляют типы данных, которые используются в отображениях (view) и контроллерах (controller).
- Отображения (view) используют данные из models для отображения информации на экране.
- Контроллеры (controller) взаимодействуют с models для получения и обработки данных, а также управляют событиями и API-запросами.

## Данные, используемые в приложении

Типы данных и их функции

- Product:
`export interface Product {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}`
Описывает структуру данных для отдельного продукта.




















