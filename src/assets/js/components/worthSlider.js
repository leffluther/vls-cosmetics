import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

export default function worthSlider() {
	new Swiper('.worth__swiper', {
		modules: [Pagination],
		spaceBetween: 15,
		pagination: {
			el: '.worth__pagination'
		},
		on: {
			init: function () {
				const slides = this.slides;

				slides.forEach((slide, index) => {
					const countEl = slide.querySelector('.worth__count');
					if (countEl) {
						const number = (index + 1).toString().padStart(2, '0');
						countEl.textContent = number;
					}
				});
			}
		}
	});
}
