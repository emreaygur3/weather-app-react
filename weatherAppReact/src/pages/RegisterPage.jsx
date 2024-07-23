import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, saveUser } from '../utils/LocalStorage';
import '../css/general.css'
const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (credentials) => {
    const users = getUsers();
    const userExists = users.some(user => user.email === credentials.email );
    if (userExists) {
      alert('User already exists');
    } else {
      saveUser(credentials);
      alert('Registration successful');
      navigate('/login');
    }
  };

  return (
    <div className='register-container'>
      <h1 className='register-header'>Register</h1>
      <RegisterForm onRegister={handleRegister} />
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default RegisterPage;
