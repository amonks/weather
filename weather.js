var x = $("#console");

Weather = {

    grid: 40,

    forecastIOKey: "0ea12a6cd58c887c14ebd67679e11701",

    get: function() {
        Weather.getLocation();
    },

    getForecast: function(position) {
    	url = "https://api.forecast.io/forecast/" + Weather.forecastIOKey + "/" + position.latitude + "," + position.longitude;
        console.log("fetching weather from " + url);
        out = Bouncer.get(url);
        return out;
    },

    getLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(Weather.doWeather, Weather.showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    },

    doWeather: function(position) {
        out = Weather.getForecast(position.coords).response;
        weather = JSON.parse(out);
        Weather.makeClouds(weather.currently.cloudCover);
        return weather.currently.cloudCover;
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

    makeClouds: function(cloudCover)  {
        var canvas = document.getElementById("canvas");
        canvas.width = document.body.clientWidth; //document.width is obsolete
        canvas.height = document.body.clientHeight; //document.height is obsolete
        canvasX = canvas.width;
        canvasY = canvas.height;

        var context = canvas.getContext('2d');

        var imageObj = new Image();

        imageObj.onload = function() {

            for (var xI = canvasX - 1; xI >= 0; xI--) {
                if (xI % Weather.grid === 0) {
                    for (var yI = canvasY - 1; yI >= 0; yI--) {
                        if (yI % Weather.grid === 0) {
                            if (Math.random() <= cloudCover) {
                                context.drawImage(imageObj, xI, yI);
                            };
                        };
                    };
                };
            };
        };
        imageObj.src = 'cloud.png';
    },

};