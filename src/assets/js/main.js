import ready from './utils/documentReady';
import custom from './components/custom';
import homeSlider from "./components/homeSlider";
import callbackModal from './components/callbackModal';
import mmenu from './components/mmenu';
import catalogSlider from './components/catalogSlider';
import worthSlider from './components/worthSlider';

ready(() => {
    custom()
    mmenu()
    callbackModal()
    homeSlider()
    catalogSlider()
    worthSlider()
})