const tabs = function () {
    var tablist = document.querySelectorAll('[role="tablist"]');
    var tabs;
    var panels;

    function generateArrays (tablist) {
        tabs = [...tablist.querySelectorAll('[role="tab"]')];
        panels = [...tablist.parentNode.querySelectorAll('[role="tabpanel"]')];
        
        return {'tabs': tabs, 'panels': panels}
    };

    [...tablist].map(item => {
        const inner = generateArrays(item);

        inner.tabs.map(tab => {
            tab.addEventListener('click', function() {
                const idx = tab.dataset.index;
                inner.tabs.map(tab => {
                    tab.classList.remove('is-active');
                })
                tab.classList.add('is-active');

                inner.panels.map(panel => {
                    
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    }
                    panel.classList.remove('is-active');

                    if (panel.dataset.index === idx) {
                        panel.classList.add('is-active');
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                })
            })
        })
    })
};

export default tabs;