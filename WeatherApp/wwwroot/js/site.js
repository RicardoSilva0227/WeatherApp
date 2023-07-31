const spinnerWrapperEl = document.querySelector('.spinner-wrapper');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLatitudeAndLongitudeValues);
    } else {
        alert("Request is not supported by this browser.");
        $("#loading").hide();
    }

}

function getLatitudeAndLongitudeValues(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getWeatherData(latitude, longitude);
}

function getWeatherData(latitude, longitude) {
    $.ajax({
        url: '/api/weather',
        method: "GET",
        data: {
            latitude: latitude,
            longitude: longitude
        },
        success: function (data) {
            processWeatherData(data);

            spinnerWrapperEl.style.opacity = '0';
            setTimeout(() => {
                spinnerWrapperEl.style.display = 'none';
            }, 200);

        },
        error: function () {
            alert("Request failed");
        }
    });
}
function processWeatherData(data) {
    // Code block for processing the weather data
    var currentDate = new Date();
    var currentTime = currentDate.getTime();

    // Find the data corresponding to today's date and time
    var todayData = null;
    for (var i = 0; i < data.list.length; i++) {
        var item = data.list[i];
        var timestamp = item.dt * 1000; // Convert the timestamp to milliseconds

        // Check if the data corresponds to today's date and time
        if (timestamp > currentTime) {
            todayData = item;
            break;
        }
    }

    if (todayData) {
        var temperature = todayData.main.temp;
        var formattedTemperature = Math.floor(temperature);

        var timestampMilliseconds = todayData.dt * 1000;
        var currentDateTime = new Date(timestampMilliseconds);

        var hours = currentDateTime.getHours();
        var minutes = currentDateTime.getMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
        var year = currentDate.getFullYear();

        // Add leading zeros if needed to make sure each part has two digits
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        var formattedDate = day + '-' + month + '-' + year;
        var formattedTime = hours + ':' + minutes;

        $("#todayTemp").text(formattedTemperature + " ºC");
        $("#weatherStatus").text(todayData.weather[0].description);
        $("#todaysDate").text(formattedDate);
        $("#currentTime").text(formattedTime);

        var daysOfWeekFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var currentDayOfWeekFull = daysOfWeekFull[currentDate.getDay()];
        $("#currentDayOfTheWeek").text(currentDayOfWeekFull);

        document.getElementById("country").textContent = data.city.name;

        // For the next four days, find the highest temperature and display it
        var nextFourDaysHottest = [];
        var dayWiseData = {}; 
        var nextFourDaysCount = 0;
        for (var j = 0; j < data.list.length; j++) {
            var forecastItem = data.list[j];
            var forecastTime = forecastItem.dt * 1000; 

            if (forecastTime > currentTime && nextFourDaysCount < 4) {
                var forecastDate = new Date(forecastTime);
                var forecastDay = forecastDate.getDate();

                // Check if the day is not already processed to avoid duplicates
                if (!dayWiseData[forecastDay]) {
                    var forecastTemperature = forecastItem.main.temp;
                    dayWiseData[forecastDay] = forecastTemperature;
                    nextFourDaysCount++;
                }
            }
        }

        // Loop through the dayWiseData to find the highest temperature for the next four days
        for (var day in dayWiseData) {
            var temperature = dayWiseData[day];
            var formattedTemperature = Math.floor(temperature);
            nextFourDaysHottest.push(formattedTemperature);
        }

        var daysOfWeekAbbrev = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var nextDaysElements = [
            { id: "day1", tempId: "day1Temp" },
            { id: "nextDay2", tempId: "nextDay2Temp" },
            { id: "nextDay3", tempId: "nextDay3Temp" },
            { id: "nextDay4", tempId: "nextDay4Temp" }
        ];

        for (var k = 0; k < nextDaysElements.length; k++) {
            var nextDayElement = nextDaysElements[k];
            var dayIndex = currentDate.getDay() + k + 1; // Increment the day index for the next day
            var nextDayAbbrev = daysOfWeekAbbrev[dayIndex % 7]; // Use modulus to loop back to Sunday
            var nextDayTemp = nextFourDaysHottest[k];

            $("#" + nextDayElement.id).text(nextDayAbbrev);
            $("#" + nextDayElement.tempId + " strong").text(nextDayTemp + " ºC");
        }
    } else {
        alert("No data was found about your current location");
    }
}
