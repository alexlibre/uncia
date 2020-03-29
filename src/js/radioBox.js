const initRadioBoxes = () => {
    const radioBoxes = [...document.querySelectorAll('.js-radio-box')];
    if (!radioBoxes.length) return false;

    radioBoxes.map(box => {
        const input = box.querySelector('input');
        const nameSpace = input.dataset.name;
        const entries = [...document.querySelectorAll('input[data-name="' + nameSpace + '"]')];

        const switchSelects = function(e) {
            entries.map(entry => {
                entry.checked = false;
            });

            this.checked = true;
        }

        input.addEventListener('change', switchSelects);
    })
}

export default initRadioBoxes;