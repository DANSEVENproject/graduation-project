class Slider {
    constructor() {
        this.slider = document.querySelector('.gallery-slider');
        this.wrapper = document.querySelector('.gallery-bg>.wrapper');
        this.currentSlide = 0;
        this.interval = 0;
        this.dots = document.querySelector('.dots');
        this.dot = document.querySelectorAll('.dot');
        this.startSlide = this.startSlide.bind(this);
        this.stopSlide = this.stopSlide.bind(this);
    }

    init() {
        this.slider.children[0].className = 'slider-active';
        this.listenerMouse();
        this.startSlide();
        this.nowSlide();
    }

    controlSlide(elem, index, strName) {
        elem.children[index].className = strName;
    }

    autoPlaySlider() {
        this.controlSlide(this.slider, this.currentSlide, 'slide');
        this.controlSlide(this.dots, this.currentSlide, 'dot');
        this.currentSlide++;
        if (this.currentSlide >= this.slider.childElementCount) {
            this.currentSlide = 0;
        }
        this.controlSlide(this.slider, this.currentSlide, 'slider-active');
        this.controlSlide(this.dots, this.currentSlide, 'dot-active');
    };

    listenerMouse() {
        const eventMouse = (string, callback) => {
            this.wrapper.addEventListener(string, (event) => {
                const target = event.target;
                if (!target.matches(`.dot-active, .dot, .slide-next-dot>img,
                .slide-prev-dot>img, .slide-next-dot, .slide-prev-dot`)) return;
                callback();
            });
        }
        eventMouse('mouseover', this.stopSlide);
        eventMouse('mouseout', this.startSlide);
    }

    startSlide(time = 2000) {
        this.interval = setInterval(this.autoPlaySlider.bind(this), time);
    };

    stopSlide() {
        clearInterval(this.interval);
    };

    nowSlide() {
        this.dots.style['margin-left'] = `-${this.dots.clientWidth / 2}px`;
        window.addEventListener('resize', () => {
            this.dots.style['margin-left'] = `-${this.dots.clientWidth / 2}px`;
        })
        this.wrapper.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target;
            if (!target.matches(`.slide-prev-dot , .slide-prev-dot>img, 
            .slide-next-dot, .slide-next-dot>img, .dot`)) {
                return;
            }

            this.controlSlide(this.slider, this.currentSlide, 'slide');
            this.controlSlide(this.dots, this.currentSlide, 'dot');

            if (target.matches('.slide-next-dot, .slide-next-dot>img')) {
                this.currentSlide++;
            } else if (target.matches('.slide-prev-dot, .slide-prev-dot>img')) {
                this.currentSlide--;
            } else if (target.matches('.dot')) {
                this.dot.forEach((item, i) => {
                    if (item === target) {
                        this.currentSlide = i;
                    }
                });
            }

            if (this.currentSlide >= this.slider.childElementCount) {
                this.currentSlide = 0;
            }
            if (this.currentSlide < 0) {
                this.currentSlide = this.slider.childElementCount - 1;
            }

            this.controlSlide(this.slider, this.currentSlide, 'slider-active');
            this.controlSlide(this.dots, this.currentSlide, 'dot-active');
        })
    }
};
const slider = new Slider();
export default slider;