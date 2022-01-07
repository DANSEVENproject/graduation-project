'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const dropMenu = () => {
        const dropBlock = document.querySelector('.clubs-list'),
            dropList = dropBlock.lastElementChild;

        dropBlock.addEventListener('click', () => {
            (dropList.style.display === 'block') ? (
                dropList.style.display = 'none'
            ) : (
                dropList.style.display = 'block'
            )
        });
    };
    dropMenu();

    const modalWindows = () => {
        const modalVisit = document.getElementById('free_visit_form'),
            modalCallbackForm = document.getElementById('callback_form'),
            modalGift = document.getElementById('gift'),
            modalThanks = document.getElementById('thanks'),

            freeVisitBtn = document.querySelector('.free-visit'),
            fixedGiftBtn = document.querySelector('.fixed-gift'),
            callbackBtn = document.querySelectorAll('.callback-btn'),
            cardOrderBtn = document.querySelector('.card-order-btn'),

            overlay = document.querySelectorAll('.overlay'),
            buttonClose = document.querySelectorAll('.close_icon'),
            btnCloseText = document.querySelectorAll('.close-btn');

        const allModal = (modal, btnStart, background, btnClose, btnCloseTxt) => {

            let count = 0,
                getAnimation;

            const animationOpacity = () => {
                getAnimation = requestAnimationFrame(animationOpacity);
                count < 1 ? (
                    count += 0.05,
                    modal.style.opacity = `${count}`
                ) : (
                    cancelAnimationFrame(getAnimation)
                )
            };

            const animationMenu = () => {
                (count === 0) ? (
                    requestAnimationFrame(animationOpacity)
                ) : (
                    cancelAnimationFrame(animationOpacity),
                    count = 0
                )
            };
            if (modal && btnStart) {
                (btnStart === callbackBtn) ? (
                    btnStart[0].addEventListener('click', () => {
                        modal.style.display = 'block';
                        animationMenu();
                    }),
                    btnStart[1].addEventListener('click', () => {
                        modal.style.display = 'block';
                        animationMenu();
                    })
                ) : (
                    btnStart.addEventListener('click', () => {
                        if (btnStart === fixedGiftBtn) btnStart.style.display = 'none';
                        modal.style.display = 'block';
                        animationMenu();
                    })
                )

                modal.style.opacity = '0';
                modal.addEventListener('click', (event) => {
                    event.preventDefault();
                    const target = event.target;
                    if (target === btnCloseTxt || target === background || target === btnClose) {
                        modal.style.display = 'none';
                        animationMenu();
                        return;
                    }
                });
            }
        };
        allModal(modalVisit, freeVisitBtn, overlay[1], buttonClose[1]);

        allModal(modalThanks, cardOrderBtn, overlay[2], buttonClose[2], btnCloseText[0]);
        (fixedGiftBtn) ? (
            allModal(modalCallbackForm, callbackBtn, overlay[0], buttonClose[0]),
            allModal(modalGift, fixedGiftBtn, overlay[3], buttonClose[3], btnCloseText[1])
        ) : (
            allModal(modalCallbackForm, callbackBtn, overlay[0], buttonClose[0])
        )
    };
    modalWindows();

    const burgerMenu = () => {
        const menuPanel = document.querySelector('.hidden-large'),
            menu = document.querySelector('.hidden-small'),
            mainMenu = document.querySelector('.top-menu'),
            fixedGiftAdapt = document.querySelector('.fixed-gift'),
            PopUpMenu = document.querySelector('.popup-menu'),
            closePopUpMenuBtn = document.querySelector('.close-menu-btn');

        (document.documentElement.clientWidth < 768) ? (
            menuPanel.style.display = 'block',
            menu.style.display = 'none',
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > mainMenu.getBoundingClientRect().top + 185) {
                    mainMenu.style.position = 'fixed';
                    if (fixedGiftAdapt) {
                        fixedGiftAdapt.style.left = '15px';
                        fixedGiftAdapt.style.right = 'auto';
                    }
                } else {
                    mainMenu.style.position = 'static';
                    if (fixedGiftAdapt) {
                        fixedGiftAdapt.style.right = '15px';
                        fixedGiftAdapt.style.left = 'auto';
                    }
                }
            }),
            menuPanel.lastElementChild.addEventListener('click', () => {
                PopUpMenu.style.display = 'flex';
            }),
            PopUpMenu.addEventListener('click', (event) => {
                const target = event.target;
                if (target === closePopUpMenuBtn.lastElementChild || target === PopUpMenu || target.closest('a, li, ul')) {
                    PopUpMenu.style.display = 'none';
                    return;
                }
            })
        ) : (
            menuPanel.style.display = 'none',
            menu.style.display = 'flex'
        )
    };
    burgerMenu();

    const scrollArrow = () => {
        const arrowTop = document.getElementById('totop');

        arrowTop.style.display = 'none';
        window.addEventListener('scroll', () => {
            (document.documentElement.scrollTop > 450) ? (
                arrowTop.style.display = 'block'
            ) : (
                arrowTop.style.display = 'none'
            )
        });
    };
    scrollArrow();

    const sliderAutoScroll = () => {
        const slider = document.querySelector('.head-slider>.wrapper>.main-slider');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index) => {
            elem.children[index].style.display = 'none';
        };
        const nextSlide = (elem, index) => {
            elem.children[index].style.display = 'flex';
        };

        const autoPlaySlider = () => {
            prevSlide(slider, currentSlide);
            currentSlide++;
            if (currentSlide >= slider.childElementCount) {
                currentSlide = 0;
            }
            nextSlide(slider, currentSlide);
        };

        const startSlide = (time = 2000) => {
            interval = setInterval(autoPlaySlider, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };
        slider.addEventListener('mouseover', () => {
            stopSlide();
        });
        slider.addEventListener('mouseout', () => {
            startSlide();
        });
        startSlide();
    };
    sliderAutoScroll();

    const maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
        const elem = selector;

        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            let i = 0,
                newValue = template.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i != -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type == "blur" && this.value.length < 5) {
                this.value = "";
            }

        }

        elem.addEventListener("input", mask);
        elem.addEventListener("focus", mask);
        elem.addEventListener("blur", mask);
    }

    const validation = () => {
        [...document.forms].forEach(item => {
            if (item.getElementsByTagName('input').phone) {
                maskPhone(item.getElementsByTagName('input').phone);
            }
            if (item.getElementsByTagName('input').name) {
                item.getElementsByTagName('input').name.addEventListener('input', () => {
                    item.getElementsByTagName('input').name.value =
                        item.getElementsByTagName('input').name.value.replace(/[0-9]/g, '');
                });
            }
            if (item.getElementsByTagName('p')) {
                [...item.getElementsByTagName('p')].forEach(item => {
                    if (item.matches('.personal-data')) {
                        [...item.getElementsByTagName('input')]
                    } //доделать обязательный клик для галочки
                });
            }
        });
    };
    validation();

    class Calc {
        constructor() {
            if (document.querySelector('#card_order>.time')) {
                this.priceTotal = document.getElementById('price-total');
                this.promocode = document.querySelector('.price-message__promo');
                this.time = document.querySelector('#card_order>.time');
                this.club = document.querySelectorAll('.club');
            }
            this.timeAnalog = document.querySelector('.cards-types');
            this.form = document.querySelector('#card_order');
            this.priceMozaika = [1999, 9900, 13900, 19900];
            this.priceShelkovo = [2999, 14990, 21990, 24990];
            this.result = 0;
            this.index = 0;
        }

        analizChecked(elem) {
            for (let i = 0; i < [...elem.getElementsByTagName('input')].length; i++) {
                if ([...elem.getElementsByTagName('input')][i].checked) {
                    this.index = i;
                    break;
                }
            }
        }

        calculate() {
            if (document.querySelector('#mozaika')) this.result = this.priceMozaika[0];
            else if (document.querySelector('#schelkovo')) this.result = this.priceShelkovo[0];
            else {
                this.result = this.priceMozaika[0];
                this.priceTotal.textContent = this.priceMozaika[0];
            }

            this.form.addEventListener('change', (event) => {
                const target = event.target;

                if (document.querySelector('#card_order>.time')) {
                    if (!target.matches('#card_leto_mozaika') &&
                        !target.matches('#card_leto_schelkovo') &&
                        !target.matches('.price-message__promo') &&
                        !target.matches('#m1') &&
                        !target.matches('#m2') &&
                        !target.matches('#m3') &&
                        !target.matches('#m4')) return;

                    this.analizChecked(this.time);

                    if (this.club[0].firstElementChild.checked) {
                        this.promocode.value === 'ТЕЛО2019' || this.promocode.value === 'тело2019' ?
                            this.result = Math.floor(this.priceMozaika[this.index] * 0.7) :
                            this.result = this.priceMozaika[this.index];
                    } else if (this.club[1].firstElementChild.checked) {
                        this.promocode.value === 'ТЕЛО2019' || this.promocode.value === 'тело2019' ?
                            this.result = Math.floor(this.priceShelkovo[this.index] * 0.7) :
                            this.result = this.priceShelkovo[this.index];
                    }
                    this.priceTotal.textContent = this.result;
                } else {
                    if (!target.matches('#m1') &&
                        !target.matches('#m2') &&
                        !target.matches('#m3') &&
                        !target.matches('#m4') &&
                        !target.matches('#m5')) return;

                    this.analizChecked(this.timeAnalog);

                    if (this.index === 3) {
                        document.querySelector('#mozaika') ? this.result = this.priceMozaika[1] :
                            this.result = this.priceShelkovo[1];
                    } else if (this.index === 4) {
                        document.querySelector('#mozaika') ? this.result = this.priceMozaika[3] :
                            this.result = this.priceShelkovo[3];
                    } else {
                        document.querySelector('#mozaika') ? this.result = this.priceMozaika[this.index] :
                            this.result = this.priceShelkovo[this.index];
                    }
                }
            });
        }
    };
    const calc = new Calc();
    calc.calculate();

    const sendAjax = () => {
        const errorMessage = 'Что-то пошло не так..',
            loadMessage = 'Загрузка..',
            successMessage = 'Спасибо, мы скоро с вами свяжемся!';

        const forms = [...document.forms];

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('message-form');
        statusMessage.style.cssText = `font-size: 2rem;`;

        forms.forEach(item => {
            item.addEventListener('submit', (event) => {
                event.preventDefault();
                item.appendChild(statusMessage);

                statusMessage.textContent = loadMessage;

                postData(data)
                    .then((response) => {
                        if (response.status !== 200) {
                            throw new Error('status network not 200');
                        }
                        statusMessage.textContent = successMessage;
                        for (let i = 0; i < item.length; i++) {
                            if (item[i].tagName.toLowerCase() !== 'button') {
                                item[i].value = '';
                            }
                        }
                    })
                    .catch((error) => {
                        count = 0;
                        opacityListener(errorMessage);
                        console.error(error);
                    });
            });
        });

        const postData = (data) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify(data)
            });
        };
    };
    sendAjax();
});