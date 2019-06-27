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
let languagesItems = $('.languages__item'),
languagesMobile = $('.languages__mobile'),
currencyMobile = $('.currency__mobile'),
currencyItems = $('.currency__item'),
doc = $(document),
documentClickLang,
langItemsClick,
closeLoginClick,
closeSignupClick;



let activeCloseLogin = debounce(function(){
	$('.login').toggleClass('form--active');
	let documentClickCloseLogin;
	closeLoginClick = $('#close-login').click(function(){
		console.log('Закрытие логина по клику по кнопке');
		$('.login').removeClass('form--active');
		$('#close-login').off('click');
		documentClickCloseLogin.off('click');
	});


	documentClickCloseLogin = doc.click(function(event){
		console.log('Закрытие логина по клику вне блока');
		if ($(event.target).closest($('.login')).length) return;
		$('.login').removeClass('form--active');
		// event.stopPropagation();
		closeLoginClick.off('click');
		documentClickCloseLogin.off('click');
	});
},200);


let activeCloseSignup = debounce(function(){
	$('.signup').toggleClass('form--active');
	let documentClickCloseSignup;
	closeSignupClick = $('#close-signup').click(function(){
		$('.signup').removeClass('form--active');
		closeSignupClick.off('click');
		documentClickCloseSignup.off('click');
	});

	documentClickCloseSignup = doc.click(function(event) {
		console.log('click documentClickCloseSignup');
		if ($(event.target).closest($('.signup')).length) return;
		$('.signup').removeClass('form--active');
		documentClickCloseSignup.off('click');
		closeSignupClick.off('click')
	});
},200);

function activeLangSelection(){
	langItemsClick = languagesItems.click(function(){
		console.log('Клик по айтему языка');
		languagesItems.removeClass('languages__item--active');
		$(this).addClass('languages__item--active');
		updateLangMob();
		$('.languages__list').removeClass('languages__list--active');
		languagesItems.off('click');
		documentClickLang.off('click');
	});

	documentClickLang = doc.click(function(event) {
		console.log('Клик вне блока языков');
		if ($(event.target).closest(languagesItems).length) return;
		$('.languages__list').removeClass('languages__list--active');
		languagesItems.off('click');
		documentClickLang.off('click');
	});
}//activeLangSelection


function activeCurSelection(){
	let documentClickCur;
	currencyItems.click(function(){
		console.log('Клик по айтему выбора валюты');
		currencyItems.removeClass('currency__item--active');
		$(this).addClass('currency__item--active');
		updateCurMob();
		updatePriceCur();
		$('.currency__list').removeClass('currency__list--active');
		currencyItems.off('click');
		documentClickCur.off('click');
	});

	documentClickCur = doc.click(function(event) {
		console.log('Клик вне блока выбора валюты');
		if ($(event.target).closest(currencyItems).length) return;
		$('.currency__list').removeClass('currency__list--active');
		documentClickCur.off('click');
		currencyItems.off('click');
	});
}//activeCurSelection

function activeCurSelectionDT(){
	currencyItemsClick = currencyItems.click(function(){
		console.log('Клик по айтему валюты DT');
		currencyItems.removeClass('currency__item--active');
		$(this).addClass('currency__item--active');
		updateCurMob();
		updatePriceCur();
		$('.currency__list').removeClass('currency__list--active');
	});
}//activeCurSelectionDT

function activeLangSelectionDT(){
	langItemsClick = languagesItems.click(function(){
		console.log('Клик по айтему языка DT');
		languagesItems.removeClass('languages__item--active');
		$(this).addClass('languages__item--active');
		updateLangMob();
		$('.languages__list').removeClass('languages__list--active');
	});
}//activeLangSelectionDT

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



$(document).ready(function(){
	// ======  SLICK   ======
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

		$('.best-sellers-js').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		// prevArrow: '.slider__controls--prev',
		// nextArrow: '.slider__controls--next',
		easing: 'swing',
		speed: 700,
		// appendDots: $('.slider__dots'),
		dots: true,
		// dotsClass: 'custom-dots',
		// customPaging: function (slider, i) {
		// 	var slideNumber = (i + 1),
		// 	totalSlides = slider.slideCount;
		// 	return '<a class="slider__dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"></a>';
		// }
	});





	// ======  SLICK   ======

	$('.user-menu__link--signup').click(function(){
		activeCloseSignup();
	});
	$('.greeting__link--signup').click(function(){
		activeCloseSignup();
	});
	$('.user-menu__link--login').click(function(){
		activeCloseLogin();
	});
	$('.greeting__link--login').click(function(){
		activeCloseLogin();
	});


	let languagesMobileClick = debounce(function(){
		console.log('клик по кнопке открытия мобильного языка');
		$('.languages__list').addClass('languages__list--active');
		activeLangSelection();
	},200);
	languagesMobile.click(function(){
		languagesMobileClick();
	});


	let currencyMobileClick = debounce(function(){
		console.log('клик по валюта мобила');
		$('.currency__list').addClass('currency__list--active');
		activeCurSelection();
	},200);
	currencyMobile.click(function(){
		currencyMobileClick();
	});

	activeLangSelectionDT();
	activeCurSelectionDT();
	updateLangMob();
	updateCurMob();
}); //$(document).ready

// Переменная smallSizeWasActivated указывающая что уже были активированы ивенты для маленького размера,
// Если это так - только тогда удаляются ивенты после ресайза
let smallSizeWasActivated = false,
mql = window.matchMedia('all and (max-width: 780px)'),
small = window.matchMedia('all and (max-width: 480px)'),
mobileLangCurSize = window.matchMedia('all and (min-width: 641px)'),
search = $('.search'),
searchInput = $('.search .input-field'),
cart = $('.cart'),
searchIcon = $('.search__icon'),
searchIconClick,
searchDocClick;

let resizeActions = debounce(function() {
	console.log('Запущен resizeActions');
	searchInput.off('click');
	if(mql.matches){ //max-width: 780px
		$('.search').after(cart);
		$('.header-middle__inner').after($('.user-menu'));
	}else{
		$('.user-menu__list').after(cart);
		$('.header-middle__inner').append($('.user-menu'));
	}

	if(mobileLangCurSize.matches){ //min-width: 641px
		langItemsClick.off('click');
		currencyItemsClick.off('click');
		activeLangSelectionDT();
		activeCurSelectionDT();
	}

	if(small.matches){
		smallSizeWasActivated = true;

		searchInput.attr('placeholder', 'Search...');
		searchActions();

		function searchActions(){
			console.log('searchActions');
			//input Search
			searchInput.click(function(event){
				searchInput.off('click');
				console.log('Клик по searchInput');
				search.addClass('search--active');
				window.setTimeout(function(){
					// document click to close
					searchDocClick = $(document).click(function(event) {
						if ($(event.target).closest($('.search')).length){
							console.log('document click отфильтрован как клик по поиску.');
							return
						};
						console.log('Клик вне Search input');
						search.removeClass('search--active');
						event.stopPropagation();
						searchDocClick.off('click');
						searchIconClick.off('click');
						searchInput.off('click');
						searchActions();
					});
				},100);
				// Search Icon
				searchIconClick = searchIcon.click(function(){
					console.log('search__icon click');
					$('.search').removeClass('search--active');
					searchIconClick.off('click');
					searchDocClick.off('click');
					searchInput.off('click');
					searchActions();
				});
			});
		} //max-width: 480px
	}else{
		if(smallSizeWasActivated){
			console.log("экран больше 480");
			smallSizeWasActivated = false;
			$('.search .input-field').attr('placeholder', 'Search entire store here...');
			search.removeClass('search--active');
			searchInput.off('click');
			searchDocClick.off('click');
			searchIconClick.off('click');
		}
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
}, 300);


$(window).on('resize load change orientationchange', function(){
	resizeActions();
});
