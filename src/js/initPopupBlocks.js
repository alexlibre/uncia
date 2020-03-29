const initPopupBlocks = function() {

    const popupBtns = [...document.querySelectorAll('.js-popup-btn')];
    const popups = [...document.querySelectorAll('.js-popup')];
    if (!popups.length || !popupBtns.length) return false;

    popupBtns.map(popupBtn => {
        const id = popupBtn.dataset.id;

        const popup = popups.filter(popup => {
            return popup.dataset.id === id;
        })[0];

        popupBtn.addEventListener('click', function() {

            if (!popup.classList.contains('is-visible')) {
                popup.classList.add('is-visible');
                popupBtn.classList.add('is-active');
                document.body.classList.add('is-unscrolled');
            } else {
                popup.classList.remove('is-visible');
                popupBtn.classList.remove('is-active');
                document.body.classList.remove('is-unscrolled');
            }
        })
    })

    document.body.addEventListener('click', function(e) {
        if (!e.target.closest('.js-popup-btn') && !e.target.closest('.js-popup') && !e.target.closest('.js-modal')) {
            popupBtns.map(btn => {
                btn.classList.remove('is-active');
            })
            popups.map(popup => {
                popup.classList.remove('is-visible');
            })
            document.body.classList.remove('is-unscrolled');
        }
    })
}




export default initPopupBlocks;