const initModal = function(options) {
    const id = options.id;
    const modal = $('.js-modal[data-id="' + id + '"]');
    const closeModalBtn = $('.js-modal-close[data-close-id="' + id + '"]');
    const modalInitBtn = $(options.initBtn);

    if(!modal.length || !modalInitBtn.length) return false;

    modalInitBtn.on('click', function(){    
        modal.fadeIn(300);
        modal.addClass('is-opened');
        $('body').addClass('is-unscrolled');
    });

    closeModalBtn.on('click', function(e) {
        if(modal.hasClass('is-opened')) {
            modal.fadeOut();
            modal.removeClass('is-opened');
            $('body').removeClass('is-unscrolled');
        } else {
            return false;
        }
    })

}

export default initModal;