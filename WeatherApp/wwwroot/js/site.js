function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Request is not supported by this browser.");
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var NominatimAPIRequest = "https://nominatim.openstreetmap.org/reverse?format=json&lat=LATITUDE&lon=LONGITUDE";
    NominatimAPIRequest = NominatimAPIRequest.replace("LATITUDE", latitude).replace("LONGITUDE", longitude);

    fetch(NominatimAPIRequest)
        .then(response => response.json())
        .then(data => {

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getWeatherData() {
    $.ajax({
        url: '/api/weather',
        method: "GET",
        success: function (data) {
            // Handle the API response here
            console.log(data);

            // Get the temperature from the API response
            var temperature = data.main.temp;
            var formattedTemperature = Math.floor(temperature / 10);

            // Get the current date
            var currentDate = new Date();

            // Extract the day, month, and year from the date object
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

            // Combine the day, month, and year in the desired format
            var formattedDate = day + '-' + month + '-' + year;

            //changing the labels on the front end with the api response
            $("#todayTemp").text(formattedTemperature);
            $("#weatherStatus").text(data.weather[0].description);
            $("#todaysDate").text(formattedDate);
            document.getElementById("country").textContent = data.name;


        },
        error: function () {
            // Handle the API request failure here
            console.log('API request failed');
        }
    });
}