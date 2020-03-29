const newSlider = function(options) {
    const el = options.el;
    if (!el) return false;

    const slider = document.querySelector(el);
    if (slider === null) return false;

    let swiperSlider;

    const breakVal = options.breakVal || 10000;

    const config = options.config;
    if (options.breakVal) config.parallax = false;

    const breakpoint = window.matchMedia('(max-width:' + breakVal + 'px)');
    const breakpointChecker = function(slider) {
        if (breakpoint.matches === false) {
            if (swiperSlider !== undefined) swiperSlider.destroy(true, true);
            return;
        } else if (breakpoint.matches === true) {
            return enableSwiper();
            slider.addEventListener('mouseenter', e => {
                swiperSlider.autoplay.stop();
            });
            slider.addEventListener('mouseleave', e => {
                swiperSlider.autoplay.start();
            });
        }
    };

    const enableSwiper = function() {
        swiperSlider = new Swiper(slider, options.config);
    }

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
}

export default newSlider;