namespace WeatherApp.Repositories
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using WeatherApp.Models;

    public class WeatherRepository
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _baseUrl;

        public WeatherRepository(HttpClient httpClient, string apiKey, string baseUrl)
        {
            _httpClient = httpClient;
            _apiKey = apiKey;
            _baseUrl = baseUrl;
        }

        public async Task<WeatherData> GetWeatherByCity(float lat, float lon)
        {
            string url = $"{_baseUrl}?lat={lat}&lon={lon}&appid={_apiKey}";
            HttpResponseMessage response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                string jsonResponse = await response.Content.ReadAsStringAsync();
                WeatherData weatherData = ParseWeatherData(jsonResponse);
                return weatherData;
            }

            // Handle error cases
            // You can throw an exception or return null/empty data based on your needs
            return null;
        }

        private WeatherData ParseWeatherData(string jsonResponse)
        {
            // Parse and extract relevant data from JSON response
            // Create and return a WeatherData object
            // Example: 
            var weatherData = new WeatherData();
            //weatherData.Temperature = jsonResponse.temperature;
            //weatherData.Humidity = jsonResponse.humidity;

             return weatherData;
        }
    }
}
