import React, { useState } from 'react';
import '../css/general.css'

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    onLogin({ email, password }, setError);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label >Email:</label>
        <input className='email-input'
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <label>Password:</label>
        <input className='password-input'
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className='login-button' type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
