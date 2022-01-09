class SliderCarousel {
    constructor() {
        this.slider = document.querySelector('.services-slider');
        this.wrapper = document.querySelector('#services>.wrapper');
        this.slidesToShow = 5;
        this.position = 0;
        this.widthSlide = Math.floor(100 / this.slidesToShow);
        this.responsive = [{
            breakpoint: 1190,
            slideToShow: 4
        }, {
            breakpoint: 1000,
            slideToShow: 3
        }, {
            breakpoint: 740,
            slideToShow: 2
        }, {
            breakpoint: 510,
            slideToShow: 1
        }];
    }

    init() {
        this.addClass();
        this.addStyle();
        this.addArrow();
        this.responseInit();
    }

    addClass() {
        this.slider.classList.add('slider');
        this.wrapper.classList.add('slider__wrap');
        [...this.slider.children].forEach(item => {
            item.classList.add('slider__item');
        });
    }

    addStyle() {
        const style = document.createElement('style');
        style.classList.add('sliderCarousel');
        style.textContent = `
            .slider {
                transition: transform 0.5s !important;
                will-change: transform !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }
            .slider__wrap {
                overflow: hidden !important;                          
                padding-left: 0px !important;
                padding-right: 0px !important;
            }
            .slider__item {
                display: flex !important;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin: auto 0 !important;
            }

            #services .slide-prev-dot{
                position: absolute;
                z-index: 1;
                margin-left: -7px;
                margin-top: 60px;
                border-radius: 50%;
                display: flex;
                height: 40px;
                width: 40px;
                align-items: center;
                justify-content: center;
                background: #ffd11a;
                border: none;
            }
            #services .slide-prev-dot img{
                height: 17px;
                width: 17px;
                margin-right: 2px;
            }
            #services .slide-next-dot{
                position: absolute;
                border-radius: 50%;
                z-index: 1;
                margin-top: 60px;
                display: flex;
                height: 40px;
                width: 40px;
                align-items: center;
                justify-content: center;
                background: #ffd11a;
                border: none;
            }
            #services .slide-next-dot img{
                height: 17px;
                width: 17px;
                margin-left: 2px;
                right: 0;
            }
        `;
        document.head.appendChild(style);
    }

    nextSlide() {
        if (this.position < this.slider.childElementCount - this.slidesToShow) {
            ++this.position;
            if (this.position > this.slider.childElementCount - this.slidesToShow) {
                this.position = 0;
            }
            this.slider.style.transform = `translateX(-${this.position * this.widthSlide}%)`;
        }
    }

    prevSlide() {
        if (this.position > 0) {
            --this.position;
            if (this.position < 0) {
                this.position = this.slider.childElementCount - this.slidesToShow;
            }
            this.slider.style.transform = `translateX(-${this.position * this.widthSlide}%)`;
        }
    }

    checkWidthWindow(slideCount) {
        this.slidesToShow = slideCount;
        this.widthSlide = Math.floor(100 / this.slidesToShow);
        const sliderItem = document.querySelectorAll('.slider__item');
        sliderItem.forEach(item => {
            item.style.cssText = `
            flex: 0 0 ${this.widthSlide}% !important
            `;
        });
        (window.innerWidth > 1000) ? (
            document.querySelector('#services .slide-next-dot').style.cssText = `
            left: ${(((window.innerWidth - this.wrapper.clientWidth) / 2 
                + this.wrapper.clientWidth) - 30) * 100 / window.innerWidth}%;
        `,
            document.querySelector('#services .slide-prev-dot').style.cssText = `
            left: ${((window.innerWidth - this.wrapper.clientWidth) / 2) * 100 / window.innerWidth}%;
        `
        ) : (
            document.querySelector('#services .slide-next-dot').style.cssText = `
            left: ${(((window.innerWidth - this.wrapper.clientWidth) / 2 
                + this.wrapper.clientWidth) - 40) * 100 / window.innerWidth}%;
        `, document.querySelector('#services .slide-prev-dot').style.cssText = `
            left: ${(((window.innerWidth - this.wrapper.clientWidth) / 2) + 7) * 100 / window.innerWidth}%;
        `
        )
    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allResponse);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            (widthWindow < maxResponse) ? (
                allResponse.forEach((item, i) => {
                    if (widthWindow < item) {
                        this.checkWidthWindow(this.responsive[i].slideToShow);
                    }
                })
            ) : (
                this.checkWidthWindow(slidesToShowDefault)
            )
        };
        checkResponse();
        window.addEventListener('resize', checkResponse);
    }

    createArrow(nameDot, src) {
        const dot = document.createElement('button');
        dot.classList.add(nameDot);
        const img = document.createElement('img');
        img.src = src;
        dot.insertAdjacentElement('beforeend', img);
        this.slider.insertAdjacentElement('beforebegin', dot);
        (dot.matches('.slide-prev-dot')) ?
        dot.addEventListener('click', this.prevSlide.bind(this)):
            dot.addEventListener('click', this.nextSlide.bind(this));
    }

    addArrow() {
        this.createArrow('slide-prev-dot', './images/arrow-left.svg');
        this.createArrow('slide-next-dot', './images/arrow-right.svg');
    }
};
const sliderCarousel = new SliderCarousel();
export default sliderCarousel;