import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

export default function homeSlider() {
    new Swiper('.home-banner__swiper', {
        modules: [Pagination],
        pagination: {
            el: '.home-banner__pagination'
        }
    });
}
