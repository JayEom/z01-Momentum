const info = document.querySelector(".weather-info");
    weather = info.querySelector("span");
    img = info.querySelector("img");

const API_KEY = "3fe0f304dfc320eff81d28c4cf70eac4";
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function (response) {
            return response.json();
        }).then(function (json) {
            const icon = json.weather[0].icon;
            const temperature = json.main.temp;
            const place = json.name;

            img.src = `https://openweathermap.org/img/wn/${icon}.png`;
            weather.innerText = `${temperature}℃ @ ${place}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log("Can't access Geo Location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);

    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init(); 
