import React, { useState } from 'react';
import '../css/general.css'

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] =useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && repassword) 
      {
        if(password ===repassword){
          onRegister({ email, password ,repassword });
        } else {
          alert('Password and Repassword is not same')
        }
      } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input className='register-emailinput'
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <label>Password:</label>
        <input  className='register-passwordinput'
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        /> 
        </div>
        <div className='repassword-div'>
        <label>Repassword:</label>
          <input  className='register-repasswordinput'
          type="password" 
          value={repassword} 
          onChange={(e) => setRepassword(e.target.value)} 
        />
      </div>
      <button className='register-loginbutton' type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
