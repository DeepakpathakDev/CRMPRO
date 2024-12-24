import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

interface CallTimerProps {
  onCallEnd: (duration: number) => void;
}

export default function CallTimer({ onCallEnd }: CallTimerProps) {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handleCallToggle = () => {
    if (isActive) {
      onCallEnd(time);
      setTime(0);
    }
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <button
      onClick={handleCallToggle}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
        isActive ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
      }`}
    >
      <Phone size={16} />
      {isActive && <span>{formatTime(time)}</span>}
    </button>
  );
}