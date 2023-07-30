
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
            // Handle the API response here
            console.log(data);

            // Get the temperature from the API response
            var temperature = data.main.temp;
            var formattedTemperature = Math.floor(temperature);

            // Get the current date
            var currentDate = new Date();
            var dayOfWeekNumber = currentDate.getDay();

            // Define an array to map the day of the week number to its corresponding name
            var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            // Get the current day of the week as a string
            var currentDayOfWeek = daysOfWeek[dayOfWeekNumber];
 
            // Extract the day, month, and year from the date object
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
            var year = currentDate.getFullYear();


            // Extract and convert the timestamp to milliseconds
            var timestamp = data.dt;
            var timestampMilliseconds = timestamp * 1000;

            var currentTime = new Date(timestampMilliseconds);

            // Get the current time in hours, minutes, and seconds
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes();
            var seconds = currentTime.getSeconds();

            // Format the time with leading zeros if needed
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            // Add leading zeros if needed to make sure each part has two digits
            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }

            

            // Combine the day, month, and year in the desired format, same for time
            var formattedDate = day + '-' + month + '-' + year;
            var formattedTime = hours + ':' + minutes;


            $("#todayTemp").text(formattedTemperature);
            $("#weatherStatus").text(data.weather[0].description);
            $("#todaysDate").text(formattedDate);
            $("#currentTime").text(formattedTime);            
            $("#currentDayOfTheWeek").text(currentDayOfWeek);            
            document.getElementById("country").textContent = data.name;

            $("#loading").hide();

        },
        error: function () {
            alert("Request failed");
            $("#loading").hide();
        }
    });
}