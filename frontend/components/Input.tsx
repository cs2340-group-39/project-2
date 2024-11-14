import React from 'react';

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, type, name, value, onChange }) => (
  <div className="input-group">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="input"
      required
    />
  </div>
);

export default Input;
