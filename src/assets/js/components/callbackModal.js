import MicroModal from "micromodal";
    
export default function callbackModal() {
    MicroModal.init({
        openTrigger: 'data-modal-open',
        closeTrigger: 'data-codal-close',
        openClass: 'is-open',
        disableScroll: true,
        disableFocus: true,
        awaitOpenAnimation: false,
        awaitCloseAnimation: false,
        debugMode: true
    })
}
