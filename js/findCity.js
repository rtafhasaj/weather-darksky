/*
 * show the current position of the selected city
 * show city name from google API
 * based on latitude  & longitude get from DarkSky API weather forecast
 * display weather data on google map with infoBubble(prebuild library)*/

function showPosition1(lat, lon, city_name) {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == "historical.html") {
        $('#address').val(city_name);
        $("#datepicker").trigger("focus");
    } else {
        var city;
        $.ajax({
            url: "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon, // send latitude, longitude to google API to get city name
            dataType: "json",
            success: function (data) {
                city = data.results[0].address_components[2].long_name; // return city name based on coordinates
            }
        });

        var map = new google.maps.Map(document.getElementById('map'), { // center map based on coordinates
            center: {lat: parseFloat(lat), lng: parseFloat(lon)},
            zoom: 13
        });


        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        try {
            infoBubble.close(); // close infoBubble if it's opened
        } catch (e) {

        }

        var wind, loc;
        infoBubble = new InfoBubble({ // style infoBubble window
            map: map,
            position: new google.maps.LatLng(-35, 151),
            shadowStyle: 1,
            padding: 0,
            backgroundColor: '#323544',
            borderRadius: 4,
            arrowSize: 10,
            borderWidth: 1,
            borderColor: '#323544',
            disableAutoPan: true,
            hideCloseButton: true,
            arrowPosition: 30,
            backgroundClassName: 'phoney',
            arrowStyle: 2
        });


        $.ajax({
            url: "https://api.darksky.net/forecast/18a15c633fcb7af68dbcc2532c591476/" + lat + "," + lon, // based on coordinates get weather forecast from DarkSky
            dataType: "jsonp",
            success: function (data) {
                console.log(data);
                wind = Math.round((data.currently.windSpeed * 1.60934 * 1000) / 3600);

                infoBubble.open(map, marker); // open infoBubble in map automatically

                /*
                 * the content that will be display on infoBubble window
                 * the content has info starting from today to one week later weather forecast
                 */

                var content = '<div class="forecast-container">' +
                    '<div class="today forecast">' +
                    '<div class="forecast-header">' +
                    '<div class="day">' + week(0) + '</div>' +
                    '<div class="date">' + dd + " " + m + '</div>' +
                    '</div>' +
                    '<div class="forecast-content">' +
                    '<div class="location">' + city + '</div>' +
                    '<div class="degree">' +
                    '<div class="num">' + f_c(data.currently.temperature) + '<sup>o</sup>C</div>' +
                    '<div class="forecast-icon">' +
                    '<img id="partly-cloudy-day" src="' + icons(data.currently.icon) + '" width="90">' +
                    '</div>' +
                    '</div>' +
                    '<span><img src="icons/icon-umberella.png" alt="">' + data.currently.precipProbability * 100 + ' %</span>' +
                    '<span><img src="icons/icon-wind.png" alt="">' + wind + ' m/s</span>' +
                    '</div>' +
                    '</div>' +

                    '<div class="forecast">' +
                    '<div class="forecast-header">' +
                    '<div class="day">' + week(1) + '</div>' +
                    '</div> <!-- .forecast-header -->' +
                    '<div class="forecast-content">' +
                    '	<div class="forecast-icon">' +
                    '		<img src="' + icons(data.daily.data[1].icon) + '" alt="" width=48>' +
                    '	</div>' +
                    '	<div class="degree">' + f_c(data.daily.data[1].temperatureMax) + '<sup>o</sup>C</div>' +
                    '	<small>' + f_c(data.daily.data[1].temperatureMin) + '<sup>o</sup></small>' +
                    '</div>' +
                    '</div>' +
                    '<div class="forecast">' +
                    '<div class="forecast-header">' +
                    '	<div class="day">' + week(2) + '</div>' +
                    '</div> <!-- .forecast-header -->' +
                    '<div class="forecast-content">' +
                    '	<div class="forecast-icon">' +
                    '	<img src="' + icons(data.daily.data[2].icon) + '" alt="" width=48>' +
                    '</div>' +
                    '<div class="degree">' + f_c(data.daily.data[2].temperatureMax) + '<sup>o</sup>C</div>' +
                    '<small>' + f_c(data.daily.data[2].temperatureMin) + '<sup>o</sup></small>' +
                    '</div>' +
                    '</div>' +
                    '<div class="forecast">' +
                    '<div class="forecast-header">' +
                    '	<div class="day">' + week(3) + '</div>' +
                    '</div> <!-- .forecast-header -->' +
                    '<div class="forecast-content">' +
                    '	<div class="forecast-icon">' +
                    '		<img src="' + icons(data.daily.data[3].icon) + '" alt="" width=48>' +
                    '</div>' +
                    '<div class="degree">' + f_c(data.daily.data[3].temperatureMax) + '<sup>o</sup>C</div>' +
                    '<small>' + f_c(data.daily.data[3].temperatureMin) + '<sup>o</sup></small>' +
                    '</div>' +
                    '</div>' +
                    '<div class="forecast">' +
                    '<div class="forecast-header">' +
                    '	<div class="day">' + week(4) + '</div>' +
                    '</div> <!-- .forecast-header -->' +
                    '<div class="forecast-content">' +
                    '	<div class="forecast-icon">' +
                    '		<img src="' + icons(data.daily.data[4].icon) + '" alt="" width=48>' +
                    '	</div>' +
                    '	<div class="degree">' + f_c(data.daily.data[4].temperatureMax) + '<sup>o</sup>C</div>' +
                    '	<small>' + f_c(data.daily.data[4].temperatureMin) + '<sup>o</sup></small>' +
                    '</div>' +
                    '</div>' +
                    '<div class="forecast">' +
                    '<div class="forecast-header">' +
                    '	<div class="day">' + week(5) + '</div>' +
                    '</div> <!-- .forecast-header -->' +
                    '<div class="forecast-content">' +
                    '	<div class="forecast-icon">' +
                    '		<img src="' + icons(data.daily.data[5].icon) + '" alt="" width=48>' +
                    '	</div>' +
                    '	<div class="degree">' + f_c(data.daily.data[5].temperatureMax) + '<sup>o</sup>C</div>' +
                    '	<small>' + f_c(data.daily.data[5].temperatureMin) + '<sup>o</sup></small>' +
                    '</div>' +
                    '</div>' +
                    '<div class="forecast">' +
                    '	<div class="forecast-header">' +
                    '		<div class="day">' + week(6) + '</div>' +
                    '	</div> <!-- .forecast-header -->' +
                    '	<div class="forecast-content">' +
                    '		<div class="forecast-icon">' +
                    '		<img src="' + icons(data.daily.data[6].icon) + '" alt="" width=48>' +
                    '		</div>' +
                    '		<div class="degree">' + f_c(data.daily.data[6].temperatureMax) + '<sup>o</sup>C</div>' +
                    '		<small>' + f_c(data.daily.data[6].temperatureMin) + '<sup>o</sup></small>' +
                    '	</div>' +
                    '</div>' +
                    '</div>';
                infoBubble.addTab('', content); // append the content above to the infoBubble window
            }
        });

        marker.setVisible(false); // remove the actualy marker
        map.setCenter({lat: parseFloat(lat), lng: parseFloat(lon)});
        map.setZoom(17);  // Why 17? Because it looks good.
        map.panBy(210,-150);
        marker.setPosition({lat: parseFloat(lat), lng: parseFloat(lon)}); // give to the marker the position that will be pinned to google Map
        marker.setVisible(true); // display the new marker in the map
    }
}