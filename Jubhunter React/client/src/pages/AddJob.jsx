import React, { useState } from 'react';
import axios from 'axios';

const AddJob = () => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [salaryRange, setSalaryRange] = useState([0, 100000]);
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [homeOffice, setHomeOffice] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken');
      const userId = JSON.parse(atob(accessToken.split('.')[1])).userId;

      const jobData = {
        company,
        position,
        description,
        salaryFrom: salaryRange[0],
        salaryTo: salaryRange[1],
        type,
        city,
        homeOffice,
        userId,
      };

      await axios.post('http://localhost:3030/jobs', jobData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert('Álláshirdetés sikeresen hozzáadva!');
      setCompany('');
      setPosition('');
      setDescription('');
      setType('');
      setCity('');
      setHomeOffice(false);
    } catch (error) {
      alert('Hiba történt az álláshirdetés hozzáadása során. Kérlek, próbáld újra később.');
    }
  };

  return (
    <div className="container">
      <h1>Álláshirdetés hozzáadása</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Vállalat:
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Pozíció:
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Leírás:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Fizetési tartomány:
            <input
              type="range"
              min="0"
              max="1000000"
              value={salaryRange[0]}
              onChange={(e) => setSalaryRange([parseInt(e.target.value), salaryRange[1]])}
              required
            />
            <input
              type="range"
              min="0"
              max="1000000"
              value={salaryRange[1]}
              onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value)])}
              required
            />
            <p>Minimum: {salaryRange[0]} Ft | Maximum: {salaryRange[1]} Ft</p>
          </label>
        </div>
        <div>
          <label>
            Foglalkoztatottság típusa:
            <select value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="">Válassz...</option>
              <option value="full-time">Teljes munkaidős</option>
              <option value="part-time">Részmunkaidős</option>
              <option value="contract">Szerződéses</option>
              <option value="internship">Gyakornoki</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Település:
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Home-office lehetőség:
            <input type="checkbox" checked={homeOffice} onChange={(e) => setHomeOffice(e.target.checked)} />
          </label>
        </div>
        <button type="submit">Álláshirdetés hozzáadása</button>
      </form>
    </div>
  );
};

export default AddJob;
