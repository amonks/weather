var forecastIOKey = "0ea12a6cd58c887c14ebd67679e11701";
x = $('#demo');

function getForecast(forecastIOKey, position) {
	url = "https://api.forecast.io/forecast/" + forecastIOKey + "/" + position.latitude + "," + position.longitude;
    out = Bouncer.get(url);
    return out;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.text( getForecast(forecastIOKey, position.coords).response );
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}