(function ($) {

	"use strict";

	let cfg = {

			defAnimation: "fadeInUp", // default css animation		
			scrollDuration: 800,
		},

		$WIN = $(window);


	let doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);


	let ssPreloader = function () {

		$WIN.on('load', function () {
			$('html, body').animate({
				scrollTop: 0
			}, 'normal');
			$("#loader").fadeOut("slow", function () {
				$("#ssPreloader").delay(300).fadeOut("slow");
			});
		});
	};


	let ssMasonryFolio = function () {

		let containerBricks = $('.bricks-wrapper');
		containerBricks.imagesLoaded(function () {
			containerBricks.masonry({
				itemSelector: '.brick',
				resize: true
			});
		});
	};


	let sslightgallery = function () {

		$('#folio-wrap').lightgallery({
			showThumbByDefault: false,
			hash: false,
			selector: ".item-wrap"
		});
	};


	let ssFlexSlider = function () {

		$WIN.on('load', function () {

			$('#experience-slider').flexslider({
				namespace: "flex-",
				controlsContainer: "",
				animation: 'slide',
				controlNav: true,
				directionNav: false,
				smoothHeight: true,
				slideshowSpeed: 7000,
				animationSpeed: 600,
				randomize: false,
				touch: true,
			});

		});

	};


	let ssMenuOnScrolldown = function () {

		let menuTrigger = $('#header-menu-trigger');

		$WIN.on('scroll', function () {

			if ($WIN.scrollTop() > 150) {
				menuTrigger.addClass('opaque');
			} else {
				menuTrigger.removeClass('opaque');
			}

		});
	};


	let ssOffCanvas = function () {

		let menuTrigger = $('#header-menu-trigger'),
			nav = $('#menu-nav-wrap'),
			closeButton = nav.find('.close-button'),
			siteBody = $('body');

		menuTrigger.on('click', function (e) {
			e.preventDefault();
			menuTrigger.toggleClass('is-clicked');
			siteBody.toggleClass('menu-is-open');
		});

		closeButton.on('click', function (e) {
			e.preventDefault();
			menuTrigger.trigger('click');
		});

		siteBody.on('click', function (e) {
			if (!$(e.target).is('#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span')) {
				menuTrigger.removeClass('is-clicked');
				siteBody.removeClass('menu-is-open');
			}
		});

	};


	let ssSmoothScroll = function () {

		$('.smoothscroll').on('click', function (e) {
			let target = this.hash,
				$target = $(target);

			e.preventDefault();
			e.stopPropagation();

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, cfg.scrollDuration, 'swing').promise().done(function () {

				if ($('body').hasClass('menu-is-open')) {
					$('#header-menu-trigger').trigger('click');
				}

				window.location.hash = target;
			});
		});

	};


	let ssPlaceholder = function () {
		$('input, textarea, select').placeholder();
	};


	let ssAnimations = function () {

		if (!$("html").hasClass('no-cssanimations')) {
			$('.animate-this').waypoint({
				handler: function (direction) {

					let defAnimationEfx = cfg.defAnimation;

					if (direction === 'down' && !$(this.element).hasClass('animated')) {
						$(this.element).addClass('item-animate');

						setTimeout(function () {
							$('body .animate-this.item-animate').each(function (ctr) {
								let el = $(this),
									animationEfx = el.data('animate') || null;

								if (!animationEfx) {
									animationEfx = defAnimationEfx;
								}

								setTimeout(function () {
									el.addClass(animationEfx + ' animated');
									el.removeClass('item-animate');
								}, ctr * 30);

							});
						}, 100);
					}

					// trigger once only
					this.destroy();
				},
				offset: '95%'
			});
		}

	};


	let ssIntroAnimation = function () {

		$WIN.on('load', function () {

			if (!$("html").hasClass('no-cssanimations')) {
				setTimeout(function () {
					$('.animate-intro').each(function (ctr) {
						let el = $(this),
							animationEfx = el.data('animate') || null;

						if (!animationEfx) {
							animationEfx = cfg.defAnimation;
						}

						setTimeout(function () {
							el.addClass(animationEfx + ' animated');
						}, ctr * 300);
					});
				}, 100);
			}
		});

	};

	let ssfullIntro = function () {
		let button = $('.full-intro-button'),
			intro = $('.full-intro'),
			back = $('.back-button');

		button.click(function () {
			$(this).fadeOut(1000);
			intro.fadeIn(1000);
			back.fadeIn(1000);
		});

		back.click(function () {
			$(this).fadeOut(500);
			intro.fadeOut(500);
			button.fadeIn(500);
		});
	};

	let ssBackToTop = function () {

		let pxShow = 500,
			fadeInTime = 400,
			fadeOutTime = 400,
			goTopButton = $("#go-top")

		$(window).on('scroll', function () {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};


	(function ssInit() {

		ssPreloader();
		ssMasonryFolio();
		sslightgallery();
		ssFlexSlider();
		ssMenuOnScrolldown();
		ssOffCanvas();
		ssSmoothScroll();
		ssPlaceholder();
		ssAnimations();
		ssIntroAnimation();
		ssfullIntro();
		ssBackToTop();

	})();


})(jQuery);