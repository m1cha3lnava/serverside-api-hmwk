/* console.log("Hello World"); */
var currentDate = new Date();
/* console.log(currentDate); */

var pastSearches = localStorage.getItem("pastSearches")
  ? JSON.parse(localStorage.getItem("pastSearches"))
  : [];
function buttonCreate(){
    $("#pastSearchesBtn").empty();
    for(var i=0;i< pastSearches.length; i++){
        var newButton = $("<button>").text(pastSearches[i]);
        $("#pastSearchesBtn").append(newButton);
    }
}

function showPreviousCity() {
    console.log(this.innerHTML);
    populateCity(this.innerHTML);
}
function populateCity(cityName) {
  $("#pastSearches").empty();

  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&APPID=f4bbf7147a555098803bbd3eb95abe19";
  $("#pastSearchesBtn").append(
    $("<li class= 'list-group-item'><button>" + cityName + "</button></li>")
  );
  /* console.log(queryURL); */
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    /* if ("#displayCurrent" !== null) {
        $("#displayCurrent").empty();
      } */
    console.log(response);
    var city = response.name;
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var wind = response.wind.speed;
    var uvIndex = 0;
    $("#currentCity").append($("<h1>" + city + "</h1>"));
    $("#currentTemp").append($("<p>Temp: " + temp + "°F</p>"));
    $("#currentHumidity").append($("<p>Humidity: " + humidity + "</p>"));
    $("#currentWind").append($("<p>Win: " + wind + " MPH</p>"));
    $("#uvIndex").append($("<p>UV Index:" + uvIndex + "</p>"));

    $("#pastSearchesBtn").on("click", showPreviousCity);

    /* UV Index: */
  }); /* end of ajax */
}

/* creating the api call url */
$(".btn").on("click", function (event) {
  event.preventDefault();
  var cityName = $("#newSearchInput").val();
  console.log(cityName);
  pastSearches.push(cityName);
  localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
  populateCity(cityName);
  buttonCreate();
  //  console.log("search button click");
});

buttonCreate();
/* Storage
f4bbf7147a555098803bbd3eb95abe19 works
error 401
ba7a9b7840b3d1d33bc86cc033345ab0
  */
