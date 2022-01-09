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
export default scrollArrow;