class FuncAnimationOpacity {
    constructor() {
        this.count = 0;
        this.getAnimation = '';
        this.modal = '';
    }

    animationOpacity() {
        this.getAnimation = requestAnimationFrame(this.animationOpacity.bind(this));
        this.count < 1 ? (
            this.count += 0.05,
            this.modal.style.opacity = `${this.count}`
        ) : (
            cancelAnimationFrame(this.getAnimation)
        )
    }

    animationMenu(modalWindow) {
        this.modal = modalWindow;
        this.count = 0;
        (this.count === 0) ? (
            requestAnimationFrame(this.animationOpacity.bind(this))
        ) : (
            cancelAnimationFrame(this.animationOpacity.bind(this)),
            this.count = 0
        )
    };
}
const funcAnimationOpacity = new FuncAnimationOpacity();
export default funcAnimationOpacity;