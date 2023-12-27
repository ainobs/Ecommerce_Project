// Loading.tsx

import React, { useEffect, useState } from 'react';
import './Loading.css'; // Import the Tailwind CSS styles

const messages = ['Loading', 'Please wait', 'Almost there']; // Add your custom messages

const Loading = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-3xl font-bold">
        {messages[index].split('').map((char, charIndex) => (
          <span key={charIndex} className="animate-typing  text-orange-500 ">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loading;
