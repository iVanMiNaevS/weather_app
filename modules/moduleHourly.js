export async function hourlyBlock(apiObj, lat, lon) {
    const hourlyBlockDOM = document.querySelector(".hourly-block");
    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
        hourlyBlockDOM.scrollLeft -= delta * 60; // Multiplied by 40
        e.preventDefault();
    }
    if (hourlyBlockDOM.addEventListener) {
        // IE9, Chrome, Safari, Opera
        hourlyBlockDOM.addEventListener(
            "mousewheel",
            scrollHorizontally,
            false
        );
    }
    const timeInItems = document.querySelectorAll(".time");
    const tempInItems = document.querySelectorAll(".hourly-block__temp");
    const data = await apiObj.hourlyWeather(lat, lon);
    console.log(data);
    const times = hourlyWeatherTime(data["list"], timeInItems.length);
    const degreeses = hourlyWeatherDegrees(data["list"], timeInItems.length);
    // устновка времени
    for (let i = 0; i < timeInItems.length; i++) {
        timeInItems[i].innerText = times[i];
    }
    //установка температуры
    for (let i = 0; i < degreeses.length; i++) {
        tempInItems[i].innerText = degreeses[i] + "°C";
    }
    //установка картинки
    hourlyWeatherImg(data["list"]);
}

function hourlyWeatherTime(data, length) {
    let times = [];
    for (let i = 0; i < length; i++) {
        const cutTime = data[i]["dt_txt"]
            .split(" ")[1]
            .split(":")
            .splice(0, 2)
            .join(":");
        times.push(cutTime);
    }

    return times;
}

function hourlyWeatherDegrees(data, length) {
    let degreeses = [];
    for (let i = 0; i < length; i++) {
        degreeses.push(Math.round(data[i]["main"]["temp"]));
    }

    return degreeses;
}

function hourlyWeatherImg(data) {
    const imgSmiles = document.querySelectorAll(".hourly-block__icon");
    for (let i = 0; i < 7; i++) {
        const arr = imgSmiles[i].src.split("/");
        arr[3] = "img";
        if (data[i]["weather"][0]["main"] === "Rain") {
            arr[4] = "rainSmile.png";
            imgSmiles[i].src = arr.join("/");
        } else if (data[i]["weather"][0]["main"] === "Clouds") {
            arr[4] = "cloudsSmile.png";
            imgSmiles[i].src = arr.join("/");
        } else if (data[i]["weather"][0]["main"] === "Clear") {
            arr[4] = "sunSmile.png";
            imgSmiles[i].src = arr.join("/");
        }
    }
}
