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
const day1 = $(".day1");
const day2 = $(".day2");
const day3 = $(".day3");
const day4 = $(".day4");
const day5 = $(".day5");
const day6 = $(".day6");
const day7 = $(".day7");

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

console.log(previousDates);


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
        `https://api.weatherapi.com/v1/current.json?key=164d900e7674490187a175906230706&q=${lat}, ${longi}`,
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
        `https://api.weatherapi.com/v1/history.json?key=164d900e7674490187a175906230706&q=${lat}, ${longi}&dt=${previousDates[6]}&end_dt=${previousDates[0]}`,
        {
            method: "GET",
            mode: "cors"
        }
    ).then(response => {
        return response.json();
    }).then(data => {
        console.log("Krish");
        console.log(data);


        day1.find('.current_temp').text(data.forecast.forecastday[0].day.avgtemp_c);
        day1.find('.current-condition').text(data.forecast.forecastday[0].day.condition.text);
        day1.find('.day').text(getDayOfWeek(previousDates[0]));

        day2.find('.current_temp').text(data.forecast.forecastday[1].day.avgtemp_c);
        day2.find('.current-condition').text(data.forecast.forecastday[1].day.condition.text);
        day2.find('.day').text(getDayOfWeek(previousDates[1]));

        day3.find('.current_temp').text(data.forecast.forecastday[2].day.avgtemp_c);
        day3.find('.current-condition').text(data.forecast.forecastday[2].day.condition.text);
        day3.find('.day').text(getDayOfWeek(previousDates[2]));

        day4.find('.current_temp').text(data.forecast.forecastday[3].day.avgtemp_c);
        day4.find('.current-condition').text(data.forecast.forecastday[3].day.condition.text);
        day4.find('.day').text(getDayOfWeek(previousDates[3]));

        day5.find('.current_temp').text(data.forecast.forecastday[4].day.avgtemp_c);
        day5.find('.current-condition').text(data.forecast.forecastday[4].day.condition.text);
        day5.find('.day').text(getDayOfWeek(previousDates[4]));

        day6.find('.current_temp').text(data.forecast.forecastday[5].day.avgtemp_c);
        day6.find('.current-condition').text(data.forecast.forecastday[5].day.condition.text);
        day6.find('.day').text(getDayOfWeek(previousDates[5]));

        day7.find('.current_temp').text(data.forecast.forecastday[6].day.avgtemp_c);
        day7.find('.current-condition').text(data.forecast.forecastday[6].day.condition.text);
        day7.find('.day').text(getDayOfWeek(previousDates[6]));
    })

})

btn.click(function () {

    let searchedLocation = textField.val();

    fetch(
        `https://api.weatherapi.com/v1/current.json?key=164d900e7674490187a175906230706&q=${searchedLocation}`,
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

    fetch(
        `https://api.weatherapi.com/v1/history.json?key=164d900e7674490187a175906230706&q=${searchedLocation}&dt=${previousDates[6]}&end_dt=${previousDates[0]}`,
        {
            method: "GET",
            mode: "cors"
        }
    ).then(response => {
        return response.json();
    }).then(data => {
        console.log("Krish2");
        console.log(data);


        day1.find('.current_temp').text(data.forecast.forecastday[0].day.avgtemp_c);
        day1.find('.current-condition').text(data.forecast.forecastday[0].day.condition.text);
        day1.find('.day').text(getDayOfWeek(previousDates[0]));

        day2.find('.current_temp').text(data.forecast.forecastday[1].day.avgtemp_c);
        day2.find('.current-condition').text(data.forecast.forecastday[1].day.condition.text);
        day2.find('.day').text(getDayOfWeek(previousDates[1]));

        day3.find('.current_temp').text(data.forecast.forecastday[2].day.avgtemp_c);
        day3.find('.current-condition').text(data.forecast.forecastday[2].day.condition.text);
        day3.find('.day').text(getDayOfWeek(previousDates[2]));

        day4.find('.current_temp').text(data.forecast.forecastday[3].day.avgtemp_c);
        day4.find('.current-condition').text(data.forecast.forecastday[3].day.condition.text);
        day4.find('.day').text(getDayOfWeek(previousDates[3]));

        day5.find('.current_temp').text(data.forecast.forecastday[4].day.avgtemp_c);
        day5.find('.current-condition').text(data.forecast.forecastday[4].day.condition.text);
        day5.find('.day').text(getDayOfWeek(previousDates[4]));

        day6.find('.current_temp').text(data.forecast.forecastday[5].day.avgtemp_c);
        day6.find('.current-condition').text(data.forecast.forecastday[5].day.condition.text);
        day6.find('.day').text(getDayOfWeek(previousDates[5]));

        day7.find('.current_temp').text(data.forecast.forecastday[6].day.avgtemp_c);
        day7.find('.current-condition').text(data.forecast.forecastday[6].day.condition.text);
        day7.find('.day').text(getDayOfWeek(previousDates[6]));
    })

});

btn.click(function () {

    let searchedLocation = textField.val();

    let keyVar = "164d900e7674490187a175906230706";
    // get history

    fetch(
        `https://api.weatherapi.com/v1/history.json?key=${keyVar}&q=${searchedLocation}&dt=${previousDates[0]}`,
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





