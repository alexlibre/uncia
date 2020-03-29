const handleAccordeons = function(selector, cn) {
    if (!selector) return false;

    const accordeons = [...document.querySelectorAll('.js-accordeon')];
    const containers = [...document.querySelectorAll('.js-accordeon-add')];

    let marker;
    const uncollapsed = document.querySelector('.js-accordeon-collapse.is-active');
    if (uncollapsed) uncollapsed.style.maxHeight = uncollapsed.scrollHeight + "px";

    containers.forEach((container, idx) => {
        container.addEventListener('click', function(e) {
            const collapses = [...document.querySelectorAll('.js-accordeon-collapse')];

            clearAll(accordeons);
            clearAll(containers);
            clearAll(collapses);

            collapses.forEach(item => {
                item.style.maxHeight = null;
            })

            container.classList.add(cn)
            accordeons[idx].classList.add(cn)
            collapses[idx].classList.add(cn)
            if (collapses[idx].style.maxHeight) {
                collapses[idx].style.maxHeight = null;
            } else {
                collapses[idx].style.maxHeight = collapses[idx].scrollHeight + "px";
            }
        })
    });

    function clearAll(el) {
        el.forEach(item => {
            item.classList.remove(cn);
        })
    }
}

export default handleAccordeons;