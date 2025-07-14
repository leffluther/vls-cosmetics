import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export default function homeSlider() {
    new Swiper('.home-banner__swiper', {
        modules: [Navigation, Pagination],

        pagination: {
            el: '.home-banner__pagination'
        }
    });
}
