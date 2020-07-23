/* console.log("Hello World"); */
var currentDate = moment().format("M/D");
// console.log(currentDate);
$("#currentDate").append($("<h3>" + currentDate + "</h3>"));
renderFiveDay();

function renderFiveDay() {
  let dayOne = moment().add(1, "days");
  dayOne = dayOne.format("M/D");
  let dayTwo = moment().add(2, "days");
  dayTwo = dayTwo.format("M/D");
  let dayThree = moment().add(3, "days");
  dayThree = dayThree.format("M/D");
  let dayFour = moment().add(4, "days");
  dayFour = dayFour.format("M/D");
  let dayFive = moment().add(5, "days");
  dayFive = dayFive.format("M/D");
  $("#dayOne").empty();
  $("#dayOne").append($("<h5>" + dayOne + "</h5>"));
  $("#dayTwo").empty();
  $("#dayTwo").append($("<h5>" + dayTwo + "</h5>"));
  $("#dayThree").empty();
  $("#dayThree").append($("<h5>" + dayThree + "</h5>"));
  $("#dayFour").empty();
  $("#dayFour").append($("<h5>" + dayFour + "</h5>"));
  $("#dayFive").empty();
  $("#dayFive").append($("<h5>" + dayFive + "</h5>"));
}

var pastSearches = localStorage.getItem("pastSearches")
  ? JSON.parse(localStorage.getItem("pastSearches"))
  : [];
function buttonCreate() {
  $("#pastSearchesBtn").empty();
  for (var i = 0; i < pastSearches.length; i++) {
    var newButton = $("<button>").text(pastSearches[i]);
    $("#pastSearchesBtn").append(newButton);
  }
}

function showPreviousCity() {
  // console.log(this.innerHTML);
  populateCity(this.innerHTML);
}
function populateCity(cityName) {
  $("#pastSearches").empty();
  var apiKey = "f4bbf7147a555098803bbd3eb95abe19";
  const weatherQueryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&APPID=" +
    apiKey;
  $("#pastSearchesBtn").append(
    $("<li class= 'list-group-item'><button>" + cityName + "</button></li>")
  );
  /* console.log(queryURL); */
  $.ajax({
    url: weatherQueryURL,
    method: "GET",
  }).then(function (weatherResponse) {
    const oneCall =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      weatherResponse.coord.lat +
      "&lon=" +
      weatherResponse.coord.lon +
      "&units=imperial&exclude=minutely,hourly&appid=" +
      apiKey;

    const city = weatherResponse.name;
    $("#currentCity").append($("<h1>" + city + "</h1>"));

    $.ajax({
      url: oneCall,
      method: "GET",
    }).then(function (oneCallResponse) {
      console.log(oneCallResponse);
      let uvIndex = oneCallResponse.current.uvi;
      // switch()
      /* if (uvIndex < 4) {
        $("#uvIndex").attr("class", "favorable");
      } else if (uvIndex > 4 && uvIndex < 7) {
        $("#uvIndex").attr("class", "moderate");
      } else {
        $("#uvIndex").attr("class", "severe");
      } */
      const temp = oneCallResponse.current.temp;
      const humidity = oneCallResponse.current.humidity;
      const wind = oneCallResponse.current.speed;
      $("#currentTemp").append($("<p>Temp: " + temp + "°F</p>"));
      $("#currentHumidity").append($("<p>Humidity: " + humidity + "</p>"));
      $("#currentWind").append($("<p>Win: " + wind + " MPH</p>"));
      $("#pastSearchesBtn").on("click", showPreviousCity);
      $("#uvIndex").append(
        $('<p>UV Index: <span class= "favorable">' + uvIndex + "</span></p>")
      );
    });
  }); /* end of ajax */
}

/* creating the api call url */
$(".btn").on("click", function (event) {
  event.preventDefault();
  /*   if ("#displayCurrent" !== null) {
    $("#displayCurrent").empty();
  } */
  var cityName = $("#newSearchInput").val();
  // console.log(cityName);
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
