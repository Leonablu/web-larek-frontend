// Функция закрытия модального окна через Escape
function handleEscClose(event: KeyboardEvent) {
	if (event.key === 'Escape') {
		const openedModal = document.querySelector(
			'.modal_active'
		) as HTMLElement | null;
		if (openedModal) {
			closeModal(openedModal);
		}
	}
}

// Функция закрытия модального окна через клик по оверлею
function onModalOverlayClick(event: MouseEvent) {
	const target = event.target as HTMLElement;
	if (target.classList.contains('modal_active')) {
		closeModal(target);
	}
}

// Функция открытия модального окна
export function openModal(modalElement: HTMLElement | null) {
	if (modalElement != null) {
		modalElement.classList.add('modal_active');
		document.addEventListener('keydown', handleEscClose);
		modalElement.addEventListener('mousedown', onModalOverlayClick);
	}
}

// Функция закрытия модального окна
export function closeModal(modalElement: HTMLElement | null) {
	if (modalElement != null) {
		modalElement.classList.remove('modal_active');
		document.removeEventListener('keydown', handleEscClose);
		modalElement.removeEventListener('mousedown', onModalOverlayClick);
	}
}
