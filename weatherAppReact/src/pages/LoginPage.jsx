import React from 'react';
import LoginForm from '../components/LoginForm';
import { getUsers } from '../utils/LocalStorage';
import { Link } from 'react-router-dom';
import '../css/general.css'

const LoginPage = ({ onLogin }) => {
  const handleLogin = (credentials, setError) => {
    const users = getUsers();
    const user = users.find(user => user.email === credentials.email && user.password === credentials.password);
    if (user) {
      onLogin(credentials);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className='login-container'>
      <h1 className='login-header'>Login</h1>
      <LoginForm onLogin={handleLogin} />
      <p>Don't have an account? <Link className='register-link' to="/register">Register here</Link></p>
    </div>
  );
};

export default LoginPage;
