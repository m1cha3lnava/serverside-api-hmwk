/* console.log("Hello World"); */
const currentDate = moment().format("(M/D)");
// console.log(currentDate);
fiveDayDates();
let iconURL = "http://openweathermap.org/img/wn/";

function fiveDayDates() {
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
  $("#dayOneTitle").empty();
  $("#dayOneTitle").append($("<h5>" + dayOne + "</h5>"));
  $("#dayTwoTitle").empty();
  $("#dayTwoTitle").append($("<h5>" + dayTwo + "</h5>"));
  $("#dayThreeTitle").empty();
  $("#dayThreeTitle").append($("<h5>" + dayThree + "</h5>"));
  $("#dayFourTitle").empty();
  $("#dayFourTitle").append($("<h5>" + dayFour + "</h5>"));
  $("#dayFiveTitle").empty();
  $("#dayFiveTitle").append($("<h5>" + dayFive + "</h5>"));
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
    console.log(weatherResponse.weather[0]);
    const currentIcon = iconURL + weatherResponse.weather[0].icon;

    $("#currentCity").append(
      $(
        "<h1>" +
          city +
          currentDate +
          "<img src=" +
          currentIcon +
          "@2x.png></h1>"
      )
    );

    $.ajax({
      url: oneCall,
      method: "GET",
    }).then(function (oneCallResponse) {
      // console.log(oneCallResponse)
      const uvIndex = oneCallResponse.current.uvi;
      const temp = oneCallResponse.current.temp;
      const humidity = oneCallResponse.current.humidity;
      const wind = oneCallResponse.current.wind_speed;
      const dayOneAPI = oneCallResponse.daily[1];
      const dayTwoAPI = oneCallResponse.daily[2];
      const dayThreeAPI = oneCallResponse.daily[3];
      const dayFourAPI = oneCallResponse.daily[4];
      const dayFiveAPI = oneCallResponse.daily[5];

      renderCurrent(temp, humidity, wind, uvIndex);
      render5Day(dayOneAPI, dayTwoAPI, dayThreeAPI, dayFourAPI, dayFiveAPI);

      // switch()
      /* if (uvIndex < 4) {
        $("#uvIndex").attr("class", "favorable");
      } else if (uvIndex > 4 && uvIndex < 7) {
        $("#uvIndex").attr("class", "moderate");
      } else {
        $("#uvIndex").attr("class", "severe");
      } */
    });
  }); /* end of ajax */
}

function renderCurrent(temp, humidity, wind, uvIndex) {
  $("#currentTemp").append($("<p>Temp: " + temp + "°F</p>"));
  $("#currentHumidity").append($("<p>Humidity: " + humidity + "%</p>"));
  $("#currentWind").append($("<p>Win: " + wind + " MPH</p>"));
  $("#pastSearchesBtn").on("click", showPreviousCity);
  $("#uvIndex").append(
    $('<p>UV Index: <span class= "favorable">' + uvIndex + "</span></p>")
  );
}
function render5Day(dayOneAPI, dayTwoAPI, dayThreeAPI, dayFourAPI, dayFiveAPI) {
  const dayOneIconCode = dayOneAPI.weather[0].icon;
  const dayOneIconURL = iconURL + dayOneIconCode + ".png";
  const dayOneTemp = dayOneAPI.temp.day;
  const dayOneHumid = dayOneAPI.humidity;

  const dayTwoIconCode = dayTwoAPI.weather[0].icon;
  const dayTwoIconURL = iconURL + dayTwoIconCode + ".png";
  const dayTwoTemp = dayTwoAPI.temp.day;
  const dayTwoHumid = dayTwoAPI.humidity;

  const dayThreeIconCode = dayThreeAPI.weather[0].icon;
  const dayThreeIconURL = iconURL + dayThreeIconCode + ".png";
  const dayThreeTemp = dayThreeAPI.temp.day;
  const dayThreeHumid = dayThreeAPI.humidity;

  const dayFourIconCode = dayFourAPI.weather[0].icon;
  const dayFourIconURL = iconURL + dayFourIconCode + ".png";
  const dayFourTemp = dayFourAPI.temp.day;
  const dayFourHumid = dayFourAPI.humidity;

  const dayFiveIconCode = dayFiveAPI.weather[0].icon;
  const dayFiveIconURL = iconURL + dayFiveIconCode + ".png";
  const dayFiveTemp = dayFiveAPI.temp.day;
  const dayFiveHumid = dayFiveAPI.humidity;

  $("#dayOneBody").append($("<img src=" + dayOneIconURL + ">"));
  $("#dayOneBody").append($("<p>Temp: " + dayOneTemp + "°F</p>"));
  $("#dayOneBody").append($("<p>Humidity: " + dayOneHumid + "%</p>"));

  $("#dayTwoBody").append($("<img src=" + dayTwoIconURL + ">"));
  $("#dayTwoBody").append($("<p>Temp: " + dayTwoTemp + "°F</p>"));
  $("#dayTwoBody").append($("<p>Humidity: " + dayTwoHumid + "%</p>"));

  $("#dayThreeBody").append($("<img src=" + dayThreeIconURL + ">"));
  $("#dayThreeBody").append($("<p>Temp: " + dayThreeTemp + "°F</p>"));
  $("#dayThreeBody").append($("<p>Humidity: " + dayThreeHumid + "%</p>"));

  $("#dayFourBody").append($("<img src=" + dayFourIconURL + ">"));
  $("#dayFourBody").append($("<p>Temp: " + dayFourTemp + "°F</p>"));
  $("#dayFourBody").append($("<p>Humidity: " + dayFourHumid + "%</p>"));

  $("#dayFiveBody").append($("<img src=" + dayFiveIconURL + ">"));
  $("#dayFiveBody").append($("<p>Temp: " + dayFiveTemp + "°F</p>"));
  $("#dayFiveBody").append($("<p>Humidity: " + dayFiveHumid + "%</p>"));
}

/* creating the api call url */
$(".btn").on("click", function (event) {
  event.preventDefault();
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
