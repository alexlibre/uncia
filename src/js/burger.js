const enableBurger = function() {
    const burger = document.querySelector('.js-burger');
    const headerTop = document.querySelector('.header__top');

    if (!burger || !headerTop) return false;
    burger.addEventListener('click', function() {
        console.log('click');
        if (headerTop.classList.contains('is-visible')) {
            headerTop.classList.remove('is-visible');
            document.body.classList.remove('is-unscrolled');
        } else {
            headerTop.classList.add('is-visible')
            document.body.classList.add('is-unscrolled');
        }
    })

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.js-burger') && !e.target.closest('.header__top')) {
            headerTop.classList.remove('is-visible');
            // document.body.classList.remove('is-unscrolled');
        }
    })
}

export default enableBurger;