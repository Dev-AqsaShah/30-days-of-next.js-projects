"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBirthdayCake, FaGift } from 'react-icons/fa';
import { GiBalloons } from 'react-icons/gi';
import Confetti from 'react-confetti';
import { cn } from "@/lib/utils";


const BirthdayCard = () => {
  const totalCandles = 5;
  const totalBalloons = 5;

  const [candlesLit, setCandlesLit] = useState(0);
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Effect to track window resizing for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lighting a candle
  const lightCandle = (index: number) => {
    setCandlesLit((prev) => Math.max(prev, index + 1));
  };

  // Popping a balloon
  const popBalloon = (index: number) => {
    setBalloonsPoppedCount((prev) => prev + 1);
  };

  // Celebration with confetti
  const celebrate = () => {
    setCelebrating(true);
    setShowConfetti(true);
    setTimeout(() => {
      setCelebrating(false);
      setShowConfetti(false);
    }, 60000); // Confetti for 1 minute
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border-2 border-black p-6 bg-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-500"> 🎉Happy Birthday🎉</h1>
            <h2 className="text-2xl font-semibold text-blue-300">AQSA SHAH</h2>
            <p className="text-lg text-blue-200">September 17th</p>
          </div>

          {/* Candles Section */}
          <div className="space-y-6 text-center mt-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-500 mb-2">Light the candles:</h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                    {(celebrating && index <= candlesLit) || (!celebrating && index < candlesLit) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                      >
                        <FaBirthdayCake
                          className="w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                          style={{ color: ['#FF6347', '#FFD700', '#ADFF2F', '#1E90FF', '#FF69B4'][index % 5] }}
                          onClick={() => lightCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      <FaBirthdayCake
                        className="w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                        onClick={() => lightCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>

            {/* Balloons Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-500 mb-2">Pop the balloons:</h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalBalloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GiBalloons
                      className="w-8 h-8 cursor-pointer hover:scale-110"
                      style={{ color: index < balloonsPoppedCount ? '#D1D5DB' : ['#FF6347', '#FFD700', '#ADFF2F', '#1E90FF', '#FF69B4'][index % 5] }}
                      onClick={() => popBalloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Celebration Button */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate <FaGift className="ml-6 h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Confetti Section */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={1000}
          colors={['#FF6347', '#FFD700', '#ADFF2F', '#1E90FF', '#FF69B4']}
        />
      )}
    </div>
  );
};

export default BirthdayCard;
