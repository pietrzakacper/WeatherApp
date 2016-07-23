function setWeather(obj) {
    $("#city").html(obj.name + ", " + obj.sys.country);
    $("#description").html(obj.weather[0]["description"]);
    $("#temp").html(obj.main.temp);
    $("#image").attr("src", 'http://openweathermap.org/img/w/' + obj.weather[0].icon + '.png');
    $("#min-temp").html(obj.main.temp_min);
    $("#max-temp").html(obj.main.temp_max);
    $("#wind").html(obj.wind.speed);
    $("#pres").html(obj.main.pressure);
    $("#lat").html(obj.coord.lat);
    $("#lon").html(obj.coord.lon);

}

function getWeather(latitude, longitude) {
    $.ajax({
        dataType: 'jsonp',
        data: {
            appid: "17cc90635d35d48f549bc86c972d8afc",
            lat: latitude,
            lon: longitude,
            units: "metric"
        },
        url: 'https://api.openweathermap.org/data/2.5/weather',
        jsonpCallback: "setWeather",
        error: function() {
            console.log("Coś poszło nie tak przy losowaniu:(");
        },
        success: function() {
            console.log("Pomyślnie połączono z bazą lat: " + latitude + ", long: " + longitude);
        }
    });
}

function switchUnitSystem() {
    $(".fahr, .cels").each(
        function() {
            if ($(this).hasClass("fahr")) {
                $(this).removeClass("fahr");
                $(this).addClass("cels");
                $(this).html("&#x2103;");
            } else {

                $(this).removeClass("cels");
                $(this).addClass("fahr");
                $(this).html("&#x2109;");
            }
        });

    var $temp = $("#temp");
    var $mintemp = $("#min-temp");
    var $maxtemp = $("#max-temp");
    if ($temp.html() < 60) {
      $temp = toFahr($temp);
      $mintemp = toFahr($mintemp);
      $maxtemp = toFahr($maxtemp);
    }  else{
      $temp = toCels($temp);
      $mintemp = toCels($mintemp);
      $maxtemp = toCels($maxtemp);
    }

}

function toFahr($obj){
  $obj.html(Math.round((32 + (9/5)*$obj.html())*100)/100);
  return $obj;
}

function toCels($obj){
  $obj.html(Math.round((($obj.html() -32)*(5/9))*100)/100);
  return $obj;
}

$(document).ready(function() {
    $("#switch").on("click", function() {
        switchUnitSystem();
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            getWeather(position.coords.latitude, position.coords.longitude);
        })
    }
});
