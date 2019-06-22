"use strict";
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





});