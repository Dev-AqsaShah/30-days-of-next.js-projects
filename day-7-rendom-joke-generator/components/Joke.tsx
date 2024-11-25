"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Importing the Button component

// Define a TypeScript interface for the joke response
interface JokeResponse {
  setup: string;
  punchline: string;
}

// Default export of the RandomJokeComponent function
export default function RandomJokeComponent() {
  // State hooks for managing the current joke and loading/error state
  const [joke, setJoke] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Effect hook to fetch a joke when the component mounts
  useEffect(() => {
    fetchJoke();
  }, []); // Empty dependency array ensures this runs once on mount

  // Async function to fetch a random joke from the API
  async function fetchJoke(): Promise<void> {
    setIsLoading(true); // Show loading state
    setHasError(false); // Reset error state

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }
      const data: JokeResponse = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setHasError(true); // Set error state
      setJoke("Failed to fetch joke. Please try again.");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  }

  // JSX return statement rendering the random joke UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#9b6acd] to-[#4e1d85] p-4">
      {/* Center the joke card within the screen */}
      <div className="bg-purple-600 rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Header with title */}
        <h1 className="text-3xl font-extrabold mb-4 text-[#333] ml-16">
          Random Joke 😉
        </h1>

        {/* Display the joke or a loading/error message */}
        <div
          className={`bg-purple-500 rounded-lg p-6 mb-6 text-black text-lg transition-all duration-300 ${
            hasError ? "border border-purple-900 text-purple-900" : ""
          }`}
          aria-live="polite"
        >
          {isLoading ? "Loading..." : joke}
        </div>

        {/* Button to fetch a new joke */}
        <Button
          onClick={fetchJoke}
          className="bg-purple-700 hover:bg-purple-800 text-black font-bold py-2 px-4 rounded-full transition-colors duration-300 ml-28"
        >
          {isLoading ? "Fetching Joke..." : " Get New Joke 😂"}
        </Button>
      </div>
    </div>
  );
}
