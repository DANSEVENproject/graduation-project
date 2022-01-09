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

    promocodeChoice(priceChoice) {
        this.promocode.value === 'ТЕЛО2019' || this.promocode.value === 'тело2019' ?
            this.result = Math.floor(priceChoice[this.index] * 0.7) :
            this.result = priceChoice[this.index];
    }

    cardChoice(index) {
        document.querySelector('#mozaika') ? this.result = this.priceMozaika[index] :
            this.result = this.priceShelkovo[index];
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
                    this.promocodeChoice(this.priceMozaika);
                } else if (this.club[1].firstElementChild.checked) {
                    this.promocodeChoice(this.priceShelkovo);
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
                    this.cardChoice(1);
                } else if (this.index === 4) {
                    this.cardChoice(3);
                } else {
                    this.cardChoice(this.index);
                }
            }
        });
    }
};
const calc = new Calc();
export default calc;