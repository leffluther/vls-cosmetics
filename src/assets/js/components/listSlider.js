import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export default function homeSlider() {
    new Swiper('.section-catalog__swiper', {
        modules: [Navigation, Pagination],

        pagination: {
            el: '.section-catalog__pagination'
        }
    });
}
