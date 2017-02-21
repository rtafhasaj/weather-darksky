function f_c(temp_f){ // convert fahrenheit to grade celsius
        var temp_f1 = (temp_f - 32) * 5 / 9;
        return Math.round(temp_f1);
    }

    function m_km(wind){ // convert mile/h to m/s
        return Math.round((wind * 1.60934 * 1000)/3600);
    }
function historic(lat, lon) {
        $('.row').css('display', 'block');
        var selected_date = $("#datepicker").val(); //get selected date
        var time = new Date(selected_date).getTime() / 1000; // get date and convert to UNIX format
        $.ajax({
            url: "https://api.darksky.net/forecast/18a15c633fcb7af68dbcc2532c591476/" + lat + "," + lon + "," + time,
            dataType: "jsonp",
            success: function (data) {
                graphTemp(data);
                graphWind(data);
                /*remove loader image after success*/
                $('#historical').css('background-image', '');
                $('#historical').css('background-repeat', '');
                $('#historical').css('background-position-x', '');
                $('#historical').css('background-position-y', '');
            }
        });

    }

        function graphTemp(data) {
            var xCategories = [
                '00:00',
                '02:00',
                '04:00',
                '06:00',
                '08:00',
                '10:00',
                '12:00',
                '14:00',
                '16:00',
                '16:00',
                '18:00',
                '20:00',
                '22:00',
                '00:00'
            ];

            $('#container').highcharts({
                chart: {
                    renderTo: 'container'
                },
                title: {
                    text: 'Temperature'
                },
                xAxis: {
                    labels: {
                        formatter: function () {
                            return xCategories[this.value];
                        }
                    },

                    startOnTick: false,
                    endOnTick: false,
                    minPadding: 0,
                    maxPadding: 0

                },
                series: [{
                    name: 'Temperature(C)',
                    data: [
                        f_c(data.hourly.data[0].temperature),
                        f_c(data.hourly.data[2].temperature),
                        f_c(data.hourly.data[4].temperature),
                        f_c(data.hourly.data[6].temperature),
                        f_c(data.hourly.data[8].temperature),
                        f_c(data.hourly.data[10].temperature),
                        f_c(data.hourly.data[12].temperature),
                        f_c(data.hourly.data[14].temperature),
                        f_c(data.hourly.data[16].temperature),
                        f_c(data.hourly.data[18].temperature),
                        f_c(data.hourly.data[20].temperature),
                        f_c(data.hourly.data[22].temperature)
                    ]
                }]
            });

    }

            function graphWind(data) {
            var xCategories = [
                '00:00',
                '02:00',
                '04:00',
                '06:00',
                '08:00',
                '10:00',
                '12:00',
                '14:00',
                '16:00',
                '16:00',
                '18:00',
                '20:00',
                '22:00',
                '00:00'
            ];

            $('#container1').highcharts({
                chart: {
                    renderTo: 'container1'
                },
                title: {
                    text: 'Wind'
                },
                xAxis: {
                    labels: {
                        formatter: function () {
                            return xCategories[this.value];
                        }
                    },

                    startOnTick: false,
                    endOnTick: false,
                    minPadding: 0,
                    maxPadding: 0

                },
                series: [{
                    name: 'Wind(m/s)',
                    data: [
                        m_km(data.hourly.data[0].windSpeed),
                        m_km(data.hourly.data[2].windSpeed),
                        m_km(data.hourly.data[4].windSpeed),
                        m_km(data.hourly.data[6].windSpeed),
                        m_km(data.hourly.data[8].windSpeed),
                        m_km(data.hourly.data[10].windSpeed),
                        m_km(data.hourly.data[12].windSpeed),
                        m_km(data.hourly.data[14].windSpeed),
                        m_km(data.hourly.data[16].windSpeed),
                        m_km(data.hourly.data[18].windSpeed),
                        m_km(data.hourly.data[20].windSpeed),
                        m_km(data.hourly.data[22].windSpeed)
                    ]
                }]
            });

    }