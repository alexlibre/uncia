(function () {
    'use strict';

    var poly = function poly() {
      // проверяем поддержку метода matches()
      (function () {
        if (!Element.prototype.matches) {
          // определяем свойство
          Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
        }
      })(); // проверяем поддержку метода closest()


      (function () {
        if (!Element.prototype.closest) {
          // реализуем
          Element.prototype.closest = function (css) {
            var node = this;

            while (node) {
              if (node.matches(css)) return node;else node = node.parentElement;
            }

            return null;
          };
        }
      })();
    };
    var debounce = function debounce(fn) {
      var timeout;
      return function () {
        var context = this;
        var args = arguments;

        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(function () {
          fn.apply(context, args);
        });
      };
    };

    var newSlider = function newSlider(options) {
      var el = options.el;
      if (!el) return false;
      var slider = document.querySelector(el);
      if (slider === null) return false;
      var swiperSlider;
      var breakVal = options.breakVal || 10000;
      var config = options.config;
      if (options.breakVal) config.parallax = false;
      var breakpoint = window.matchMedia('(max-width:' + breakVal + 'px)');

      var breakpointChecker = function breakpointChecker(slider) {
        if (breakpoint.matches === false) {
          if (swiperSlider !== undefined) swiperSlider.destroy(true, true);
          return;
        } else if (breakpoint.matches === true) {
          return enableSwiper();
          slider.addEventListener('mouseenter', function (e) {
            swiperSlider.autoplay.stop();
          });
          slider.addEventListener('mouseleave', function (e) {
            swiperSlider.autoplay.start();
          });
        }
      };

      var enableSwiper = function enableSwiper() {
        swiperSlider = new Swiper(slider, options.config);
      };

      breakpoint.addListener(breakpointChecker);
      breakpointChecker();
    };

    var gallery = function gallery() {
      var thumbs = document.querySelector('.gallery__thumbs');
      var tops = document.querySelector('.gallery__top');
      if (thumbs === null || tops === null) return false;
      var galleryThumbs = new Swiper('.gallery__thumbs', {
        spaceBetween: 40,
        slidesPerView: 4,
        loop: false,
        freeMode: false,
        loopedSlides: 4,
        //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true
      });
      var galleryTop = new Swiper('.gallery__top', {
        speed: 900,
        spaceBetween: 10,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        watchOverflow: true,
        parallax: true,
        loopedSlides: 4,
        //looped slides should be the same
        thumbs: {
          swiper: galleryThumbs
        }
      });
      document.querySelector('.gallery__top').addEventListener('mouseenter', function (e) {
        galleryTop.autoplay.stop();
      });
      document.querySelector('.gallery__top').addEventListener('mouseleave', function (e) {
        if (galleryTop.snapIndex > 1) galleryTop.autoplay.start();
      });
      document.querySelector('.gallery__thumbs').addEventListener('mouseenter', function (e) {
        galleryTop.autoplay.stop();
      });
      document.querySelector('.gallery__thumbs').addEventListener('mouseleave', function (e) {
        if (galleryTop.snapIndex > 1) galleryTop.autoplay.start();
      });
    };

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      }
    }

    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    var tabs = function tabs() {
      var tablist = document.querySelectorAll('[role="tablist"]');
      var tabs;
      var panels;

      function generateArrays(tablist) {
        tabs = _toConsumableArray(tablist.querySelectorAll('[role="tab"]'));
        panels = _toConsumableArray(tablist.parentNode.querySelectorAll('[role="tabpanel"]'));
        return {
          'tabs': tabs,
          'panels': panels
        };
      }

      _toConsumableArray(tablist).map(function (item) {
        var inner = generateArrays(item);
        inner.tabs.map(function (tab) {
          tab.addEventListener('click', function () {
            var idx = tab.dataset.index;
            inner.tabs.map(function (tab) {
              tab.classList.remove('is-active');
            });
            tab.classList.add('is-active');
            inner.panels.map(function (panel) {
              if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
              }

              panel.classList.remove('is-active');

              if (panel.dataset.index === idx) {
                panel.classList.add('is-active');
                panel.style.maxHeight = panel.scrollHeight + "px";
              }
            });
          });
        });
      });
    };

    var handleFavorites = function handleFavorites() {
      var storage = window.localStorage;
      var favorites = JSON.parse(storage.getItem('favorites')) || [];

      var populateFavs = function populateFavs() {
        favorites.forEach(function (favorite) {
          $('[data-fav-id="' + favorite + '"]').addClass('is-favorite');
        });
      };

      populateFavs();
      $('[data-fav-id]').on('click', function (e) {
        var item = e.target.closest('.js-favorites-add'),
            id = e.target.closest('.js-favorites-add').dataset.favId,
            idx = favorites.indexOf(id);
        if (!id) return;

        if (idx === -1) {
          favorites.push(id);
          $('[data-fav-id="' + id + '"]').addClass('is-favorite');
        } else {
          favorites.splice(idx, 1);
          $('[data-fav-id="' + id + '"]').removeClass('is-favorite');
        }

        storage.setItem('favorites', JSON.stringify(favorites));
      });
    };

    var initCollapse = function initCollapse(id) {
      var collapseBtn = $('[data-collapse-btn="' + id + '"]');
      var collapse = $('[data-collapse="' + id + '"]');
      collapseBtn.on('click', function (e) {
        console.log('click');
        $(collapse).slideToggle(300);
        $(collapse).toggleClass('is-collapsed');
        $(collapseBtn).toggleClass('is-collapsed');
      });
    };

    var numberWithSpaces = function numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    var cart = function cart() {
      var storage = window.localStorage;
      var items = JSON.parse(storage.getItem('cart')) || [];
      if (!items.length) storage.setItem('cart', JSON.stringify(items));

      var getCart = function getCart() {
        _toConsumableArray(document.querySelectorAll('.cart__item')).map(function (el) {
          var id = +el.dataset.id;
          var input = el.querySelector('input');
          var idx = items.map(function (el) {
            return el.id;
          }).indexOf(id);

          if (idx !== -1) {
            var good = items.map(function (item) {
              if (item.id === id) {
                input.value = item.qty;
              }
            });
          } else {
            input.value = 0;
          }

          updatePrice(id);
        });
      };

      var addItem = function addItem(id) {
        var idx = items.map(function (el) {
          return el.id;
        }).indexOf(id);

        if (idx === -1) {
          items.push({
            'id': id,
            'qty': document.querySelector('.cart__item[data-id="' + id + '"] input').value || 1
          });
        } else {
          items[idx].qty = document.querySelector('.cart__item[data-id="' + id + '"] input').value;
        }

        storage.setItem('cart', JSON.stringify(items));
        updatePrice(id);
      };

      var removeItem = function removeItem(id) {
        var idx = items.map(function (el) {
          return el.id;
        }).indexOf(id);

        if (idx !== -1) {
          items.splice(idx, 1);
          storage.setItem('cart', JSON.stringify(items));
          updatePrice(id);
        }
      };

      var updatePrice = function updatePrice(id) {
        var idx = items.map(function (el) {
          return el.id;
        }).indexOf(id);
        var el = document.querySelector('.cart__item[data-id="' + id + '"]');

        if (idx !== -1) {
          el.querySelector('.cart-item__sum-value').innerText = numberWithSpaces(+el.querySelector('.cart-item__price').innerText.replace(/[^0-9]/g, '') * items[idx].qty);
        } else {
          el.querySelector('.cart-item__sum-value').innerText = '';
        }
      };

      var itemIncrease = function itemIncrease(id) {
        var idx = items.map(function (el) {
          return el.id;
        }).indexOf(id);
        if (idx === -1) return false;
        items[idx].qty++;
        document.querySelector('.cart__item[data-id="' + id + '"] input').value++;
        storage.setItem('cart', JSON.stringify(items));
        updatePrice(id);
      };

      var itemDecrease = function itemDecrease(id) {
        var idx = items.map(function (el) {
          return el.id;
        }).indexOf(id);
        if (idx === -1) return false;

        if (items[idx].qty > 0) {
          items[idx].qty--;
          document.querySelector('.cart__item[data-id="' + id + '"] input').value--;
        } else {
          removeItem(id);
        }

        storage.setItem('cart', JSON.stringify(items));
        updatePrice(id);
      };

      _toConsumableArray(document.querySelectorAll('.cart__item input')).map(function (item) {
        item.addEventListener('change', function () {
          addItem(+item.closest('[data-id]').dataset.id);
        });
      });

      _toConsumableArray(document.querySelectorAll('.js-add-to-cart')).map(function (item) {
        item.addEventListener('click', function () {
          addItem(+item.dataset.id);
          storage.setItem('cart', JSON.stringify(items));
        });
      });

      _toConsumableArray(document.querySelectorAll('.js-del-cart-item')).map(function (item) {
        item.addEventListener('click', function () {
          removeItem(+item.dataset.delId);
          storage.setItem('cart', JSON.stringify(items));
        });
      });

      _toConsumableArray(document.querySelectorAll('.js-cart-inc')).map(function (item) {
        item.addEventListener('click', function () {
          var id = +item.closest('[data-id]').dataset.id;
          itemIncrease(id);
        });
      });

      _toConsumableArray(document.querySelectorAll('.js-cart-dec')).map(function (item) {
        item.addEventListener('click', function () {
          var id = +item.closest('[data-id]').dataset.id;
          itemDecrease(id);
        });
      });

      getCart();
    };

    var initModal = function initModal(options) {
      var id = options.id;
      var modal = $('.js-modal[data-id="' + id + '"]');
      var closeModalBtn = $('.js-modal-close[data-close-id="' + id + '"]');
      var modalInitBtn = $(options.initBtn);
      if (!modal.length || !modalInitBtn.length) return false;
      modalInitBtn.on('click', function () {
        modal.fadeIn(300);
        modal.addClass('is-opened');
        $('body').addClass('is-unscrolled');
      });
      closeModalBtn.on('click', function (e) {
        if (modal.hasClass('is-opened')) {
          modal.fadeOut();
          modal.removeClass('is-opened');
          $('body').removeClass('is-unscrolled');
        } else {
          return false;
        }
      });
    };

    function collapsible (query) {
      _toConsumableArray(document.querySelectorAll(query)).map(function (item) {
        var collapseMe = function collapseMe(self) {
          self.classList.toggle("active");

          if (self.style.maxHeight) {
            self.style.maxHeight = null;
          } else {
            self.style.maxHeight = self.scrollHeight + "px";
          }
        };

        var debounced = debounce(collapseMe);
        item.addEventListener("click", function () {
          debounced(this);
        });
      });
    }

    function removeItem (options) {
      var el = options.el || '.js-remove-item';
      Array.prototype.map.call(document.querySelectorAll(el), function (btn) {
        btn.addEventListener('click', function () {
          var el = this.closest('div[class*="__item"]');
          var parentEl = el.parentNode;
          parentEl.removeChild(el);
          $(parentEl).hide().show(0);
        });
      });
    }

    var rating = function rating() {
      var rating = document.querySelector('.rating');
      if (!rating) return false;

      var starParts = _toConsumableArray(document.querySelectorAll("input[name='rating']"));

      var result = 0;
      starParts.forEach(function (item, idx) {
        item.addEventListener("change", function () {
          var selectedIndex = idx;
          result = selectedIndex + 1;
          starParts.forEach(function (item, idx) {
            if (idx <= selectedIndex) {
              item.closest('.rating__star').classList.add("rating__star_active");
            } else {
              item.closest('.rating__star').classList.remove("rating__star_active");
            }
          });
        });
      });
      return result;
    };

    var maskedInputs = (function () {
      function shake(item) {
        setTimeout(function () {
          item.classList.remove('shake');
        }, 1000);
        item.classList.add('shake');
      }

      $('[type="email"]').mask("A", {
        translation: {
          "A": {
            pattern: /[\w@\-.+]/,
            recursive: true
          }
        },
        onInvalid: function onInvalid(val, e) {
          shake(e.target);
        }
      });
      $('.js-phone-mask').mask('+7 (000) 000-00-00', {
        placeholder: "+7 (___) ___-__-__",
        onInvalid: function onInvalid(val, e) {
          shake(e.target);
        }
      });
      $('.js-card-mask').mask('000 000 000 000', {
        placeholder: '123 456 789 000',
        onInvalid: function onInvalid(val, e) {
          shake(e.target);
        }
      });
    });

    var handleFileInputs = function handleFileInputs() {
      var inputs = document.querySelectorAll('.input-file');
      Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling;
        var labelVal = label.innerHTML;
        input.addEventListener('change', function (e) {
          var fileName = '';
          fileName = e.target.value.split('\\').pop();

          if (fileName) {
            label.innerHTML = fileName;
          } else {
            label.innerHTML = labelVal;
          }

          readURL(input, '.js-file-output');
        });
      });
    };

    function readURL(input, pic) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        console.log(pic);

        reader.onload = function (e) {
          document.querySelector(pic).setAttribute('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    }

    var makeMap = function makeMap(el, coords, zoom, style, marks) {
      if (!document.getElementById(el)) return false;
      mapboxgl.accessToken = 'pk.eyJ1IjoicmVsaXR3ZWIiLCJhIjoiY2pvazA2NGt0MGEwNTNybW1weWoxNnBkMSJ9.zsDQd4Hakn1pW3OqlOWKhQ';
      var map = new mapboxgl.Map({
        container: el,
        style: style,
        center: coords,
        zoom: zoom
      });

      if (marks && marks.length) {
        console.log(marks);
        var markers = {
          type: 'FeatureCollection',
          features: marks.map(function (item) {
            return {
              type: 'Feature',
              properties: {
                id: item.id
              },
              geometry: {
                type: "Point",
                coordinates: item.coordinates
              }
            };
          })
        };
        map.loadImage("../images/static/map-marker.png", function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          map.addLayer({
            id: "markers",
            type: "symbol",
            source: {
              type: "geojson",
              data: markers
            },
            layout: {
              "icon-image": "custom-marker",
              "icon-anchor": "bottom"
            }
          });
        });

        if (marks.length > 1) {
          var bounds = new mapboxgl.LngLatBounds();
          markers.features.forEach(function (feature) {
            bounds.extend(feature.geometry.coordinates);
          });
          map.fitBounds(bounds, {
            padding: 40
          });
          map.on('click', 'markers', function (e) {
            map.flyTo({
              center: e.features[0].geometry.coordinates,
              speed: 0.6,
              zoom: 14
            });
            document.querySelector('.store[data-id="' + e.features[0].properties.id + '"]').click();
          });
          map.on('mouseenter', 'markers', function () {
            map.getCanvas().style.cursor = 'pointer';
          });
          map.on('mouseleave', 'markers', function () {
            map.getCanvas().style.cursor = '';
          });
        } else {
          map.setCenter(markers.features[0].geometry.coordinates);
          map.setZoom(14);
        }
      }

      window.userMap = map;
      return map;
    };

    var checkboxDropdowns = function checkboxDropdowns() {
      var dropDowns = _toConsumableArray(document.querySelectorAll('.js-checkbox-dropdown'));

      var checkboxClear = document.querySelector('.js-checkbox-dropdown-clear');
      if (!dropDowns.length) return false;

      if (checkboxClear) {
        checkboxClear.addEventListener('click', function () {
          dropDowns.map(function (drop) {
            var type = drop.dataset.type;
            var qty = drop.dataset.qty || 0;
            if (type === 'subcat') return false;

            var checkboxes = _toConsumableArray(drop.querySelectorAll('input[type="checkbox"]'));

            var selected = drop.querySelector('.cat-filters__' + type + '-qty');
            var state = {
              closed: true,
              qty: +qty
            };
            checkboxes.map(function (item) {
              clear(item);
            });
            drop.dataset.qty = 0;

            function clear(self) {
              self.checked = false;
            }

            showState(selected, state);
            hydrateDrops(dropDowns);
          });
        });
      }

      function showState(selected, state) {
        if (!selected) return false;
        selected.innerText = state.qty;

        if (state.qty > 0) {
          selected.classList.add('is-visible');
        } else {
          selected.classList.remove('is-visible');
        }
      }

      function hydrateDrops(dropDowns) {
        return dropDowns.map(function (drop) {
          var type = drop.dataset.type;
          var qty = drop.dataset.qty || 0;

          var checkboxes = _toConsumableArray(drop.querySelectorAll('input[type="checkbox"]'));

          var selected = drop.querySelector('.cat-filters__' + type + '-qty');
          var state = {
            closed: true,
            qty: +qty
          };

          function getCheckResults(self) {
            if (self.checked === true) {
              state.qty++;
            }

            showState(selected, state);
          }

          checkboxes.map(function (item) {
            getCheckResults(item);
          });
        });
      }

      hydrateDrops(dropDowns);
      dropDowns.map(function (drop) {
        var type = drop.dataset.type;
        var qty = drop.dataset.qty || 0;

        var checkboxes = _toConsumableArray(drop.querySelectorAll('input[type="checkbox"]'));

        var selected = drop.querySelector('.cat-filters__' + type + '-qty');
        var state = {
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
          e.stopPropagation();

          if (e.target.closest('.cat-filters__' + type + '-row')) {
            state.closed = !state.closed;

            if (state.closed === false) {
              dropDowns.map(function (drop) {
                drop.classList.remove('is-active');
              });
              this.classList.add('is-active');
            } else {
              this.classList.remove('is-active');
            }
          }
        });
        checkboxes.map(function (item) {
          item.addEventListener('click', function () {
            setCheck(this);
          });
          return item;
        });
      });
      document.addEventListener('click', function () {
        dropDowns.map(function (drop) {
          drop.classList.remove('is-active');
        });
      });
    };

    var handleAccordeons = function handleAccordeons(selector, cn) {
      if (!selector) return false;

      var accordeons = _toConsumableArray(document.querySelectorAll('.js-accordeon'));

      var containers = _toConsumableArray(document.querySelectorAll('.js-accordeon-add'));
      var uncollapsed = document.querySelector('.js-accordeon-collapse.is-active');
      if (uncollapsed) uncollapsed.style.maxHeight = uncollapsed.scrollHeight + "px";
      containers.forEach(function (container, idx) {
        container.addEventListener('click', function (e) {
          var collapses = _toConsumableArray(document.querySelectorAll('.js-accordeon-collapse'));

          clearAll(accordeons);
          clearAll(containers);
          clearAll(collapses);
          collapses.forEach(function (item) {
            item.style.maxHeight = null;
          });
          container.classList.add(cn);
          accordeons[idx].classList.add(cn);
          collapses[idx].classList.add(cn);

          if (collapses[idx].style.maxHeight) {
            collapses[idx].style.maxHeight = null;
          } else {
            collapses[idx].style.maxHeight = collapses[idx].scrollHeight + "px";
          }
        });
      });

      function clearAll(el) {
        el.forEach(function (item) {
          item.classList.remove(cn);
        });
      }
    };

    function drop() {
      var drops = _toConsumableArray(document.querySelectorAll('.js-drop'));

      if (!drops.length) return false;

      var change = function change(act) {
        for (var _len = arguments.length, els = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          els[_key - 1] = arguments[_key];
        }

        [].concat(els).map(function (el) {
          return el.classList[act ? 'add' : 'remove']('is-active');
        });
      };

      drops.map(function (drop) {
        var btn = drop.querySelector('.drop__btn');
        btn.addEventListener('click', function (e) {
          var _this = this;

          var target = e.target.closest('.drop__btn') === this ? true : false;
          var isActive = this.classList.contains('is-active');
          drops.map(function (drop) {
            var btn = drop.querySelector('.drop__btn');
            var content = drop.querySelector('.drop__content');
            change(btn === _this ? target : !target, drop, btn, content);
          });

          if (isActive) {
            var content = drop.querySelector('.drop__content');
            change(false, drop, btn, content);

            if (content.style.maxHeight) {
              content.style.maxHeight = null;
            } else {
              content.style.maxHeight = content.scrollHeight + "px";
            }
          }
        });
      });
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.js-drop')) {
          drops.map(function (drop) {
            var active = drop.classList.contains('is-active');
            if (!active) return false;
            var btn = drop.querySelector('.drop__btn');
            var content = drop.querySelector('.drop__content');

            if (active) {
              change(false, drop, btn, content);
            }
          });
        }
      });
    }

    var datepicker = function datepicker(id) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!document.getElementById(id)) return false;
      var nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      console.log(nextDay);
      var dp = $('#' + id).datepicker({
        language: 'ru',
        minDate: nextDay,
        dateFormat: 'd M yyyy',
        timepicker: time,
        onlyTimepicker: time,
        minHours: 0,
        maxHours: 21,
        position: 'bottom right',
        autoclose: true
      });
    };

    var initRadioBoxes = function initRadioBoxes() {
      var radioBoxes = _toConsumableArray(document.querySelectorAll('.js-radio-box'));

      if (!radioBoxes.length) return false;
      radioBoxes.map(function (box) {
        var input = box.querySelector('input');
        var nameSpace = input.dataset.name;

        var entries = _toConsumableArray(document.querySelectorAll('input[data-name="' + nameSpace + '"]'));

        var switchSelects = function switchSelects(e) {
          entries.map(function (entry) {
            entry.checked = false;
          });
          this.checked = true;
        };

        input.addEventListener('change', switchSelects);
      });
    };

    var enableBurger = function enableBurger() {
      var burger = document.querySelector('.js-burger');
      var headerTop = document.querySelector('.header__top');
      if (!burger || !headerTop) return false;
      burger.addEventListener('click', function () {
        console.log('click');

        if (headerTop.classList.contains('is-visible')) {
          headerTop.classList.remove('is-visible');
          document.body.classList.remove('is-unscrolled');
        } else {
          headerTop.classList.add('is-visible');
          document.body.classList.add('is-unscrolled');
        }
      });
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.js-burger') && !e.target.closest('.header__top')) {
          headerTop.classList.remove('is-visible'); // document.body.classList.remove('is-unscrolled');
        }
      });
    };

    var initSideMenu = function initSideMenu() {
      var menuBtn = document.querySelector('.js-side-menu');
      if (!menuBtn) return false;
      menuBtn.addEventListener('click', function () {
        var menuBlock = document.querySelector('.side-menu__list');

        if (!menuBlock.classList.contains('is-active')) {
          menuBlock.classList.add('is-active');
          menuBtn.classList.add('is-active');
        } else {
          menuBlock.classList.remove('is-active');
          menuBtn.classList.remove('is-active');
        }
      });
      document.body.addEventListener('click', function (e) {
        var menuBlock = document.querySelector('.side-menu__list');

        if (!e.target.closest('.js-side-menu') && !e.target.closest('.side-menu__list')) {
          menuBlock.classList.remove('is-active');
          menuBtn.classList.remove('is-active');
        }
      });
    };

    var initPopupBlocks = function initPopupBlocks() {
      var popupBtns = _toConsumableArray(document.querySelectorAll('.js-popup-btn'));

      var popups = _toConsumableArray(document.querySelectorAll('.js-popup'));

      if (!popups.length || !popupBtns.length) return false;
      popupBtns.map(function (popupBtn) {
        var id = popupBtn.dataset.id;
        var popup = popups.filter(function (popup) {
          return popup.dataset.id === id;
        })[0];
        popupBtn.addEventListener('click', function () {
          if (!popup.classList.contains('is-visible')) {
            popup.classList.add('is-visible');
            popupBtn.classList.add('is-active');
            document.body.classList.add('is-unscrolled');
          } else {
            popup.classList.remove('is-visible');
            popupBtn.classList.remove('is-active');
            document.body.classList.remove('is-unscrolled');
          }
        });
      });
      document.body.addEventListener('click', function (e) {
        if (!e.target.closest('.js-popup-btn') && !e.target.closest('.js-popup') && !e.target.closest('.js-modal')) {
          popupBtns.map(function (btn) {
            btn.classList.remove('is-active');
          });
          popups.map(function (popup) {
            popup.classList.remove('is-visible');
          });
          document.body.classList.remove('is-unscrolled');
        }
      });
    };

    Window.md = new MobileDetect(window.navigator.userAgent); // const flvs = document.querySelector('.section--flavors');

    var indexSliderLeft = function indexSliderLeft() {
      return newSlider({
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
    };

    var indexSliderRight = function indexSliderRight() {
      return newSlider({
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
    };

    var actionSlider = function actionSlider() {
      return newSlider({
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
              }
            },
            321: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 15,
              autoplay: {
                delay: 4000,
                disableOnInteraction: false
              }
            }
          }
        }
      });
    };

    var catSliderFirst = function catSliderFirst() {
      return newSlider({
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
    };

    var catSliderSecond = function catSliderSecond() {
      return newSlider({
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
    };

    var teaCircleSlider = function teaCircleSlider() {
      return newSlider({
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
            prevEl: '.tea-circle-slider__prev'
          }
        }
      });
    };

    var pageSlider = function pageSlider() {
      return newSlider({
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
            prevEl: '.page-slider__prev'
          }
        }
      });
    };

    var articleThemeSlider = function articleThemeSlider() {
      return newSlider({
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
    };

    var degustationSlider = function degustationSlider() {
      return newSlider({
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
    };

    var keepSlider = function keepSlider() {
      return newSlider({
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
    };

    var catDegustationsSlider = function catDegustationsSlider() {
      return newSlider({
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
      });
    };

    var makeTeaMap = function makeTeaMap() {
      if (!document.getElementById('tea-map')) return false;
      var teaMap = makeMap('tea-map', [111.22, 28.59], 6, 'mapbox://styles/mapbox/streets-v9');
      teaMap.scrollZoom.disable();
    };

    var initSliders = function initSliders() {
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
    };

    $('document').ready(function () {
      poly(); // onHover();
      initSliders();
      removeItem({
        el: '.js-remove-item'
      });
      maskedInputs();
      checkboxDropdowns();
      handleAccordeons('.js-accordeon', 'is-active');
      makeTeaMap();
      makeMap('stores-map', [30.320077, 59.927819], 13, 'mapbox://styles/mapbox/light-v10', [{
        address: 'Владимирский проспект, 1/47',
        coordinates: [30.347590, 59.931948],
        id: 1
      }, {
        address: 'Невский проспект, 63',
        coordinates: [30.352997, 59.931825],
        id: 2
      }, {
        address: 'Средний проспект Васильевского острова, 19',
        coordinates: [30.282019, 59.944327],
        id: 3
      }, {
        address: 'переулок Гривцова, 26',
        coordinates: [30.317109, 59.927222],
        id: 4
      }, {
        address: 'улица Савушкина, 141',
        coordinates: [30.205324, 59.989913],
        id: 5
      }]);
      makeMap('shop-map', [30.320077, 59.927819], 13, 'mapbox://styles/mapbox/light-v10', [{
        address: 'Владимирский проспект, 1/47',
        coordinates: [30.347590, 59.931948]
      }]);
      makeMap('cart-shops', [30.320077, 59.927819], 13, 'mapbox://styles/mapbox/light-v10', [{
        address: 'Владимирский проспект, 1/47',
        coordinates: [30.347590, 59.931948],
        id: 1
      }, {
        address: 'Невский проспект, 63',
        coordinates: [30.352997, 59.931825],
        id: 2
      }, {
        address: 'Средний проспект Васильевского острова, 19',
        coordinates: [30.282019, 59.944327],
        id: 3
      }, {
        address: 'переулок Гривцова, 26',
        coordinates: [30.317109, 59.927222],
        id: 4
      }, {
        address: 'улица Савушкина, 141',
        coordinates: [30.205324, 59.989913],
        id: 5
      }]);
      makeMap('cart-self', [30.320077, 59.927819], 13, 'mapbox://styles/mapbox/light-v10', [{
        address: 'Владимирский проспект, 1/47',
        coordinates: [30.347590, 59.931948],
        id: 1
      }, {
        address: 'Невский проспект, 63',
        coordinates: [30.352997, 59.931825],
        id: 2
      }, {
        address: 'Средний проспект Васильевского острова, 19',
        coordinates: [30.282019, 59.944327],
        id: 3
      }, {
        address: 'переулок Гривцова, 26',
        coordinates: [30.317109, 59.927222],
        id: 4
      }, {
        address: 'улица Савушкина, 141',
        coordinates: [30.205324, 59.989913],
        id: 5
      }]); // initCursor(flvs);

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
      $(".js-select").each(function () {
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
    });

}());
