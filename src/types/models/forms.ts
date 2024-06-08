// Тип данных для формы способа оплаты
export interface PaymentForm {
  onlinePayment: boolean;
  deliveryAddress: string;
}
// Тип данных для формы контактной информации
export interface ContactForm {
  email: string;
  phoneNumber: string;
}