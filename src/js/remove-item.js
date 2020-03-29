export default function(options) {
    const el = options.el || '.js-remove-item';
    Array.prototype.map.call(document.querySelectorAll(el), function(btn){
        btn.addEventListener('click', function(){
            const el = this.closest('div[class*="__item"]');
            const parentEl = el.parentNode;
            parentEl.removeChild(el);
            $(parentEl).hide().show(0);
        })
    });
}