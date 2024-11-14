import React, { useState } from 'react';
import Input from './Input';

interface AuthFormProps {
  type: 'signin' | 'signup';
  onSubmit: (formData: { email: string; password: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>{type === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" className="auth-button">
        {type === 'signin' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default AuthForm;
