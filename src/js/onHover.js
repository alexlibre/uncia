import { debounce } from './polyfills';

const body = document.body;
const onHover = () => {
    let timer;

    const check = function() {
        clearTimeout(timer);
        if (!body.classList.contains("disable-hover")) {
            body.classList.add("disable-hover");
        }

        timer = setTimeout(function() {
            body.classList.remove("disable-hover");
        }, 100);
    }

    const debounced = debounce(check);

    window.addEventListener(
        "scroll", debounced, false);
};

export default onHover;
