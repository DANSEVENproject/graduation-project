class SliderCarousel {
    constructor() {
        this.slider = document.querySelector('.services-slider');
        this.wrapper = document.querySelector('#services>.wrapper');
        this.slide = document.querySelectorAll('#services .slide');
        this.leftArrow = document.querySelector('#services .slide-prev-dot');
        this.rightArrow = document.querySelector('#services .slide-next-dot');
        this.prevSlide = this.prevSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
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
        const sliderItem = this.slide;
        sliderItem.forEach(item => {
            item.style.cssText = `
            flex: 0 0 ${this.widthSlide}% !important
            `;
        });
        (window.innerWidth > 1000) ? (
            this.rightArrow.style.cssText = `
            left: ${(((window.innerWidth - this.wrapper.clientWidth) / 2 
                + this.wrapper.clientWidth) - 30) * 100 / window.innerWidth}%;
        `,
            this.leftArrow.style.cssText = `
            left: ${((window.innerWidth - this.wrapper.clientWidth) / 2) * 100 / window.innerWidth}%;
        `
        ) : (
            this.rightArrow.style.cssText = `
            left: ${(((window.innerWidth - this.wrapper.clientWidth) / 2 
                + this.wrapper.clientWidth) - 40) * 100 / window.innerWidth}%;
        `, this.leftArrow.style.cssText = `
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

        this.leftArrow.addEventListener('click', this.prevSlide);
        this.rightArrow.addEventListener('click', this.nextSlide);
    }
};
const sliderCarousel = new SliderCarousel();
export default sliderCarousel;