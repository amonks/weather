Cloudy?
=======

`Cloudy?` is a super simple website that accurately reflects the current cloud cover in the visitor's location.

Sometimes I run out of daily [`forecast.io`](http://forecast.io) api calls and it stops working.

## How does it work?

`Cloudy?` works entirely on the client-side. It uses [html5 geolocation](http://diveintohtml5.info/geolocation.html) to find the gps coordinates of the visitor. It then requests cloud-cover data from [forecast.io](http://forecast.io) through a [proxy](http://b.ss.cx). 

It then makes a Canvas, divides it into a grid of 40px x 40px squares, and puts clouds in the correct percentage of those grid squares, based on the rl percentage cloud cover.