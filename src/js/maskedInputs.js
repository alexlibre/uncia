export default () => {
    function shake(item) {
        setTimeout(function() {
            item.classList.remove('shake');
        }, 1000);
        item.classList.add('shake');
    }

    $('[type="email"]').mask("A", {
        translation: {
            "A": { pattern: /[\w@\-.+]/, recursive: true }
        },
        onInvalid(val, e) {
            shake(e.target);
        }
    });

    $('.js-phone-mask').mask('+7 (000) 000-00-00', {
        placeholder: "+7 (___) ___-__-__",
        onInvalid(val, e) {
            shake(e.target);
        }
    });

    $('.js-card-mask').mask('000 000 000 000', {
        placeholder: '123 456 789 000',
        onInvalid(val, e) {
            shake(e.target);
        }
    });
}