// Интерфейс для отображения формы способа оплаты
export interface DisplayPaymentForm {
  onlinePayment: boolean;
  deliveryAddress: string;
}
// Интерфейс для отображения формы контактной информации
export interface DisplayContactForm {
  email: string;
  phoneNumber: string;
}
// Тип настроек для отображения формы способа оплаты
export interface DisplayPaymentFormSetting {
  onlinePayment: boolean;
  deliveryAddress: string;
}
// Тип настроек для отображения формы контактной информации
export interface DisplayContactFormSetting {
  email: string;
  phoneNumber: string;
}

