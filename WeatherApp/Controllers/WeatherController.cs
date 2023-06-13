using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WeatherApp.Models;
using WeatherApp.Repositories;

namespace WeatherApp.Controllers
{
    [ApiController]
    [Route("api/weather")]
    public class WeatherController : ControllerBase
    {
        private readonly WeatherRepository _weatherRepository;

        public WeatherController(WeatherRepository weatherRepository)
        {
            _weatherRepository = weatherRepository;
        }

        [HttpGet("{city}")]
        public async Task<IActionResult> GetWeather(float lat, float lon)
        {
            WeatherData weatherData = await _weatherRepository.GetWeatherByCity(lat, lon);

            if (weatherData != null)
            {
                return Ok(weatherData);
            }

            return NotFound();
        }
    }
}
