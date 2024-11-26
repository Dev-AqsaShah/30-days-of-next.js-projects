"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, useEffect, useMemo } from "react";

// Import custom UI components from the UI directory
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Default export of the DigitalClockComponent function
export default function DigitalClockComponent() {
  // State hooks for managing current time, time format (24-hour or 12-hour), and component mount status
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // Effect hook to run on component mount
  useEffect(() => {
    setMounted(true); // Set mounted status to true
    const interval = setInterval(() => {
      setTime(new Date()); // Update the time every second
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Memoized computation of formatted time to avoid unnecessary recalculations
  const formattedTime = useMemo<string>(() => {
    if (!mounted) return ""; // Don't render time on the server
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0") // Format hours in 24-hour format
      : (time.getHours() % 12 || 12).toString().padStart(2, "0"); // Format hours in 12-hour format
    const minutes = time.getMinutes().toString().padStart(2, "0"); // Format minutes
    const seconds = time.getSeconds().toString().padStart(2, "0"); // Format seconds
    return `${hours}:${minutes}:${seconds}`; // Return formatted time string
  }, [time, is24Hour, mounted]); // Dependencies to re-run the memoized function

  // JSX return statement rendering the digital clock UI
  return (
    <div className="flex items-center justify-center h-screen bg-blue-900">
      {/* Wrapper for the animated border */}
      <div className="relative p-4 rounded-lg shadow-lg">
        {/* Animated Border */}
        <div className="absolute inset-0 bg-blue-950 animate-border rounded-lg border-[3px] border-transparent"></div>

        {/* Main Card Content */}
        <Card className=" border-none relative z-10 p-10 bg-blue-300 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            {/* Header with title */}
            <div className="text-2xl font-extrabold tracking-tight">DIGITAL CLOCK</div>
            {/* Description */}
            <div className="text-sm text-gray-700 mb-4">
              Display current time in hours, minutes, and seconds.
            </div>
            {/* Display the formatted time */}
            <div className="text-6xl font-bold tracking-tight">{formattedTime}</div>
            {/* Buttons to switch between 24-hour and 12-hour formats */}
            <div className="mt-4 flex items-center">
              <Button
                onClick={() => setIs24Hour(true)}
                className="mr-2 font-bold bg-blue-500 text-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full"
              >
                24-Hour Format
              </Button>
              <Button
                onClick={() => setIs24Hour(false)}
                className="mr-2 font-bold bg-blue-500 text-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full"
              >
                12-Hour Format
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
