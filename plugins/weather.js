export function api(apiKey) {
  return {
    async geoCoder(city) {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
      );
      const data = await response.json();

      const lat = data[0]["lat"];
      const lon = data[0]["lon"];

      return [lat, lon];
    },
    async getWeatherApi(lat, lon) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();
      return Math.round(data["main"]["temp"]);
    },
    async getFalloutApi(lat, lon) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();
      return data["weather"][0]["main"];
    },
    async hourlyWeather(lat, lon) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      return data;
    },
  };
}

export function styleFromFallout(fallout) {
  const imgSmile = document.querySelector(".smile");
  const arr = imgSmile.src.split("/");
  const body = document.querySelector("body");
  const main = document.querySelector("main");
  const items = document.querySelectorAll(".item");
  const footer = document.querySelector("footer");
  arr[3] = "img";
  if (fallout === "Rain") {
    body.style.animation = "rain 200s linear infinite";
    changeStyle(
      body,
      main,
      "rgba(133, 128, 128, 0.998)",
      "rgb(103, 95, 95)",
      "url(img/rainEffect.png)"
    );
    changeStyleFooter(footer, "#dfdada36", items, "rgba(151, 151, 151, 0.998)");
    arr[4] = "rainSmile.png";
    imgSmile.src = arr.join("/");
  } else if (fallout === "Clouds") {
    body.style.animation = "clouds 300s linear infinite";
    changeStyle(
      body,
      main,
      "rgba(63, 111, 208, 0.9)",
      "#6d99f2",
      "url(img/cloudsEffect2.png)"
    );
    changeStyleFooter(footer, "#dfdada75", items, "#316ee7");
    body.style.backgroundRepeat = "no repeat";
    body.style.backgroundSize = "cover";
    arr[4] = "cloudsSmile.png";
    imgSmile.src = arr.join("/");
  } else if (fallout === "Clear") {
    body.style.animation = "";
    changeStyle(
      body,
      main,
      "rgba(63, 111, 208, 0.5)",
      "#6d99f2",
      "url(img/sunEffect2.png)"
    );
    changeStyleFooter(footer, "#dfdada36", items, "rgba(31, 93, 218, 0.5)");
    body.style.backgroundPosition = "-600px -600px";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
    arr[4] = "sunSmile.png";
    imgSmile.src = arr.join("/");
  }
}

export function imgFromMetric(metric) {
  const tempImg = document.querySelector(".temp-img");
  const arr = tempImg.src.split("/");
  arr[3] = "img";
  if (metric >= 26) {
    arr[4] = "tempHot.png";
    tempImg.src = arr.join("/");
  } else if (metric < 26 && metric >= 15) {
    arr[4] = "tempNormal.png";
    tempImg.src = arr.join("/");
  } else if (metric < 15) {
    arr[4] = "tempCold.png";
    tempImg.src = arr.join("/");
  }
}

export function translate(words) {
  if (words === "Rain") {
    return "Дождь";
  }
  if (words === "Clouds") {
    return "Облачно";
  }
  if (words === "Clear") {
    return "Солнечно";
  }
}

function changeStyle(body, main, colorMain, colorBody, bgImg) {
  main.style.background = colorMain;
  body.style.background = colorBody;
  body.style.backgroundImage = bgImg;
}

function changeStyleFooter(footer, bgFooter, items, bgItem) {
  footer.style.background = bgFooter;
  items.forEach((element) => {
    element.style.background = bgItem;
  });
}
