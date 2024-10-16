"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { Input, Button } from "@chakra-ui/react";
import { Cloud, MapPin, Thermometer } from 'lucide-react';
import '@/styles/globals.css'


// Define the structure of weather data
type WeatherData = {
  temperature: number;
  description: string;
  location: string;
  unit: string;
};

const WeatherWidget = () => {
  const [location, setLocation] = useState<string>(""); // Holds the location input
  const [weather, setWeather] = useState<WeatherData | null>(null); // Stores the fetched weather data
  const [error, setError] = useState<string | null>(null); // Handles error messages
  const [isLoading, setIsLoading] = useState<boolean>(false); // Manages the loading state

  // Handle search and fetch data from the Weather API
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedLocation = location.trim();
    if (trimmedLocation === "") {
      setError("Please enter a valid location.");
      setWeather(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        setError(errorData.error.message || "City not found. Please try again.");
        setWeather(null);
        return;
      }

      const data = await response.json();
      const weatherData: WeatherData = {
        temperature: data.current.temp_c,
        description: data.current.condition.text,
        location: data.location.name,
        unit: "C",
      };
      setWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("City not found. Please try again.");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Provide temperature description based on the value
  function getTemperatureMessage(temperature: number, unit: string): string {
    if (unit === "C") {
      if (temperature < 0) {
        return `It's freezing at ${temperature}°C! Bundle up!`;
      } else if (temperature < 10) {
        return `It's quite cold at ${temperature}°C. Wear warm clothes.`;
      } else if (temperature < 20) {
        return `The temperature is ${temperature}°C. Comfortable for a light jacket.`;
      } else if (temperature < 30) {
        return `It's a pleasant ${temperature}°C. Enjoy the nice weather!`;
      } else {
        return `It's hot at ${temperature}°C. Stay hydrated!`;
      }
    } else {
      return `${temperature}°${unit}`;
    }
  }

  // Provide messages for weather conditions
  function getWeatherMessage(description: string): string {
    switch (description.toLowerCase()) {
      case "sunny":
        return "It's a beautiful sunny day!";
      case "partly cloudy":
        return "Expect some clouds and sunshine.";
      case "cloudy":
        return "It's cloudy today.";
      case "overcast":
        return "The sky is overcast.";
      case "rain":
        return "Don't forget your umbrella! It's raining.";
      case "thunderstorm":
        return "Thunderstorms are expected today.";
      case "snow":
        return "Bundle up! It's snowing.";
      case "mist":
        return "It's misty outside.";
      case "fog":
        return "Be careful, there's fog outside.";
      default:
        return description;
    }
  }

  // Provide day or night based on time
  function getLocationMessage(location: string): string {
    const currentHour = new Date().getHours();
    const isNight = currentHour >= 18 || currentHour < 6;

    return ` ${location} ${isNight ? "at Night" : "During the Day"}`;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-red-800">
      <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg text-center p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">WEATHER WIDGET</CardTitle>
          <CardDescription className="text-gray-500 mt-2">
            Search for the current weather conditions in your city.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col gap-4 mt-4">
            <Input
              type="text"
              placeholder="Enter a city name"
              value={location}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-green-700 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              {isLoading ? "Loading..." : "Search"}
            </Button>
          </form>

          {error && <div className="mt-4 text-red-500">{error}</div>}

          {weather && (
            <div className="mt-6 grid gap-4">
              <div className="flex items-center gap-2">
                <Thermometer className="w-6 h-6 text-blue-500" />
                {getTemperatureMessage(weather.temperature, weather.unit)}
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-6 h-6 text-gray-500" />
                <div>{getWeatherMessage(weather.description)}</div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-red-500" />
                <div>{getLocationMessage(weather.location)}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherWidget;
