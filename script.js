function setWeather(obj){
  $("#city").html(obj.name+", "+obj.sys.country);
  $("#description").html(obj.weather[0]["description"]);
  $("#temp").html(obj.main.temp+"&#x2103");
  $("#image").attr("src",'http://openweathermap.org/img/w/'+obj.weather[0].icon+'.png');
  $("#min-temp").html(obj.main.temp_min);
  $("#max-temp").html(obj.main.temp_max);
  $("#wind").html(obj.wind.speed);
  $("#pres").html(obj.main.pressure);
  $("#lat").html(obj.coord.lat);
  $("#lon").html(obj.coord.lon);

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
