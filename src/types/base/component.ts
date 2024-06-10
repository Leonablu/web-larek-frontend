// Базовый класс для управления DOM-элементами
class Component {
  protected element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  // Метод для переключения CSS-классов
  toggleClass(className: string) {
    this.element.classList.toggle(className);
  }

  // Метод для активации/деактивации кнопок
  setButtonState(button: HTMLButtonElement, isActive: boolean) {
    button.disabled = !isActive;
  }

  // Метод для установки текстовых данных
  setTextContent(selector: string, text: string) {
    const element = this.element.querySelector(selector);
    if (element) {
      element.textContent = text;
    }
  }
}