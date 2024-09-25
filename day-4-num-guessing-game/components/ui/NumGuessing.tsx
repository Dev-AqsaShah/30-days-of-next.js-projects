"use client";

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const NumberGuessingGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setAttempts(0);
  };

  const handlePauseGame = () => {
    setPaused(true);
  };

  const handleResumeGame = () => {
    setPaused(false);
  };

  const handleUserGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserGuess(e.target.value);
  };

  const handleGuess = () => {
    setAttempts((prevAttempts) => prevAttempts + 1);

    // Force correct guess on the 3rd attempt
    if (attempts + 1 === 3) {
      setGameOver(true);
      setShowConfetti(true);  // Show confetti on 3rd guess
      setTimeout(() => {
        setShowConfetti(false);  // Stop confetti after 30 seconds
      }, 30000);
    }
  };

  const handleTryAgain = () => {
    setGameOver(false);
    setGameStarted(false);
    setUserGuess('');
    setAttempts(0);
    setShowConfetti(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
      {showConfetti && <Confetti />} {/* Confetti animation */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-black">
          Number Guessing Game
        </h1>
        {!gameStarted && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleStartGame}
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Game
            </button>
          </div>
        )}
        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {paused ? (
                <button
                  onClick={handleResumeGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Resume
                </button>
              ) : (
                <button
                  onClick={handlePauseGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Pause
                </button>
              )}
            </div>
            <div className="flex justify-center mb-4">
              <input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
                placeholder="Enter your guess"
              />
              <button
                onClick={handleGuess}
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Guess
              </button>
            </div>
            <div className="text-center text-black">
              <p>Attempts: {attempts}</p>
            </div>
          </div>
        )}
        {gameOver && (
          <div>
            <div className="text-center mb-4 text-black">
              <h2 className="text-2xl font-bold">Congratulations!</h2>
              <p>You guessed the right number</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleTryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Replay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberGuessingGame;
