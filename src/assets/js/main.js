import ready from './utils/documentReady';
import homeSlider from "./components/homeSlider";
import callbackModal from './components/callbackModal';
import mmenu from './components/mmenu';
import listSlider from './components/listSlider';

ready(() => {
    homeSlider()
    callbackModal()
    mmenu()
    listSlider()
})