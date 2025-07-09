import Mmenu from 'mmenu-js';

export default function mmenu() {
	const menu = new Mmenu("#mobile-menu", {
		navbar: false,
		offCanvas: {
			page: {
				selector: "#page"
			},
			position: "bottom",
		}
	});

	const api = menu.API;

	const openButton = document.getElementById('open-mobile-menu');

	openButton.addEventListener('click', () => {
		api.open();
	});

	api.bind('open:after', () => {
		openButton.classList.add('is-active');
	});

	api.bind('close:after', () => {
		openButton.classList.remove('is-active');
	});

	document.querySelectorAll('#mobile-menu .menu__link').forEach(link => {
		link.addEventListener('click', () => {
			api.close();
		});
	});

}