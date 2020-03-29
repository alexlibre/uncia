const checkboxDropdowns = function () {
    const dropDowns = [...document.querySelectorAll('.js-checkbox-dropdown')];
    const checkboxClear = document.querySelector('.js-checkbox-dropdown-clear');

    if(!dropDowns.length) return false;

    if(checkboxClear) {
        checkboxClear.addEventListener('click', function () {
            dropDowns.map(drop => {
                const type = drop.dataset.type;
                const qty = drop.dataset.qty || 0;
                if (type === 'subcat') return false;
    
                const checkboxes = [...drop.querySelectorAll('input[type="checkbox"]')];
                const selected = drop.querySelector('.cat-filters__' + type + '-qty')
                let state = {
                    closed: true,
                    qty: +qty
                };
    
                checkboxes.map(item => {
                    clear(item);
                })
                drop.dataset.qty = 0;
    
                function clear(self) {
                    self.checked = false;
                }
    
                showState(selected, state);
    
                hydrateDrops(dropDowns);
            })
        })
    }
    

    function showState(selected, state) {
        if (!selected) return false;
        
        selected.innerText = state.qty
        if (state.qty > 0) {
            selected.classList.add('is-visible');
        } else {
            selected.classList.remove('is-visible');
        }
    }

    function hydrateDrops(dropDowns) {
        return dropDowns.map(drop => {
            const type = drop.dataset.type;
            const qty = drop.dataset.qty || 0;
            const checkboxes = [...drop.querySelectorAll('input[type="checkbox"]')];
            const selected = drop.querySelector('.cat-filters__' + type + '-qty')
            let state = {
                closed: true,
                qty: +qty
            };
    
            function getCheckResults(self) {
                if (self.checked === true) {
                    state.qty++;
                }
    
                showState(selected, state);
            }
    
            
    
            checkboxes.map((item) => {
                getCheckResults(item);
            })
        })
    }

    hydrateDrops(dropDowns);

    dropDowns.map(drop => {
        const type = drop.dataset.type;
        const qty = drop.dataset.qty || 0;
        const checkboxes = [...drop.querySelectorAll('input[type="checkbox"]')];
        const selected = drop.querySelector('.cat-filters__' + type + '-qty')


        let state = {
            closed: true,
            qty: +qty
        };

        function setCheck(self) {
                
            if (self.checked === true) {
                self.check = true;
                state.qty++;
            } else {

                self.check = false;
                if (state.qty > 0) state.qty--;
            }

            showState(selected, state);
            return state;
        }

        drop.addEventListener('click', function (e) {
            e.stopPropagation()

            if (e.target.closest('.cat-filters__' + type + '-row')) {
                state.closed = !state.closed;
                
                if (state.closed === false) {
                    dropDowns.map(drop => {
                        drop.classList.remove('is-active');
                    })
                    this.classList.add('is-active');
                } else {
                    this.classList.remove('is-active');
                }
            }
        });

        checkboxes.map((item) => {

            item.addEventListener('click', function () {
                setCheck(this);
            })
            return item;
        })
    })

    document.addEventListener('click', function () {
        dropDowns.map(drop => {
            drop.classList.remove('is-active');
        })
    })
}

export default checkboxDropdowns;