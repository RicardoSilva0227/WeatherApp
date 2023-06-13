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

    debugger;
    fetch(NominatimAPIRequest)
        .then(response => response.json())
        .then(data => {
            var country = data.address.country;
            document.getElementById("country").textContent = country;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}