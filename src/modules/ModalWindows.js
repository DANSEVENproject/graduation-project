import funcAnimationOpacity from './FuncAnimationOpacity';

class ModalWindows {
    constructor() {
        this.modalVisit = document.getElementById('free_visit_form');
        this.modalCallbackForm = document.getElementById('callback_form');
        this.modalGift = document.getElementById('gift');

        this.freeVisitBtn = document.querySelector('.free-visit');
        this.fixedGiftBtn = document.querySelector('.fixed-gift');
        this.callbackBtn = document.querySelectorAll('.callback-btn');

        this.overlay = document.querySelectorAll('.overlay');
        this.buttonClose = document.querySelectorAll('.close_icon');
        this.btnCloseText = document.querySelectorAll('.close-btn');
    }

    addListener(btnStart, modalWindow) {
        btnStart.addEventListener('click', () => {
            if (btnStart === this.fixedGiftBtn) btnStart.style.display = 'none';
            modalWindow.style.display = 'block';
            funcAnimationOpacity.animationMenu(modalWindow);
        });
    }

    allModal(modal, btnStart, background, btnClose, btnCloseTxt) {
        if (modal && btnStart) {
            (btnStart === this.callbackBtn) ? (
                this.addListener(btnStart[0], modal)
            ) : (
                this.addListener(btnStart, modal)
            )

            modal.style.opacity = '0';
            modal.addEventListener('click', (event) => {
                const target = event.target;
                if (target === btnCloseTxt || target === background || target === btnClose) {
                    modal.style.display = 'none';
                    funcAnimationOpacity.animationMenu(modal);
                    return;
                }
            });
        }
    }

    initWindow() {
        this.allModal(this.modalVisit, this.freeVisitBtn, this.overlay[1], this.buttonClose[1]);
        (this.fixedGiftBtn) ? (
            this.allModal(this.modalCallbackForm, this.callbackBtn, this.overlay[0], this.buttonClose[0]),
            this.allModal(this.modalGift, this.fixedGiftBtn, this.overlay[3], this.buttonClose[3], this.btnCloseText[1])
        ) : (
            this.allModal(this.modalCallbackForm, this.callbackBtn, this.overlay[0], this.buttonClose[0])
        )
    }
};
const modalWindows = new ModalWindows();
export default modalWindows;