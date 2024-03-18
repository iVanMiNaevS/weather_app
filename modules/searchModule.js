import search from "../plugins/search.js";

const searchObj = search();
const input = document.querySelector("input");
const header__list = document.querySelector(".header__list");
searchObj.createList();

input.addEventListener("input", () => {
    searchObj.check(input.value);
});
input.addEventListener("focus", () => {
    header__list.classList.add("focus");
});

document.querySelector("body").addEventListener("click", (e) => {
    if (!e.target.closest(".header__list") && e.target !== input) {
        header__list.classList.remove("focus");
    }
});
