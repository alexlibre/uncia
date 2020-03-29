import { poly } from './polyfills';
import swiperSlider from './swiperSlider';
import gallery from './gallery';
// import initCursor from './customCursor';
import tabs from "./tabs";
import handleFavorites from "./handleFavorites";
import initCollapse from "./collapse";
import cart from "./cart";
import initModal from "./initModal";
import onHover from "./onHover";
import collapsible from './collapsible';
import removeItem from './remove-item';
import rating from './rating';
import maskedInputs from './maskedInputs';
import handleFileInputs from './fileInput';
import makeMap from './map';
import customSelects from './selects';
import checkboxDropdowns from './checkbox-dropdowns';
import handleAccordeons from './accordeon';
import makeStickyOnScroll from './sticky';
import drop from './drop';
import datepicker from './datepicker';
import initRadioBoxes from './radioBox';
import enableBurger from './burger';
import initSideMenu from './initSideMenu';
import initPopupBlocks from './initPopupBlocks';

Window.md = new MobileDetect(window.navigator.userAgent);

// const flvs = document.querySelector('.section--flavors');

const indexSliderLeft = () => swiperSlider({
    el: '.index-slider--left',
    config: {
        speed: 1000,
        effect: 'fade',
        loop: true,
        parallax: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.index-slider--left .swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    }
});

const indexSliderRight = () => swiperSlider({
    el: '.index-slider--right',
    config: {
        speed: 1000,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        parallax: true,
        pagination: {
            el: '.index-slider--right .swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    }
});

const actionSlider = () => swiperSlider({
    el: '.action-slider',
    config: {
        speed: 1000,
        loop: true,
        parallax: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 15,
        roundLengths: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.action__pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            769: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 40,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                },
            },
            321: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 15,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                },
            }
        }
    }
});

const catSliderFirst = () => swiperSlider({
    el: '.cat-slider--first',
    config: {
        speed: 2000,
        effect: 'fade',
        loop: true,
        spaceBetween: 100,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.catalog-slider__pagination',
            type: 'bullets',
            clickable: true
        }
    }
});

const catSliderSecond = () => swiperSlider({
    el: '.cat-slider--second',
    config: {
        speed: 2000,
        effect: 'fade',
        loop: true,
        spaceBetween: 100,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.catalog-slider__pagination',
            type: 'bullets',
            clickable: true
        }
    }
});

const teaCircleSlider = () => swiperSlider({
    el: '.tea-circle-slider',
    config: {
        speed: 1800,
        effect: 'slide',
        loop: true,
        parallax: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.tea-circle-slider__pagination',
            type: 'bullets',
            clickable: true
        },
        navigation: {
            nextEl: '.tea-circle-slider__next',
            prevEl: '.tea-circle-slider__prev',
        }
    }
});

const pageSlider = () => swiperSlider({
    el: '.page-slider',
    config: {
        speed: 2000,
        effect: 'slide',
        spaceBetween: 100,
        loop: true,
        parallax: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.page-slider__pagination',
            type: 'fraction',
            clickable: true
        },
        navigation: {
            nextEl: '.page-slider__next',
            prevEl: '.page-slider__prev',
        }
    }
});

const articleThemeSlider = () => swiperSlider({
    el: '.article-theme-slider',
    config: {
        speed: 2000,
        loop: true,
        parallax: true,
        spaceBetween: 1000,
        roundLengths: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.article-theme-slider__pagination',
            type: 'bullets',
            clickable: true
        }
    }
});

const degustationSlider = () => swiperSlider({
    el: '.degustation-slider',
    config: {
        speed: 1500,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        parallax: true,
        spaceBetween: 100,
        pagination: {
            el: '.degustation-slider__pagination',
            type: 'bullets',
            clickable: true
        }
    }
});

const keepSlider = () => swiperSlider({
    el: '.keep-slider',
    config: {
        speed: 1200,
        loop: true,
        spaceBetween: 100,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        parallax: true,
        pagination: false
    }
});

const catDegustationsSlider = () => swiperSlider({
    el: '.cat-deg-slider',
    config: {
        speed: 1200,
        loop: true,
        spaceBetween: 30,
        // height: '340px',
        slidesPerView: 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            type: 'bullets',
            clickable: true
        }
    },
    breakVal: 1024
})

const makeTeaMap = () => {
    if (!document.getElementById('tea-map')) return false;
    const teaMap = makeMap('tea-map', [111.22, 28.59], 6, 'mapbox://styles/mapbox/streets-v9');
    teaMap.scrollZoom.disable();
}

const initSliders = () => {
    indexSliderLeft();
    indexSliderRight();
    actionSlider();
    catSliderFirst();
    catSliderSecond();
    keepSlider();
    teaCircleSlider();
    pageSlider();
    articleThemeSlider();
    degustationSlider();
    gallery();
    catDegustationsSlider();
}

$('document').ready(function() {
    poly();
    // onHover();
    customSelects();
    initSliders();
    removeItem({
        el: '.js-remove-item'
    });

    makeStickyOnScroll();

    maskedInputs();
    checkboxDropdowns();
    handleAccordeons('.js-accordeon', 'is-active');


    makeTeaMap();

    makeMap('stores-map', [30.320077, 59.927819], 13, 'mapbox://styles/mapbox/light-v10', [{
            address: 'Владимирский проспект, 1/47',
            coordinates: [30.347590, 59.931948],
            id: 1
        },
        {
            address: 'Невский проспект, 63',
            coordinates: [30.352997, 59.931825],
            id: 2
        },
        {
            address: 'Средний проспект Васильевского острова, 19',
            coordinates: [30.282019, 59.944327],
            id: 3
        },
        {
            address: 'переулок Гривцова, 26',
            coordinates: [30.317109, 59.927222],
            id: 4
        },
        {
            address: 'улица Савушкина, 141',
            coordinates: [30.205324, 59.989913],
            id: 5
        },
    ]);
    makeMap('shop-map', [30.320077, 59.927819], 13, 'mapbox://styles/mapbox/light-v10', [{
        address: 'Владимирский проспект, 1/47',
        coordinates: [30.347590, 59.931948]
    }]);
    makeMap('cart-shops', [30.320077, 59.927819], 13, 'mapbox://styles/mapbox/light-v10', [{
            address: 'Владимирский проспект, 1/47',
            coordinates: [30.347590, 59.931948],
            id: 1
        },
        {
            address: 'Невский проспект, 63',
            coordinates: [30.352997, 59.931825],
            id: 2
        },
        {
            address: 'Средний проспект Васильевского острова, 19',
            coordinates: [30.282019, 59.944327],
            id: 3
        },
        {
            address: 'переулок Гривцова, 26',
            coordinates: [30.317109, 59.927222],
            id: 4
        },
        {
            address: 'улица Савушкина, 141',
            coordinates: [30.205324, 59.989913],
            id: 5
        },
    ]);
    makeMap('cart-self', [30.320077, 59.927819], 13, 'mapbox://styles/mapbox/light-v10', [{
            address: 'Владимирский проспект, 1/47',
            coordinates: [30.347590, 59.931948],
            id: 1
        },
        {
            address: 'Невский проспект, 63',
            coordinates: [30.352997, 59.931825],
            id: 2
        },
        {
            address: 'Средний проспект Васильевского острова, 19',
            coordinates: [30.282019, 59.944327],
            id: 3
        },
        {
            address: 'переулок Гривцова, 26',
            coordinates: [30.317109, 59.927222],
            id: 4
        },
        {
            address: 'улица Савушкина, 141',
            coordinates: [30.205324, 59.989913],
            id: 5
        },
    ]);


    // initCursor(flvs);


    initPopupBlocks();

    initModal({
        id: 'teatester',
        initBtn: '.js-edit-teatester'
    });

    initModal({
        id: 'password-recover',
        initBtn: '.js-password-recover-btn'
    });

    initModal({
        id: 'one-click-buy',
        initBtn: '.js-one-click-buy-btn'
    });

    initModal({
        id: 'subscribe',
        initBtn: '.js-subscribe-btn'
    });

    tabs();

    handleFavorites();

    initCollapse('cat-filters');
    initCollapse('lk-order');
    collapsible('.js-collapsible');
    rating();
    cart();
    handleFileInputs();

    $(".js-select").each(function() {
        $(this).select2({
            width: "100%",
            minimumResultsForSearch: -1,
            language: "ru"
        });
    });

    drop();

    datepicker('drop-date');
    datepicker('cal');
    datepicker('cart-cal');
    datepicker('cart-time', true);

    initRadioBoxes();

    $('.stickem-container').stickem({
        item: '.stickem',
        container: '.stickem-container',
        stickClass: 'stickit',
        endStickClass: 'stickit-end',
        offset: 0,
        onStick: null,
        onUnstick: null
    });

    enableBurger();
    initSideMenu();
})