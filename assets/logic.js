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
function prevSearchBtn() {
  $("#pastSearchesBtn").empty();
  for (var i = 0; i < pastSearches.length; i++) {
    var pastButton = $("<button>").text(pastSearches[i]);
    $("#pastSearchesUL").prepend('<li id="pastSearch' + i + '"></li>');
    $("#pastSearch" + i).prepend(pastButton);
  }
}
function newSearchedBtn(cityName){
    var newButton = $("<button>").text(cityName);
    $("#pastSearchesUL").prepend('<li id="pastSearch' + pastSearches.length +'"></li>');
    $("#pastSearch" + pastSearches.length).prepend(newButton);
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
    // console.log(weatherResponse);
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
    });
  }); /* end of ajax */
}

function resetCurrentDayCard() {
  if ("#displayCurrent" !== null) {
    $("#displayCurrent").empty();
    $("#displayCurrent").append(
      $('<h3 class="card-text" id="currentDate"></h3>')
    );
    $("#displayCurrent").append(
      $('<h1 class="card-title" id="currentCity"></h1>')
    );
    $("#displayCurrent").append(
      $('<p class="card-text" id="currentTemp"></p>')
    );
    $("#displayCurrent").append(
      $('<p class="card-text" id="currentHumidity"></p>')
    );
    $("#displayCurrent").append(
      $('<p class="card-text" id="currentWind"></p>')
    );
    $("#displayCurrent").append($('<p class="card-text" id="uvIndex"></p>'));
  }
}

function renderCurrent(temp, humidity, wind, uvIndex) {
  $("#currentTemp").append($("<p>Temp: " + temp + "°F</p>"));
  $("#currentHumidity").append($("<p>Humidity: " + humidity + "%</p>"));
  $("#currentWind").append($("<p>Win: " + wind + " MPH</p>"));
  $("#pastSearchesBtn").on("click", showPreviousCity);
  $("#uvIndex").append(
    $('<p>UV Index: <span id= "numUV">' + uvIndex + "</span></p>")
  );

  if (uvIndex < 4) {
    $("#numUV").addClass("favorable");
  } else if (uvIndex > 4 && uvIndex < 7) {
    $("#numUV").addClass("moderate");
  } else {
    $("#numUV").addClass("severe");
  }
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

  $("#dayOneBody").empty();
  $("#dayOneBody").append($("<img src=" + dayOneIconURL + ">"));
  $("#dayOneBody").append($("<p>Temp:<br>" + dayOneTemp + "°F</p>"));
  $("#dayOneBody").append($("<p>Humidity: " + dayOneHumid + "%</p>"));

  $("#dayTwoBody").empty();
  $("#dayTwoBody").append($("<img src=" + dayTwoIconURL + ">"));
  $("#dayTwoBody").append($("<p>Temp:<br>" + dayTwoTemp + "°F</p>"));
  $("#dayTwoBody").append($("<p>Humidity: " + dayTwoHumid + "%</p>"));

  $("#dayThreeBody").empty();
  $("#dayThreeBody").append($("<img src=" + dayThreeIconURL + ">"));
  $("#dayThreeBody").append($("<p>Temp:<br>" + dayThreeTemp + "°F</p>"));
  $("#dayThreeBody").append($("<p>Humidity: " + dayThreeHumid + "%</p>"));

  $("#dayFourBody").empty();
  $("#dayFourBody").append($("<img src=" + dayFourIconURL + ">"));
  $("#dayFourBody").append($("<p>Temp:<br>" + dayFourTemp + "°F</p>"));
  $("#dayFourBody").append($("<p>Humidity: " + dayFourHumid + "%</p>"));

  $("#dayFiveBody").empty();
  $("#dayFiveBody").append($("<img src=" + dayFiveIconURL + ">"));
  $("#dayFiveBody").append($("<p>Temp:<br>" + dayFiveTemp + "°F</p>"));
  $("#dayFiveBody").append($("<p>Humidity: " + dayFiveHumid + "%</p>"));
}

/* creating the api call url */
$(".btn").on("click", function (event) {
  event.preventDefault();
  resetCurrentDayCard();
  var cityName = $("#newSearchInput").val();
  $("#newSearchInput").remove();
  $("#searchBar").prepend('<input class="form-control" id="newSearchInput" />');

  console.log({ cityName });
  if (cityName === "") {
    return;
  } else {
    pastSearches.push(cityName);
    localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
    populateCity(cityName);
    newSearchedBtn(cityName);
    //  console.log("search button click");
  }
});

prevSearchBtn();
/* Storage
f4bbf7147a555098803bbd3eb95abe19 works
error 401
ba7a9b7840b3d1d33bc86cc033345ab0
  */
