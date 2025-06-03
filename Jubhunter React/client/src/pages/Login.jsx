import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3030/authentication', {
        strategy: 'local',
        email,
        password,
      });

      const { accessToken, user } = response.data;
      localStorage.setItem('accessToken', accessToken);

      const isEmployer = user.role === 'company';
      setUser(user, isEmployer);
      navigate('/');
    } catch (error) {
      alert('Hibás email vagy jelszó.');
    }
  };

  return (
    <div className="container">
      <h1>Bejelentkezés</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Jelszó:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Bejelentkezés</button>
      </form>
    </div>
  );
};

export default Login;
