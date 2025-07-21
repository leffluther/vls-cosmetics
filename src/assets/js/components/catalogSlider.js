import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

export default function catalogSlider() {
    new Swiper('.catalog__swiper', {
        modules: [Pagination],
        spaceBetween: 15,
        loop: true,
        pagination: {
            el: '.catalog__pagination'
        },
    });
}
