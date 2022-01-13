import funcAnimationOpacity from './FuncAnimationOpacity';

class SendForm {
    constructor() {
        this.clickMessage = 'Вы не заполнили все поля или не нажали на галочку.';
        this.loadMessage = 'Загрузка данных.';
        this.errorMessage = 'Ошибка отправки...';
        this.lateTitle = 'Подождите.';
        this.errorTitle = 'Предупреждение!';
        this.congratulationTitle = 'Спасибо';
        this.congratulation = 'Ваша заявка отправлена.';
        this.modalThanks = document.getElementById('thanks');
        this.modalThanksTxt = document.getElementById('congratulations');
        this.title = document.getElementById('message-form');
        this.forms = [...document.forms];
    }

    createModal(message, title) {
        this.modalThanks.style.display = 'block';
        funcAnimationOpacity.animationMenu(this.modalThanks);
        this.modalThanks.addEventListener('click', (event) => {
            const target = event.target;
            if (!target.matches('.close-btn, .overlay, .close_icon')) return;
            this.modalThanks.style.display = 'none';
        });

        this.title.textContent = message;
        this.modalThanksTxt.textContent = title;
    }

    postDataProcessing(body, item) {
        return this.postData(body, item)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }

                this.createModal(this.congratulationTitle, this.congratulation);
                document.getElementById('free_visit_form').style.display = 'none';
                document.getElementById('callback_form').style.display = 'none';
                if ([...item.getElementsByTagName('input')][item.getElementsByTagName('input').length - 1].checked) {
                    [...item.getElementsByTagName('input')][item.getElementsByTagName('input').length - 1].checked = false;
                }
                item.forEach(items => {
                    if (items.tagName.toLowerCase() !== 'button') {
                        items.value = '';
                    }
                });
                document.getElementById('callback_footer_form-phone').value = '';
            })
            .catch((error) => {
                this.createModal(this.errorTitle, this.errorMessage);
                console.error(error);
            });
    }

    postData(body) {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(body)
        })
    }

    validationSend() {
        this.forms.forEach(item => {
            item.addEventListener('submit', (event) => {
                const target = event.target;
                event.preventDefault();
                if (target.matches('#footer_form') && (document.getElementById('footer_leto_mozaika').checked ||
                        document.getElementById('footer_leto_schelkovo').checked)) {
                    this.pushJSON(item);
                } else if ([...item.getElementsByTagName('input')][item.getElementsByTagName('input').length - 1].checked) {
                    ([...item.getElementsByTagName('input')]).forEach((items, i) => {
                        if (i === [...item.getElementsByTagName('input')].length - 1) return;
                        if (items.value === '') {
                            this.createModal(this.errorTitle, this.clickMessage);
                            return;
                        }
                    })
                    this.pushJSON(item);
                } else {
                    this.createModal(this.errorTitle, this.clickMessage);
                }
            });
        });
    }

    pushJSON(item) {
        const formData = new FormData(item);
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
            if (item === document.getElementById('card_order')) {
                if (!document.getElementById('schelkovo') && !document.getElementById('mozaika')) {
                    body['price'] = document.getElementById('price-total').textContent;
                }
            }
        });
        this.createModal(this.lateTitle, this.loadMessage);
        this.postDataProcessing(body, item);
    }

};
const sendForm = new SendForm();
export default sendForm;