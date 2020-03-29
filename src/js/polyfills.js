export const poly = function() {
    // проверяем поддержку метода matches()
    (function () {
        if (!Element.prototype.matches) {
            // определяем свойство
            Element.prototype.matches = Element.prototype.matchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector;
        }
    })();

    // проверяем поддержку метода closest()
    (function () {
        if (!Element.prototype.closest) {
            // реализуем
            Element.prototype.closest = function (css) {
                var node = this;
                while (node) {
                    if (node.matches(css)) return node;
                    else node = node.parentElement;
                }
                return null;
            };
        }
    })();
}

export const debounce = function (fn) {
	let timeout;
	return function () {
		const context = this;
		const args = arguments;

		if (timeout) {
			window.cancelAnimationFrame(timeout);
		}
		timeout = window.requestAnimationFrame(function () {
			fn.apply(context, args);
		});
	}
};
