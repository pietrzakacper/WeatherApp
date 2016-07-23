function setWeather(obj){
  $("#city").html(obj.name+", "+obj.sys.country);
  $("#description").html(obj.weather[0]["description"]);
  $("#temp").html(obj.main.temp+"&#x2103");
  $("#image").html('<img class="img img-responsive" src="http://openweathermap.org/img/w/'+obj.weather[0].icon+'.png">');
  $("#min-temp").html("Min temperature: "+obj.main.temp_min+"&#x2103");
  $("#max-temp").html("Max temperature: "+obj.main.temp_max+"&#x2103");
  $("#wind").html("Wind speed: "+obj.wind.speed+"m/s");
  $("#pres").html("Pressure: "+obj.main.pressure+"hPa");
  $("#lat").html("Latitude: "+obj.coord.lat+"&deg");
  $("#lon").html("Longitude: "+obj.coord.lon+"&deg");

}

function getWeather(latitude,longitude) {
    $.ajax({
        dataType: 'jsonp',
        data: {
          appid: "17cc90635d35d48f549bc86c972d8afc",
          lat: latitude,
          lon: longitude,
          units: "metric"
        },
        url: 'http://api.openweathermap.org/data/2.5/weather',
        jsonpCallback: "setWeather",
        error: function() {
            console.log("Coś poszło nie tak przy losowaniu:(");
        },
        success: function(){
          console.log("Pomyślnie połączono z bazą lat: "+latitude+", long: "+longitude);
        }
    });
}

$(document).ready(function(){
  if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position) {
getWeather(position.coords.latitude,position.coords.longitude);
    })
  }
}
);
