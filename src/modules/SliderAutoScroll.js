class SliderAutoScroll {
    constructor() {
        this.slider = document.querySelector('.head-slider>.wrapper>.main-slider');
        this.currentSlide = 0,
            this.interval = '';
    }

    controlSlide(elem, index, stl) {
        elem.children[index].style.display = stl;
    }

    autoPlaySlider() {
        this.controlSlide(this.slider, this.currentSlide, 'none');
        this.currentSlide++;
        if (this.currentSlide >= this.slider.childElementCount) {
            this.currentSlide = 0;
        }
        this.controlSlide(this.slider, this.currentSlide, 'flex');
    };

    startSlide(time = 2000) {
        this.interval = setInterval(this.autoPlaySlider.bind(this), time);
    }
};
const sliderAutoScroll = new SliderAutoScroll();
export default sliderAutoScroll;