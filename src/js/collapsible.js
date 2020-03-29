import { debounce } from './polyfills';

export default function (query) {
    [...document.querySelectorAll(query)].map(function (item) {
        const collapseMe = function(self) {
            self.classList.toggle("active");
            if (self.style.maxHeight) {
                self.style.maxHeight = null;
            } else {
                self.style.maxHeight = self.scrollHeight + "px";
            }
        }
        const debounced = debounce(collapseMe)

        item.addEventListener("click", function() {
            debounced(this);
        });
    });
} 