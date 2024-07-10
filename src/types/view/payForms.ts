// Интерфейс для отображения формы способа оплаты
export interface DisplayPaymentForm {
	onlinePayment: boolean;
	deliveryAddress: string;
}

// Тип настроек для отображения формы способа оплаты
export interface DisplayPaymentFormSetting {
	onlinePayment: boolean;
	deliveryAddress: string;
}
