const initCatalogMenu = function() {
    const catMenuBtn = $('.js-cat-menu-btn');
    const catMenu = $('.js-cat-menu');

    $('body').on('click', '.js-cat-menu-btn', function(e){
        catMenu.toggleClass('is-visible');
    });

    $('body').on('click', function(e) {
        if(!catMenu.hasClass('is-visible')) {
            return false;
        } else {
            if(e.target.closest('.js-cat-menu')) {
                return false
            } else {
                if(!e.target.closest('.js-cat-menu-btn')) {
                    catMenu.removeClass('is-visible')
                }
                return false;
            }
        }
    })
}

export default initCatalogMenu;