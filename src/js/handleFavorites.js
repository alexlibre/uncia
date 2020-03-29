const handleFavorites = () => {
    const storage = window.localStorage;
    let favorites = JSON.parse(storage.getItem('favorites')) || [];

    const populateFavs = () => {
        favorites.forEach(function(favorite) {
            $('[data-fav-id="' + favorite +'"]').addClass('is-favorite');
        });
    };
    populateFavs();

    $('[data-fav-id]').on('click', e => {
        let item = e.target.closest('.js-favorites-add'),
            id = e.target.closest('.js-favorites-add').dataset.favId,
            idx = favorites.indexOf(id);

        if (!id) return;
        if (idx === -1) {
            favorites.push(id);
            $('[data-fav-id="' + id +'"]').addClass('is-favorite');
        } else {
            favorites.splice(idx, 1);
            $('[data-fav-id="' + id +'"]').removeClass('is-favorite');
        }
        storage.setItem('favorites', JSON.stringify(favorites));
    })
};

export default handleFavorites;