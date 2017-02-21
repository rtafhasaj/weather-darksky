var lat1, lon1;
$(document).ready(function () {
    function setHeight() {
        var windowHeight = $(window).innerHeight();
        $('#sidebar').css('height', windowHeight); // get window height to resize side menu
    }

    setHeight();

    $(window).resize(function () {
        setHeight();
    });

    $("#sidebar-toggle").click(function () {  // open and close side menu by toggle open-sidebar class
        var toggle_el = $(this).data("toggle");
        $(toggle_el).toggleClass("open-sidebar");
    });


    $("#saved_location").click(function () {  // open or close dropdown menu of saved cities
        var trigger = $("#saved");
        if (trigger.hasClass("expanded")) { // if class expanded exist, it means that the dropdown menu is open and we need to close it
            trigger.removeClass("expanded");
            trigger.slideToggle("slow", function () {
                $('#saved_location>i').removeClass("fa fa-minus");
                $('#saved_location>i').addClass("fa fa-plus");
            });
        } else {
            trigger.addClass("expanded");
            trigger.slideToggle("slow", function () { // it class expended doesn't exist , we add it and open dropdown

                $('#saved_location>i').removeClass("fa fa-plus");
                $('#saved_location>i').addClass("fa fa-minus");
            });
        }
    });


$('.save-btn').click(function () { // save new city to the database
    var db = window.openDatabase(dbname, "1.0", "weather_db", 1000);
    db.transaction(function (tx) {
        cityStore(tx);
    });
});


function cityStore(tx) {
    // var last_id;
    var all_city=[];
    var city = $('#city').val();
    tx.executeSql('SELECT * FROM City_TB', [], function (tx, resultSet) {

            var len = resultSet.rows.length;
            for(var i=0; i<len; i++){
                all_city.push((resultSet.rows.item(i).city).toLowerCase()); //push all cities to array
                // last_id = resultSet.rows.item(i).id;
            }
            if($.inArray(city.toLowerCase(), all_city)!=-1){ // check if exist city before saving it. If result is less than 0 means that city doesn't exist.
                swal("City error!", "This city has already been registered", "error");
            }else{  // if city doesn't exist than store it in db
                CityStore(2, city); // if table exist
                swal("Good job!", "City Saved!", "success");
                findCoordinates(city);
            }
        },
        function (error) {
            CityStore(1, city); // if table is not created
            swal("Good job!", "City Saved!", "success");
        }
    );
}

    var db = window.openDatabase(dbname, "1.0", "weather_db", 1000); // retrieve all city from the database
    db.transaction(function (tx) {
        showALL(tx);
    });
    function showALL(tx) {
        tx.executeSql('SELECT * FROM City_TB', [], function (tx, resultSet) {
                var len = resultSet.rows.length;
                for (var i = 0; i < len; i++) {
                    var city = resultSet.rows.item(i).city;
                    findCoordinates(city);
                }
            },
            function (error) {
            }
        );
    }
    function findCoordinates(city) { // find coordinates for specific city to displayt it later on the map with respective weather data
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyDb3X4tW3HAXD9W1Hv3xCIHMdAoJ6Vs68U", // by providing the city name, get coordinates from google API
            dataType: "json",
            success: function (data) {
                lat1 = data.results[0].geometry.location.lat;
                lon1 = data.results[0].geometry.location.lng;
                var city1 = "'"+city+"'";
                $('#saved').append('<li id="'+city+'" style="background-color: darkgray;"><a href="javascript:showPosition1(' + lat1 + ',' + lon1 + ',' + city1 + ')" class="city-name">' + city + '<i id="'+city+'" style="float:right" class="fa fa-trash delete"></i></a></li>'); // show cities on dropdown menu on sidebar
            }
        });
    }

    $('#saved').on('click', '.delete', function(event){ // when delete class is clicked we delete the city from database
        event.preventDefault();
        var city = $(this).attr('id');
        swal({ //prompt an confirm alert
    	   title: 'Delete',
    	   text: 'Do you want to proceed?',
    	   type: 'info',
    	   showCancelButton: true,
    	   closeOnConfirm: false,
    	   showLoaderOnConfirm: true
  	}, function(){
            CityDelete(city);
	});
    });
    $(window).on('resize', function(){ // on window resize close side menu
        var toggle_el = $("#sidebar-toggle").data("toggle");
        $(toggle_el).removeClass("open-sidebar");
    });
});
