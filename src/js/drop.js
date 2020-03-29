export default function drop() {
    const drops = [...document.querySelectorAll('.js-drop')];
    if (!drops.length) return false;

    const change = function(act, ...els) {
        [...els].map(el => el.classList[act ? 'add' : 'remove']('is-active'));
    }

    drops.map(drop => {
        const btn = drop.querySelector('.drop__btn');

        btn.addEventListener('click', function(e) {
            const target = e.target.closest('.drop__btn') === this ? true : false;
            const isActive = this.classList.contains('is-active');
            drops.map((drop) => {
                const btn = drop.querySelector('.drop__btn');
                const content = drop.querySelector('.drop__content');
                change(btn === this ? target : !target, drop, btn, content);
            })

            if (isActive) {
                const content = drop.querySelector('.drop__content');
                change(false, drop, btn, content);
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });
    })

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.js-drop')) {
            drops.map(drop => {
                let active = drop.classList.contains('is-active');
                if (!active) return false;
                const btn = drop.querySelector('.drop__btn');
                const content = drop.querySelector('.drop__content');
                if (active) {
                    change(false, drop, btn, content);
                }
            })
        }
    })
}