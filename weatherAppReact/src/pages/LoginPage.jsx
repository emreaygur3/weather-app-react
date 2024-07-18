import React from 'react';
import LoginForm from '../components/LoginForm';
import { getUsers } from '../utils/LocalStorage';
import { Link } from 'react-router-dom';

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
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} />
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default LoginPage;
