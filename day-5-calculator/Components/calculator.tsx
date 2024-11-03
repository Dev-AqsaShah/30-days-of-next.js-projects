'use client'

// Import custom UI components from the UI directory
import { useState, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

// Default export of the CalculatorComponent function
export default function CalculatorComponent() {
  // State hooks for managing input numbers and the result
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<string>("");

  // Handler for updating num1 state on input change
  const handleNum1Change = (e: ChangeEvent<HTMLInputElement>): void => {
    setNum1(e.target.value);
  };

  // Handler for updating num2 state on input change
  const handleNum2Change = (e: ChangeEvent<HTMLInputElement>): void => {
    setNum2(e.target.value);
  };

  // Function to perform addition and set the result
  const add = (): void => {
    setResult((parseFloat(num1) + parseFloat(num2)).toString());
  };

  // Function to perform subtraction and set the result
  const subtract = (): void => {
    setResult((parseFloat(num1) - parseFloat(num2)).toString());
  };

  // Function to perform multiplication and set the result
  const multiply = (): void => {
    setResult((parseFloat(num1) * parseFloat(num2)).toString());
  };

  // Function to perform division and set the result
  const divide = (): void => {
    if (parseFloat(num2) !== 0) {
      setResult((parseFloat(num1) / parseFloat(num2)).toString());
    } else {
      setResult("Error: Division by zero");
    }
  };

  // Function to clear the inputs and result
  const clear = (): void => {
    setNum1("");
    setNum2("");
    setResult("");
  };

  // JSX return statement rendering the calculator UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-blue-300 ">
      {/* Center the calculator within the screen */}
      <Card className="w-full max-w-md p-6 bg-gradient-to-b from-blue-400 to-blue-900 shadow-lg rounded-lg border-black">
        {/* Card header with title */}
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold uppercase animate-pulse text-blue-900 text-center">
            Simple Calculator
          </CardTitle>
        </CardHeader>
        {/* Card content including inputs, buttons, and result display */}
        <CardContent className="space-y-4">
          {/* Input fields for numbers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="num1" className="text-center font-bold">Number 1</Label>
              <Input
                id="num1"
                type="number"
                value={num1}
                onChange={handleNum1Change}
                placeholder="Enter a number"
                className="border-black"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="num2" className="text-center font-bold">Number 2</Label>
              <Input
                id="num2"
                type="number"
                value={num2}
                onChange={handleNum2Change}
                placeholder="Enter a number"
                className="border-black"
              />
            </div>
          </div>
          {/* Buttons for arithmetic operations */}
          <div className="grid grid-cols-4 gap-2 ">
            <Button
              variant="outline"
              className="text-2xl font-bold text-black bg-blue-600 border-black"
              onClick={add}
            >
              +
            </Button>
            <Button
              variant="outline"
              className="text-2xl font-bold text-black bg-blue-600 border-black"
              onClick={subtract}
            >
              -
            </Button>
            <Button
              variant="outline"
              className="text-2xl font-bold text-black  bg-blue-600 border-black"
              onClick={multiply}
            >
              *
            </Button>
            <Button
              variant="outline"
              className="text-2xl font-bold text-black bg-blue-600 border-black"
              onClick={divide}
            >
              /
            </Button>
          </div>
          {/* Display the result */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="result" className="text-center font-bold uppercase">Result</Label>
            <Input
              id="result"
              type="text"
              value={result}
              placeholder="Result"
              readOnly
              className="border-black"
            />
          </div>
          {/* Clear button to reset inputs and result */}
          <Button variant="outline" className="w-28 ml-28 font-bold bg-blue-700 uppercase border-black" onClick={clear}>
            Clear
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}