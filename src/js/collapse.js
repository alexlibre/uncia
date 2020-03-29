const initCollapse = (id) => {
    const collapseBtn = $('[data-collapse-btn="' + id + '"]');
    const collapse = $('[data-collapse="' + id + '"]');
    collapseBtn.on('click', function(e) {
        console.log('click');

        $(collapse).slideToggle(300);
        $(collapse).toggleClass('is-collapsed');
        $(collapseBtn).toggleClass('is-collapsed');
    })
}

export default initCollapse