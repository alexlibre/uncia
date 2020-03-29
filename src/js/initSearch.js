const initSearch = function() {
    const catSearchBtn = $('.js-search-btn');
    const catSearch = $('.js-search');

    $('body').on('click', '.js-search-btn', function(e){
        catSearch.toggleClass('is-visible');
    });

    $('body').on('click', function(e) {
        if(!catSearch.hasClass('is-visible')) {
            return false;
        } else {
            if(e.target.closest('.js-search')) {
                return false
            } else {
                if(!e.target.closest('.js-search-btn')) {
                    catSearch.removeClass('is-visible')
                }
                return false;
            }
        }
    })
}

export default initSearch;