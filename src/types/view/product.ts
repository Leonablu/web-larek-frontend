// Тип данных для отображения продукта
export interface DisplayProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}
// Тип настроек для отображения продукта
export interface DisplayProductSetting {
  category: string;
  price: string;
  title: string;
  image: string;
  description: string;
  compactClass: string;
  isCompact: boolean;
}