let clientX = -100;
let clientY = -100;
const innerCursor = document.querySelector(".cursor--custom");
const innerCursorSignature = document.querySelector(".cursor__signature");

let actualFlavor = 'Uno';

// (function(window,undefined){
//     '$:nomunge';
//     var jq_throttle;
//
//     $.throttle = jq_throttle = function( delay, no_trailing, callback, debounce_mode ) {
//         var timeout_id,
//             last_exec = 0;
//
//         if ( typeof no_trailing !== 'boolean' ) {
//             debounce_mode = callback;
//             callback = no_trailing;
//             no_trailing = undefined;
//         }
//
//         function wrapper() {
//             var that = this,
//                 elapsed = +new Date() - last_exec,
//                 args = arguments;
//
//             function exec() {
//                 last_exec = +new Date();
//                 callback.apply( that, args );
//             }
//
//             function clear() {
//                 timeout_id = undefined;
//             }
//
//             if ( debounce_mode && !timeout_id ) {
//                 exec();
//             }
//
//
//             timeout_id && clearTimeout( timeout_id );
//             if ( debounce_mode === undefined && elapsed > delay ) {
//                 exec();
//             } else if ( no_trailing !== true ) {
//                 timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
//             }
//         }
//
//         if ( $.guid ) {
//             wrapper.guid = callback.guid = callback.guid || $.guid++;
//         }
//
//         return wrapper;
//     };
//
//     $.debounce = function( delay, at_begin, callback ) {
//         return callback === undefined
//             ? jq_throttle( delay, at_begin, false )
//             : jq_throttle( delay, callback, at_begin !== false );
//     };
//
// })(this);

const initCursor = (el) => {
    if (!el) return false;
    const flavors = document.querySelectorAll('.flavor__item');
    let fieldCoords = el.getBoundingClientRect();
    let isInside = false;

    let children = el.querySelectorAll('.flavors__item');

    document.addEventListener("mousemove", e => {
        if(!isInside) {
            innerCursor.style.display = 'none';
        } else {
            innerCursor.style.display = 'block';
        }
    });

    el.addEventListener("mousemove", e => {
        clientX = e.clientX;
        clientY = e.clientY;

        actualFlavor = e.target.dataset.flavor;
        let actualColor = e.target.dataset.color;
        // let flavorText = e.target.dataset.flavor;

        innerCursorSignature.innerHTML = actualFlavor;


        flavors.forEach(item => {
            item.classList.remove('is-visible');
            if(item.dataset.flavor === actualFlavor) {
                item.classList.add('is-visible');
                item.style.backgroundColor = actualColor;
            }
        })
    });

    el.addEventListener("mouseenter", e => {
        isInside = true;
    });

    el.addEventListener("mouseleave", e => {
        isInside = false;
    });

    const render = () => {
        innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
        requestAnimationFrame(render)
    };
    requestAnimationFrame(render)
    // requestAnimationFrame();
};

export default initCursor;