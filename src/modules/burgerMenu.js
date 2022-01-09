const burgerMenu = () => {
    const menuPanel = document.querySelector('.hidden-large'),
        menu = document.querySelector('.hidden-small'),
        mainMenu = document.querySelector('.top-menu'),
        fixedGiftAdapt = document.querySelector('.fixed-gift'),
        PopUpMenu = document.querySelector('.popup-menu'),
        closePopUpMenuBtn = document.querySelector('.close-menu-btn');

    const checkPosition = (pos, fixpanel) => {
        mainMenu.style.position = pos;
        if (fixpanel) {
            fixpanel.style.left = '15px';
            fixpanel.style.right = 'auto';
        }
    };

    (document.documentElement.clientWidth < 768) ? (
        menuPanel.style.display = 'block',
        menu.style.display = 'none',
        window.addEventListener('scroll', () => {
            (window.pageYOffset > mainMenu.getBoundingClientRect().top + 185) ?
            checkPosition('fixed', fixedGiftAdapt): checkPosition('static', fixedGiftAdapt);
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
export default burgerMenu;