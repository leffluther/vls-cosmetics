export default function custom() {

	// WORTH HIDE/SHOW DESC
	const worthMaxLenght = 300;

	document.querySelectorAll(".worth__desc").forEach(desc => {
		const worthText = desc.textContent.trim();
		const worthButton = desc.parentElement.querySelector(".worth__more");
		const originalHTML = desc.innerHTML;

		let worthIsExpanded = false;

		if (!worthButton) return;

		function truncateText(text, length) {
			return text.length > length ? text.slice(0, length) + "..." : text;
		}

		function updateView() {
			if (worthIsExpanded) {
				desc.innerHTML = originalHTML;
				worthButton.textContent = "Скрыть";
			} else {
				desc.textContent = truncateText(worthText, worthMaxLenght);
				worthButton.textContent = "Подробнее";
			}
		}

		worthButton.addEventListener("click", () => {
			worthIsExpanded = !worthIsExpanded;
			updateView();
		});

		updateView();

	});

	// FAQ ACCORDION

	document.querySelectorAll('.faq__label').forEach(label => {
		label.addEventListener('click', () => {
			const faqItem = label.parentElement;
			const faqContent = faqItem.querySelector('.faq__desc');

			// Закрываем все
			document.querySelectorAll('.faq__box').forEach(i => {
				if (i !== faqItem) {
					i.classList.remove('faq__box--active');
					const otherContent = i.querySelector('.faq__desc');
					if (otherContent) otherContent.style.maxHeight = null;
				}
			});

			// Переключаем текущий
			faqItem.classList.toggle('faq__box--active');

			if (faqItem.classList.contains('faq__box--active')) {
				faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
			} else {
				faqContent.style.maxHeight = null;
			}
		});
	});

	// FAQ COUNTER

	document.querySelectorAll('.faq__box').forEach((box, index) => {
		const label = box.querySelector('.faq__label');
		if (label) {
			const number = (index + 1).toString().padStart(2, '0');
			label.setAttribute('data-index', `/${number}`);
		}
	});
}