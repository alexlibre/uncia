const rating = function () {
    const rating = document.querySelector('.rating');
    if(!rating) return false;

    let starParts = [...document.querySelectorAll("input[name='rating']")];
    let result = 0;

    starParts.forEach((item, idx) => {
        item.addEventListener("change", () => {
            let selectedIndex = idx;
            result = selectedIndex + 1;

            starParts.forEach((item, idx) => {
                if (idx <= selectedIndex) {
                    item.closest('.rating__star').classList.add("rating__star_active");
                } else {
                    item.closest('.rating__star').classList.remove("rating__star_active");
                }
            });
        });
    });

    return result;
}


export default rating;