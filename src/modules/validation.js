import maskPhone from "./helper";
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
    });
};
export default validation;