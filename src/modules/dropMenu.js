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
export default dropMenu;