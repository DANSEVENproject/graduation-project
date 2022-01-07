class SliderCarousel {
    constructor({
        slider,
        wrapper,
        infinity = false,
        position = 0,
        slidesToShow,
        responsive = []
    }) {
        this.slider = document.querySelector(slider);
        this.wrapper = document.querySelector(wrapper);
        this.slides = document.querySelector(slider).children;
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            infinity,
            widthSlide: Math.floor(100 / this.slidesToShow),
        }
        this.responsive = responsive;
    }

    init() {
        this.addGloClass();
        this.addStyle();
        this.addDots();
        this.responseInit();
    }

    addGloClass() {
        this.slider.classList.add('slider');
        this.wrapper.classList.add('slider__wrap');
        [...this.slides].forEach(item => {
            item.classList.add('slider__item');
        });
    }

    addStyle() {
        let style = document.getElementById('sliderCarusel-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarousel-style';
        }
        style.textContent = `
            .slider {
                overflow: hidden !important;
            }
            .slider__wrap {
                transition: transform 0.5s !important;
                will-change: transform !important;
            }
            .slider__item {
                display: flex !important;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                flex: 0 0 ${this.options.widthSlide}% !important;
                margin: auto 0 !important;
            }
        `;
        document.head.appendChild(style);
    }

    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.slides.length - this.slidesToShow;
            }
            this.wrapper.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`
        }
    }

    nextSlider() {
        if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
            ++this.options.position;
            if (this.options.position > this.slides.length - this.slidesToShow) {
                this.options.position = 0;
            }
            this.wrapper.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`
        }
    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allResponse);

        const checkWidthWindow = (slideCount) => {
            this.slidesToShow = slideCount;
            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
            this.addStyle();
        };
        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            (widthWindow < maxResponse) ? (
                allResponse.forEach((item, i) => {
                    if (widthWindow < item) {
                        checkWidthWindow(this.responsive[i].slideToShow);
                    }
                })
            ) : (
                checkWidthWindow(slidesToShowDefault)
            )
        };
        checkResponse();

        window.addEventListener('resize', checkResponse);
    }

    createDot(nameDot, src, func) {
        const dot = document.createElement('button');
        dot.classList.add(nameDot);
        const img = document.createElement('img');
        img.src = src;
        dot.insertAdjacentElement('beforeend', img);
        dot.addEventListener('click', func.bind(this));
        this.wrapper.insertAdjacentElement('afterend', dot);
    }

    addDots() {
        let style = document.createElement('style');
        this.createDot('slide-prev-dot', './images/arrow-left.png', this.nextSlider);
        this.createDot('slide-next-dot', './images/arrow-right.png', this.prevSlider);
        let heightImg = document.querySelector('.services-slider>.slide>img').clientHeight;
        style.textContent = `
            .slide-prev-dot{
                position: absolute;
                margin-top: -${this.slider.clientHeight - heightImg/2}px;
                border-radius: 50%;
                display: flex;
                height: 40px;
                width: 40px;
                align-items: center;
                justify-content: center;
                background: #ffd11a;
                border: none;
            }
            .slide-prev-dot img{
                height: 17px;
                width: 17px;
                margin-right: 2px;
            }
            .slide-next-dot{
                position: absolute;
                margin-top: -${this.slider.clientHeight - heightImg/2}px;
                margin-left: ${this.slider.clientWidth}px;
                border-radius: 50%;
                display: flex;
                height: 40px;
                width: 40px;
                align-items: center;
                justify-content: center;
                background: #ffd11a;
                border: none;
            }
            .slide-next-dot img{
                height: 17px;
                width: 17px;
                margin-left: 2px;
                right: 0;
            }
        `;
        document.body.appendChild(style);
    }
}