const initSideMenu = function() {
    const menuBtn = document.querySelector('.js-side-menu');
    if (!menuBtn) return false;


    menuBtn.addEventListener('click', function() {
        const menuBlock = document.querySelector('.side-menu__list');

        if (!menuBlock.classList.contains('is-active')) {
            menuBlock.classList.add('is-active');
            menuBtn.classList.add('is-active');
        } else {
            menuBlock.classList.remove('is-active');
            menuBtn.classList.remove('is-active');
        }

    });

    document.body.addEventListener('click', function(e) {
        const menuBlock = document.querySelector('.side-menu__list');
        if (!e.target.closest('.js-side-menu') && !e.target.closest('.side-menu__list')) {
            menuBlock.classList.remove('is-active');
            menuBtn.classList.remove('is-active');
        }
    })
}

export default initSideMenu;