using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using WeatherApp.Models;
using WeatherApp.Repositories;
using System.Net.Http;
using Microsoft.Extensions.Configuration;

namespace WeatherApp.Controllers
{
    [ApiController]
    [Route("api/weather")]
    public class WeatherController : ControllerBase
    {
        //private readonly WeatherRepository _weatherRepository;
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public WeatherController(/*WeatherRepository weatherRepository,*/ IConfiguration configuration)
        {
            //_weatherRepository = weatherRepository;
            _httpClient = new HttpClient();
            _configuration = configuration;
        }

        public async Task<ActionResult> GetWeather(string latitude, string longitude)
        {
            string apiKey = _configuration["WeatherApiKey"];
            string apiUrl = _configuration["WeatherMapApiUrl"];

            string units = "metric";

            if (latitude != string.Empty && longitude != string.Empty)
            {
                string requestUrl = $"{apiUrl}?lat={latitude}&lon={longitude}&units={units}&appid={apiKey}";

                HttpResponseMessage response = await _httpClient.GetAsync(requestUrl);

                if (response.IsSuccessStatusCode)
                {
                    string jsonResult = await response.Content.ReadAsStringAsync();

                    // Handle the JSON result here (e.g., parse and display the weather data)
                    // You can use libraries like Newtonsoft.Json to parse the JSON

                    return Content(jsonResult, "application/json");
                }
                else
                {
                    // Handle the API request failure here (e.g., log an error message)
                    return Content("API request failed");
                }
            }
            else
            {
                return BadRequest("Latitude and longitude could not be provided.");
            }




           
        }
    }
}
