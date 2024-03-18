export default function search() {
    const headerList = document.querySelector(".header__list");
    const citis = [
        "Санкт-Петербург",
        "Москва",
        "Казань",
        "Калининград",
        "Архангельск",
        "Нижний Новгород",
        "Суздаль",
        "Псков",
        "Владимир",
        "Сочи",
        "Тула",
        "Йошкар-Ола",
        "Ярославль",
        "Смоленск",
        "Сергиев Посад",
        "Новосибирск",
        "Рязань",
        "Якутск",
        "Рузаевка",
        "Александро-Невский",
    ];
    return {
        createList() {
            citis.forEach((element) => {
                headerList.innerHTML += `<div class="block hide">${element}</div>`;
            });
        },
        check(unSrt) {
            const unSrtLc = String(unSrt).toLowerCase();
            const blocks = document.querySelectorAll(".block");
            if (unSrtLc != "") {
                blocks.forEach((e) => {
                    const elemText = e.innerText.toLowerCase();
                    if (elemText.indexOf(unSrtLc) != -1) {
                        e.classList.remove("hide");
                        e.classList.add("show");
                        e.innerHTML = markUnStr(
                            e.innerText,
                            elemText.indexOf(unSrtLc),
                            unSrt.length
                        );
                    } else {
                        e.classList.remove("show");
                        e.classList.add("hide");
                    }
                });
            } else {
                blocks.forEach((e) => {
                    e.classList.remove("show");
                    e.classList.add("hide");
                });
            }
        },
    };
}

function markUnStr(str, pos, len) {
    return (
        str.slice(0, pos) +
        '<mark class="mark">' +
        str.slice(pos, pos + len) +
        "</mark>" +
        str.slice(pos + len)
    );
}
