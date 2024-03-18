import {
    api,
    imgFromMetric,
    styleFromFallout,
    translate,
} from "../plugins/weather.js";
import { keyApi } from "../index.js";
import { hourlyBlock } from "./moduleHourly.js";
const header__list = document.querySelector(".header__list");
const apiObj = api(keyApi);
const main = document.querySelector("main");
const footer = document.querySelector("footer");
let num = 0;
// установка и показ данных
header__list.addEventListener("click", async (e) => {
    // получение данных
    const city = checkTarget(e);
    const coordinate = await apiObj.geoCoder(city);
    const lat = coordinate[0];
    const lon = coordinate[1];
    const degrees = await apiObj.getWeatherApi(lat, lon);
    const fallout = await apiObj.getFalloutApi(lat, lon);
    // установка данных
    hourlyBlock(apiObj, lat, lon);
    nameCityDOM.innerText = city;
    metric.innerText = degrees + "°C";
    imgFromMetric(degrees);
    falloutDOM.innerText = translate(fallout);
    //анимация icon
    const icon = document.querySelector(".icon");
    const temp = document.querySelector(".temp");
    icon.style.animation = "";
    temp.style.animation = "";
    icon.style.animation = "iconRev 1.2s ease-in-out forwards ";
    temp.style.animation = "tempRev 1.2s ease-in-out ";
    if (num === 0) {
        // анимация окна
        setTimeout(() => {
            main.style.animation = "mainShow 1s forwards";
            main.style.transform = "translateX(calc(var(--indexfull) * 21.3))";
            styleFromFallout(fallout);
            setTimeout(() => {
                main.style.animation = "";
            }, 1100);
        }, 1300);
        //анимация футера
        setTimeout(() => {
            footer.style.animation = "footer 1.5s forwards ease-in-out";
            footer.style.transform = "translateX(calc(var(--indexfull) * -0))";
            setTimeout(() => {
                footer.style.animation = "";
            }, 1600);
        }, 1300);
    } else {
        // анимация окна
        main.style.animation = "mainShow 1s forwards";
        main.style.transform = "translateX(calc(var(--indexfull) * 21.3))";
        styleFromFallout(fallout);
        setTimeout(() => {
            main.style.animation = "";
        }, 1100);
        // анимация футера
        footer.style.animation = "footer 1.5s forwards ease-in-out";
        footer.style.transform = "translateX(calc(var(--indexfull) * -0))";
        setTimeout(() => {
            footer.style.animation = "";
        }, 1600);
    }
    num++;
});

// вспомогательные функции
const checkTarget = (e) => {
    if (e.target.closest(".block")) {
        if (!e.target.classList.contains("block")) {
            return e.target.parentElement.innerText;
        } else {
            return e.target.innerText;
        }
    }
};
const nameCityDOM = document.querySelector(".name-city");
const metric = document.querySelector(".metric");
const falloutDOM = document.querySelector(".fallout");
