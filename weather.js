var forecastIOKey = "0ea12a6cd58c887c14ebd67679e11701";
x = $('#demo');

function showCloudCover(weather) {
    x.text( weather.currently.cloudCover.to_s );
}

function getForecast(forecastIOKey, position) {
	url = "https://api.forecast.io/forecast/" + forecastIOKey + "/" + position.latitude + "," + position.longitude;
    out = Bouncer.get(url);
    console.log(url);
    return out;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getWeather(position) {
    out = getForecast(forecastIOKey, position.coords).response;
    weather = JSON.parse(out);
    showCloudCover(weather);
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