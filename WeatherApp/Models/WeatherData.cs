namespace WeatherApp.Models
{
    public class WeatherData
    {
        public string? City { get; set; }
        public string? longitude { get; set; }
        public string? latitude { get; set; }
        /// <summary>
        /// Rain, Sunny ...
        /// </summary>
        public string?  description{ get; set; }
        public float Temperature { get; set; }
        public float TempMax { get; set; }
        public float TempMin { get; set; }
        /// <summary>
        /// how does the temperature feels like
        /// </summary>
        public float FeelsLike { get; set; }
        public double Humidity{ get; set; }
        public int WindSpeed { get; set; }

    }
}