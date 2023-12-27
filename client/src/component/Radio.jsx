import React from 'react';
const Radio = ({ label, checked, onChange }) => {
  return (
    <div>
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="category"
          value="Category 1"
          checked={checked}
          onChange={() => onChange('Category 1')}
          className="hidden peer"
        />
        <span className="w-4 h-4 rounded border  text-sm mr-2 peer-checked:bg-orange-500"></span>
        {label}
      </label>
    </div>
  );
};

export default Radio;
