import ready from './utils/documentReady';
import homeSlider from "./components/homeSlider";
import callbackModal from './components/callbackModal';
import mmenu from './components/mmenu';
import catalogSlider from './components/catalogSlider';
import worthSlider from './components/worthSlider';
import worthClick from './components/worthClick';
import description from './components/description';

ready(() => {
    mmenu()
    callbackModal()
    homeSlider()
    catalogSlider()
    worthSlider()
    worthClick()
    description()
})