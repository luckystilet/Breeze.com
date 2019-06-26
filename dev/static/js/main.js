$(document).ready(function(){

	$('.slider-js').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '.slider__controls--prev',
		nextArrow: '.slider__controls--next',
		easing: 'swing',
		speed: 700,
		appendDots: $('.slider__dots'),
		dots: true,
		dotsClass: 'custom-dots',
		customPaging: function (slider, i) {
			var slideNumber = (i + 1),
			totalSlides = slider.slideCount;
			return '<a class="slider__dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"></a>';
		}
	});

	let languagesItems = $('.languages__item'),
	languagesMobile = $('.languages__mobile'),
	currencyMobile = $('.currency__mobile'),
	currencyItems = $('.currency__item');


	function activeCloseLogin(){
		$('#close-login').click(function(){
			$('.login').removeClass('form--active');
			$('#close-login').off('click');
			$(document).off('click');
		});

		window.setTimeout(function(){
			$(document).click(function(event) {
				if ($(event.target).closest($('.login')).length) return;
				$('.login').removeClass('form--active');
				event.stopPropagation();
				$(document).off('click');
			});
		},100);
	}


	function activeCloseSignup(){
		$('#close-signup').click(function(){
			$('.signup').removeClass('form--active');
			$('#close-signup').off('click');
			$(document).off('click');
		});

		window.setTimeout(function(){
			$(document).click(function(event) {
				if ($(event.target).closest($('.signup')).length) return;
				$('.signup').removeClass('form--active');
				event.stopPropagation();
				$(document).off('click');
			});
		},100);
	}

	// set content of mobile btns
	function updateLangMob(){
		let langAct = $('.languages__item--active').text();
		$('.languages__mobile').text(langAct);
	}

	function updateCurMob(){
		let curAct = $('.currency__item--active').text();
		$('.currency__mobile').text(curAct);
	}

	function updatePriceCur(){
		$('.cart__currency').text($('.currency__item--active').text());
	}

	function activeLangSelection(){
		languagesItems.click(function(){
			languagesItems.removeClass('languages__item--active');
			$(this).addClass('languages__item--active');
			updateLangMob();
			window.setTimeout(function(){
				$('.languages__list').removeClass('languages__list--active');
			}, 300);
			$(document).off('click');
		});

		$(document).click(function(event) {
			if ($(event.target).closest(languagesItems).length) return;
			$('.languages__list').removeClass('languages__list--active');
			event.stopPropagation();
			$(document).off('click');
		});
	}


	function activeCurSelection(){
		currencyItems.click(function(){
			currencyItems.removeClass('currency__item--active');
			$(this).addClass('currency__item--active');
			updateCurMob();
			updatePriceCur();
			window.setTimeout(function(){
				$('.currency__list').removeClass('currency__list--active');
			}, 300);
			$(document).off('click');
		});

		$(document).click(function(event) {
			if ($(event.target).closest(languagesItems).length) return;
			$('.currency__list').removeClass('currency__list--active');
			event.stopPropagation();
			$(document).off('click');
		});
	}




	$('.user-menu__link--signup').click(function(){
		$('.signup').toggleClass('form--active');
		activeCloseSignup();
	});
	$('.greeting__link--signup').click(function(){
		$('.signup').addClass('form--active');
		activeCloseSignup();
	});
	languagesMobile.click(function(){
		$('.languages__list').addClass('languages__list--active');
		window.setTimeout(activeLangSelection, 50);
	});
	currencyMobile.click(function(){
		$('.currency__list').addClass('currency__list--active');
		window.setTimeout(activeCurSelection, 50);
	});
	$('.user-menu__link--login').click(function(){
		$('.login').toggleClass('form--active');
		activeCloseLogin();
	});
	$('.greeting__link--login').click(function(){
		$('.login').toggleClass('form--active');
		activeCloseLogin();
	});

	activeLangSelection();
	activeCurSelection();
	updateLangMob();
	updateCurMob();
});



const debounce = (callback, delay) => {
	let timerId;
	return (...args) => {
		timerId && clearTimeout(timerId);
		timerId = setTimeout(
			() => callback(...args),
			delay
			);
	}
};

let resizeActions = debounce(function() {
	let mql = window.matchMedia('all and (max-width: 780px)'),
	cart = $('.cart');
	let small = window.matchMedia('all and (max-width: 480px)');
	let search = $('.search');

	if(mql.matches){
		$('.search').after(cart);
		$('.header-middle__inner').after($('.user-menu'));
	}else{
		$('.user-menu__list').after(cart);
		$('.header-middle__inner').append($('.user-menu'));
	}

	if(small.matches){
		let searchIconClick,
		searchDocClick;
		$('.search .input-field').attr('placeholder', 'Search...');
		search.click(function(event){
			event.stopPropagation();
			search.addClass('search--active');
			$('.search .input-field').select();
			window.setTimeout(function(){
				searchDocClick = $(document).click(function(event) {
					if ($(event.target).closest($('.search')).length){
						console.log('document click IF');
						return
					};
					console.log('document click AFTER IF');
					$('.search').removeClass('search--active');
					event.stopPropagation();
					searchDocClick.off('click');
					searchIconClick.off('click');
				});
			},100);

			// window.setTimeout(function(){
				searchIconClick = $('.search__icon').click(function(){
					console.log('search__icon click');
					$('.search').removeClass('search--active');
					searchIconClick.off('click');
					searchDocClick.off('click');
				});
			// },100);

		});
	}else{
		$('.search .input-field').attr('placeholder', 'Search entire store here...');
		search.removeClass('search--active')
		search.off('click');
		$(document).off('click');
	}
	// Расчет высоты слайда, пропорционально ширине по коэффициенту
	let slideW = $('.slider__item-inner').outerWidth();
	$('.slider__item-inner').outerHeight(slideW*0.4878);
	// Расчет высоты слайдера, пропорционально ширине по коэффициенту
	let sliderW = $('.slider__inner').outerWidth();
	$('.slider__inner').outerHeight(sliderW*0.4878);
	// Расчет высоты элемента блока преймущества, пропорционально ширине по коэффициенту
	let productAdvW = $('.product-advantages__item').outerWidth();
	$('.product-advantages__item').outerHeight(productAdvW*0.3174);
}, 150);


$(window).on('resize load change orientationchange', function(){
	resizeActions();
});
