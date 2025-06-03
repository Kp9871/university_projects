import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.post('http://localhost:3030/users', {
        fullname: name,
        email,
        password,
        role,
      });
      const userId = userResponse.data.id;

      const authResponse = await axios.post('http://localhost:3030/authentication', {
        strategy: 'local',
        email,
        password,
      });
      const accessToken = authResponse.data.accessToken;

      if (role === 'jobseeker' && experience.trim()) {
        const experiences = experience.split('\n').map(exp => {
          const [company, title, interval] = exp.split(';');
          return { company, title, interval };
        });
        await axios.post('http://localhost:3030/experiences', experiences, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
      alert('Sikeres regisztráció!');
      navigate('/');
    } catch (error) {
      alert('Hiba történt a regisztráció során. Kérlek, próbáld újra később.');
    }
  };

  return (
    <div className="container">
      <h1>Regisztráció</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Név:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
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
        <div>
          <label>
            Profil típusa:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Válassz...</option>
              <option value="company">Munkáltató</option>
              <option value="jobseeker">Munkavállaló</option>
            </select>
          </label>
        </div>
        {role === 'jobseeker' && (
          <div>
            <label>
              Korábbi munkatapasztalatok:
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                rows="5"
                placeholder="Halo Haven;Front-end fejlesztő;2021-2022\nDunder Mifflin;Full-stack fejlesztő;2022-"
              ></textarea>
            </label>
          </div>
        )}
        <button type="submit">Regisztráció</button>
      </form>
    </div>
  );
};

export default Register;
