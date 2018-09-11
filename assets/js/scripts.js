$(document).ready(() => {
	
	const body = $('body');

	// Slide out nav

	const slideOut = $('.slide-out');
	const navTrigger = $('.nav-trigger');
	const navClose = $('.nav-close');

	function closeNav() {
		slideOut.removeClass('active');
		navTrigger.removeClass('active');
	}

	navTrigger.on('click', () => {
		slideOut.toggleClass('active');
		navTrigger.toggleClass('active');

		body.on('click', closeNav);

		return false;
	});

	navClose.on('click', closeNav);

	// Responsive slider

	const slider = $('.slider');

	const sliderSettings = {
		arrows: false,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
	};

	const slickInit = () => {
		const width = window.innerWidth;
		const shouldInit = width <= 768 && slider;
		const alreadyInit = slider.hasClass('slick-initialized');

		if (shouldInit && !alreadyInit) {
			slider.slick(sliderSettings);
		} else if (!shouldInit && alreadyInit) {
			slider.slick('unslick');
		}
	};

	if (slider) {
		window.addEventListener('resize', slickInit);
		slickInit();
	}
});