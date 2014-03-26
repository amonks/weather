Weather = {

    isLoaded: false,

    forecastIOKey: "0ea12a6cd58c887c14ebd67679e11701",

    get: function() {
        Weather.getLocation;
        return cloudCover;
    },

    showCloudCover: function(cloudCover) {
        x.text( cloudCover );
    },

    getForecast: function(position) {
    	url = "https://api.forecast.io/forecast/" + Weather.forecastIOKey + "/" + position.latitude + "," + position.longitude;
        console.log("fetching weather from " + url);
        out = Bouncer.get(url);
        Weather.isLoaded = true;
        return out;
    },

    getLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(doWeather, Weather.showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    },

    doWeather: function(position) {
        out = Weather.getForecast(position.coords).response;
        weather = JSON.parse(out);
        var cloudCover = weather.currently.cloudCover;
        console.log(cloudCover);
        Weather.showCloudCover(cloudCover);
    },

    showError: function(error) {
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
    },
}