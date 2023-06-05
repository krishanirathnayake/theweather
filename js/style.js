document.querySelector(".ham").addEventListener("click", changeIcon);

function changeIcon(event) {
    let ham = event.currentTarget;
    ham.classList.toggle("clicked");
    ham.children[0].classList.toggle('rotate-left');
    ham.children[1].classList.toggle('vanish');
    ham.children[2].classList.toggle('rotate-right');
    document.querySelector(".drawer-items").classList.toggle("visible");
}

const btn = $("#btn");
const textField = $("#search_bar");
const temp = $(".current_temp");
const date = $(".current_date");
const lc = $(".current-location");
const rgn = $(".region");
const condition = $(".current-condition");
const country = $(".country");
let lat = null;
let longi = null;
const windSpeed = $(".wind_speed");
const humidity = $(".humidity");
const dayInWord = $(".day");


var currentDate = new Date();
var previousDates = [];

for (var i = 1; i <= 7; i++) {
    var previousDate = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
    var year = previousDate.getFullYear();
    var month = (previousDate.getMonth() + 1).toString().padStart(2, '0');
    var day = previousDate.getDate().toString().padStart(2, '0');
    var formattedDate = year + '-' + month + '-' + day;
    previousDates.push(formattedDate);
}

// console.log(previousDates[4]);


function getDayOfWeek(dateString) {
    var dateParts = dateString.split("-");
    var year = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]) - 1;
    var day = parseInt(dateParts[2]);

    var date = new Date(year, month, day);
    var dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

    return dayOfWeek;
}

navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position)
    lat = position.coords.latitude;
    longi = position.coords.longitude;

    fetch(
        `http://api.weatherapi.com/v1/current.json?key=5e833f2d0f864fafbd8174405230406&q=${lat}, ${longi}`,
        {
            method: "GET",
            mode: "cors"
        }
    ).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        temp.text(data.current.temp_c);
        date.text(data.current.last_updated);
        lc.text(data.location.name);
        rgn.text("," + data.location.region + " Province");
        condition.text(data.current.condition.text);
        country.text(data.location.country);
        windSpeed.text(data.current.wind_kph + " kph");
        humidity.text(data.current.humidity + " %");
    })

    fetch(
        `http://api.weatherapi.com/v1/history.json?key=5e833f2d0f864fafbd8174405230406&q=${lat}, ${longi}&dt=${previousDates[1]}`,
        {
            method: "GET",
            mode: "cors"
        }
    ).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        temp.text(data.forecast.forecastday[0].day.avgtemp_c);
        condition.text(data.forecast.forecastday[0].day.condition.text);
        dayInWord.text(getDayOfWeek(previousDates[1]));
    })

})

btn.click(function () {

    let searchedLocation = textField.val();

    fetch(
        `http://api.weatherapi.com/v1/current.json?key=5e833f2d0f864fafbd8174405230406&q=${searchedLocation}`,
        {
            method: "GET",
            mode: "cors"
        }
    ).then(response => {
        return response.json();
    }).then(data => {
        console.log(data)
        temp.text(data.current.temp_c);
        date.text(data.current.last_updated);
        lc.text(data.location.name);
        rgn.text("," + data.location.region + "Province");
        condition.text(data.current.condition.text);
        country.text(data.location.country);
        windSpeed.text(data.current.wind_kph + " kph");
        humidity.text(data.current.humidity + " %");

    })
});

btn.click(function () {

    let searchedLocation = textField.val();

    // get history

    fetch(
        `http://api.weatherapi.com/v1/history.json?key=5e833f2d0f864fafbd8174405230406&q=${searchedLocation}&dt=${previousDates[0]}`,
        {
            method: "GET",
            mode: "cors"
        }
    ).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        temp.text(data.forecast.forecastday[0].day.avgtemp_c);
        condition.text(data.forecast.forecastday[0].day.condition.text);
        dayInWord.text(getDayOfWeek(previousDates[1]));
    })
});





