const gallery = function () {
    const thumbs = document.querySelector('.gallery__thumbs');
    const tops = document.querySelector('.gallery__top');

    if (thumbs === null || tops === null) return false;

    const galleryThumbs = new Swiper('.gallery__thumbs', {
        spaceBetween: 40,
        slidesPerView: 4,
        loop: false,
        freeMode: false,
        loopedSlides: 4, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    const galleryTop = new Swiper('.gallery__top', {
        speed: 900,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        watchOverflow: true,
        parallax: true,
        loopedSlides: 4, //looped slides should be the same
        thumbs: {
            swiper: galleryThumbs,
        },
    });

    document.querySelector('.gallery__top').addEventListener('mouseenter', e => {
        galleryTop.autoplay.stop();
    });
    document.querySelector('.gallery__top').addEventListener('mouseleave', e => {
        if (galleryTop.snapIndex > 1) galleryTop.autoplay.start();
    });
    document.querySelector('.gallery__thumbs').addEventListener('mouseenter', e => {
        galleryTop.autoplay.stop();
    });
    document.querySelector('.gallery__thumbs').addEventListener('mouseleave', e => {
        if (galleryTop.snapIndex > 1) galleryTop.autoplay.start();
    });
};

export default gallery;