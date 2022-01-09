'use strict';

import 'nodelist-foreach-polyfill';
import 'element-matches-polyfill';
import 'element-closest-polyfill';
import 'formdata-polyfill';
import 'promise-polyfill';
import 'fetch-polyfill';

import dropMenu from './modules/dropMenu';
import scrollArrow from './modules/scrollArrow';
import validation from './modules/validation';
import burgerMenu from './modules/burgerMenu';
import modalWindows from './modules/modalWindows';
import sendForm from './modules/sendForm';
import sliderAutoScroll from './modules/sliderAutoScroll';
import calc from './modules/calc';
import slider from './modules/slider';
import sliderCarousel from './modules/sliderCarousel';

dropMenu();
scrollArrow();
validation();
burgerMenu();
modalWindows.initWindow();
sendForm.validationSend();
sliderAutoScroll.startSlide();
calc.calculate();
slider.init();
sliderCarousel.init();