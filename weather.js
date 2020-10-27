const API_KEY = "3fe0f304dfc320eff81d28c4cf70eac4";
const COORDS = "coords";

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

    }
}

function init() {
    loadCoords();
}

init();