class Slider {
    constructor() {
        this.slider = document.querySelector('.gallery-slider');
        this.wrapper = document.querySelector('.gallery-bg>.wrapper');
        this.currentSlide = 0;
        this.interval = 0;
    }

    init() {
        this.addArrow();
        this.createDot();
        this.createClassActive();
        this.listenerMouse();
        this.startSlide();
        this.nowSlide();
    }

    controlSlide(elem, index, strName) {
        elem.children[index].className = strName;
    }

    createClassActive() {
        this.slider.children[0].className = 'slider-active';
        let style = document.createElement('style');
        style.textContent = `
            @media (max-width: 850px) {
                .gallery-bg .dot-active{
                    width: 10px !important;
                    height: 4px !important;
                }
                .gallery-bg .dot{
                    width: 10px !important;
                    height: 4px !important;
                }
                .gallery-bg .dots{
                    margin-top: 250px !important;
                }
                .gallery-slider {
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                }
            }
            @media (max-width: 650px) {
                .gallery-bg .dots{
                    margin-top: 130px !important;
                }
                .gallery-bg .wrapper {
                    padding-left: 0px;
                    padding-right: 0px;
                }
            }
            .gallery-bg>.wrapper{
                display: flex;
                align-items: center;
            }
            .gallery-bg .dots{
                position: absolute;
                left: 50%;
                margin-top: 330px;
            }
            .gallery-bg .dot-active{
                width: 30px;
                height: 5px;
                margin: 0px 3px;
                border: none;
                background: #ffd11a;
            }
            .gallery-bg .dot{
                width: 30px;
                height: 5px;
                margin: 0px 3px;
                border: none;
                background: #fff;
            }
            .gallery-slider {
                padding-left: 35px;
                padding-right: 35px;
            }
            .gallery-slider .slider-active {
                display: block;
            }
            .gallery-slider .slide {
                display: none;
            }
            .slide-prev-dot{
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
        style.classList.add('sliderPhoto');
        document.head.appendChild(style);
    }

    createDot() {
        const ulLi = document.createElement('ul');
        ulLi.classList.add('dots');
        [...this.slider.children].forEach((item, i) => {
            const li = document.createElement('button');
            (i === 0) ? li.classList.add('dot-active'): li.classList.add('dot');
            ulLi.insertAdjacentElement('beforeend', li);
        });
        this.wrapper.insertAdjacentElement('beforeend', ulLi);
    }

    autoPlaySlider() {
        this.controlSlide(this.slider, this.currentSlide, 'slide');
        this.controlSlide(document.querySelector('.dots'), this.currentSlide, 'dot');
        this.currentSlide++;
        if (this.currentSlide >= this.slider.childElementCount) {
            this.currentSlide = 0;
        }
        this.controlSlide(this.slider, this.currentSlide, 'slider-active');
        this.controlSlide(document.querySelector('.dots'), this.currentSlide, 'dot-active');
    };

    listenerMouse() {
        this.wrapper.addEventListener('mouseover', (event) => {
            const target = event.target;
            if (!target.matches(`.dot-active, .dot, .slide-next-dot>img,
            .slide-prev-dot>img, .slide-next-dot, .slide-prev-dot`)) return;
            this.stopSlide();
        });
        this.wrapper.addEventListener('mouseout', (event) => {
            const target = event.target;
            if (!target.matches(`.dot-active, .dot, .slide-next-dot>img,
            .slide-prev-dot>img, .slide-next-dot, .slide-prev-dot`)) return;
            this.startSlide();
        });
    }

    startSlide(time = 2000) {
        this.interval = setInterval(this.autoPlaySlider.bind(this), time);
    };

    stopSlide() {
        clearInterval(this.interval);
    };

    createArrow(nameDot, src) {
        const dot = document.createElement('button');
        dot.classList.add(nameDot);
        const img = document.createElement('img');
        img.src = src;
        dot.insertAdjacentElement('beforeend', img);
        (nameDot === 'slide-prev-dot') ?
        this.slider.insertAdjacentElement('beforebegin', dot):
            this.slider.insertAdjacentElement('afterend', dot);
    }

    addArrow() {
        this.createArrow('slide-prev-dot', './images/arrow-left.svg');
        this.createArrow('slide-next-dot', './images/arrow-right.svg');
    }

    nowSlide() {
        document.querySelector('.dots').style['margin-left'] = `-${document.querySelector('.dots').clientWidth / 2}px`;
        window.addEventListener('resize', () => {
            document.querySelector('.dots').style['margin-left'] = `-${document.querySelector('.dots').clientWidth / 2}px`;
        })
        this.wrapper.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target;
            if (!target.matches(`.slide-prev-dot , .slide-prev-dot>img, 
            .slide-next-dot, .slide-next-dot>img, .dot`)) {
                return;
            }

            this.controlSlide(this.slider, this.currentSlide, 'slide');
            this.controlSlide(document.querySelector('.dots'), this.currentSlide, 'dot');

            if (target.matches('.slide-next-dot, .slide-next-dot>img')) {
                this.currentSlide++;
            } else if (target.matches('.slide-prev-dot, .slide-prev-dot>img')) {
                this.currentSlide--;
            } else if (target.matches('.dot')) {
                document.querySelectorAll('.dot').forEach((item, i) => {
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
            this.controlSlide(document.querySelector('.dots'), this.currentSlide, 'dot-active');
        })
    }
};
const slider = new Slider();
export default slider;