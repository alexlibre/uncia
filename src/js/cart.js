import numberWithSpaces from "./numberWithSpaces";

const cart = function() {
    const storage = window.localStorage;
    let items = JSON.parse(storage.getItem('cart')) || [];
    if (!items.length) storage.setItem('cart', JSON.stringify(items));

    const getCart = () => {
        [...document.querySelectorAll('.cart__item')].map(el => {
            const id = +el.dataset.id;
            const input = el.querySelector('input');
            const idx = items.map(el => el.id).indexOf(id);

            if (idx !== -1) {
                const good = items.map(item => {
                    if (item.id === id) {
                        input.value = item.qty;
                    }
                });
            } else {
                input.value = 0;
            }
            updatePrice(id)
        })
    };

    const addItem = (id) => {
        const idx = items.map(el => el.id).indexOf(id);

        if (idx === -1) {
            items.push({
                'id': id,
                'qty': document.querySelector('.cart__item[data-id="' + id + '"] input').value || 1
            });
        } else {
            items[idx].qty = document.querySelector('.cart__item[data-id="' + id + '"] input').value;
        }
        storage.setItem('cart', JSON.stringify(items));
        updatePrice(id)
    };

    const removeItem = (id) => {
        const idx = items.map(el => el.id).indexOf(id);

        if (idx !== -1) {
            items.splice(idx, 1);
            storage.setItem('cart', JSON.stringify(items));
            updatePrice(id);
        }
    };

    const updatePrice = (id) => {
        const idx = items.map(el => el.id).indexOf(id);
        const el = document.querySelector('.cart__item[data-id="' + id + '"]');

        if (idx !== -1) {
            el.querySelector('.cart-item__sum-value').innerText = numberWithSpaces(+el.querySelector('.cart-item__price').innerText.replace(/[^0-9]/g, '') * items[idx].qty);
        } else {
            el.querySelector('.cart-item__sum-value').innerText = '';
        }
    };

    const itemIncrease = (id) => {
        const idx = items.map(el => el.id).indexOf(id);
        if (idx === -1) return false;

        items[idx].qty++;
        document.querySelector('.cart__item[data-id="' + id + '"] input').value++;
        storage.setItem('cart', JSON.stringify(items));
        updatePrice(id)
    };

    const itemDecrease = (id) => {
        const idx = items.map(el => el.id).indexOf(id);
        if (idx === -1) return false;

        if (items[idx].qty > 0) {
            items[idx].qty--;
            document.querySelector('.cart__item[data-id="' + id + '"] input').value--;
        } else {
            removeItem(id);
        }
        storage.setItem('cart', JSON.stringify(items));
        updatePrice(id);
    }

    [...document.querySelectorAll('.cart__item input')].map(item => {
        item.addEventListener('change', () => {
            addItem(+item.closest('[data-id]').dataset.id);
        })
    });

    [...document.querySelectorAll('.js-add-to-cart')].map(item => {
        item.addEventListener('click', () => {
            addItem(+item.dataset.id);
            storage.setItem('cart', JSON.stringify(items));
        })
    });

    [...document.querySelectorAll('.js-del-cart-item')].map(item => {
        item.addEventListener('click', () => {
            removeItem(+item.dataset.delId);
            storage.setItem('cart', JSON.stringify(items));
        })
    });

    [...document.querySelectorAll('.js-cart-inc')].map(item => {
        item.addEventListener('click', () => {
            const id = +item.closest('[data-id]').dataset.id;
            itemIncrease(id);
        })
    });

    [...document.querySelectorAll('.js-cart-dec')].map(item => {
        item.addEventListener('click', () => {
            const id = +item.closest('[data-id]').dataset.id;
            itemDecrease(id);
        })
    });



    getCart();
};

export default cart;