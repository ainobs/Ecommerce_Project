import React from 'react';

const Switch = ({ value, onToggle }) => {
  const handleToggle = () => {
    onToggle();
  };

  return (
    <label className="switch relative inline-block w-10 h-5">
      <input
        type="checkbox"
        checked={value}
        onChange={handleToggle}
        className="sr-only"
      />
      <span
        className={` absolute cursor-pointer rounded-full w-10 h-5 ${
          value ? 'bg-orange-500 bg-opacity-30' : 'bg-gray-300'
        } shadow-md transition-transform transform duration-300 ease-in-out`}
      >
        <span
          className={`flex justify-center items-center w-5 h-5 rounded-full  shadow-md transform ${
            value ? 'translate-x-5' : 'translate-x-0'
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="w-5 h-5 bg-orange-500 rounded-full" />
        </span>
      </span>
    </label>
  );
};

export default Switch;
