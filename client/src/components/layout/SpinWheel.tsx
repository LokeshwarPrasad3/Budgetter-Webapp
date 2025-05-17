import { useState } from 'react';
import {
  PhoneOff,
  Trash,
  Clock,
  Target,
  ShoppingCart,
  Sun,
  Heart,
  Music,
  Coffee,
} from 'lucide-react';

const items = [
  {
    text: 'No GF Calling 📵 (Call Mom instead! 💰)',
    icon: <PhoneOff size={20} />,
  },
  {
    text: 'Delete Insta 🚫📱 (Read a book, not memes! 🌱)',
    icon: <Trash size={20} />,
  },
  {
    text: 'Wake Up Early 🌞 (Or snooze like a pro 🫠)',
    icon: <Clock size={20} />,
  },
  {
    text: 'Focus on Goals 🎯 (Not girls 👀)',
    icon: <Target size={20} />,
  },
  {
    text: 'Stop Online Shopping 🛍️ (Wallet says help! 😭)',
    icon: <ShoppingCart size={20} />,
  },
  {
    text: 'Go Outside 🌳 (The sun’s still there! ☀️)',
    icon: <Sun size={20} />,
  },
  {
    text: 'No More Drama 🎭 (Life’s a comedy! 😂)',
    icon: <Heart size={20} />,
  },
  {
    text: 'Take a Break ☕ (Stop working like a robot 🤖)',
    icon: <Coffee size={20} />,
  },
  {
    text: 'Listen to Music 🎶 (Mood booster! 🎧)',
    icon: <Music size={20} />,
  },
];

const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string>('Spin the Wheel to Win!');
  const [currentRotation, setCurrentRotation] = useState(0);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Calculate the winning index
    const randomIndex = Math.floor(Math.random() * items.length);

    // Calculate total rotation: 5 full spins (1800 degrees) + extra to complete full rotation
    const totalRotation = 1800 + (360 - (currentRotation % 360));

    // Set the rotation
    setCurrentRotation(currentRotation + totalRotation);

    // Update result after spinning
    setTimeout(() => {
      setResult(items[randomIndex].text);
      setIsSpinning(false);
      // Reset to exactly 0 degrees
      setCurrentRotation(0);
    }, 2000);
  };

  return (
    <div className="mx-auto hidden w-full max-w-md flex-col items-center rounded-lg p-6 lg:flex">
      <h2 className="mb-4 text-center text-sm font-bold">
        🎡 Spin the Wheel & Win!
      </h2>
      <div className="relative flex h-44 w-44 items-center justify-center">
        <div
          className="flex h-44 w-44 items-center justify-center rounded-full border-4 border-yellow-500 text-center text-sm font-semibold shadow-xl"
          style={{
            transform: `rotate(${currentRotation}deg)`,
            transition: isSpinning
              ? 'transform 2s cubic-bezier(0.15, 0, 0.15, 1)'
              : 'none',
          }}
        >
          <div className="grid grid-cols-3 gap-1">
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex h-10 w-10 flex-col items-center justify-center rounded-full ${
                  result === item.text
                    ? 'bg-yellow-400 text-black dark:bg-green-400'
                    : 'bg-gray-200 text-gray-700 dark:bg-bg_secondary_dark dark:text-white'
                }`}
              >
                {item.icon}
                <p className="text-xs">{item.text.split(' ')[0]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute left-1/2 top-0 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 rotate-180 transform items-center justify-center rounded-full bg-red-600 text-white shadow-md">
          🔺
        </div>
      </div>
      <button
        onClick={spin}
        className="mt-4 select-none rounded-lg bg-green-400 px-5 py-2 text-sm font-semibold text-black/90 transition-all duration-300 hover:bg-green-500 disabled:opacity-50"
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin Now! 🎰'}
      </button>
      <p className="mt-4 text-center text-base font-medium">{result}</p>
    </div>
  );
};

export default SpinWheel;
