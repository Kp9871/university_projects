import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [salaryFrom, setSalaryFrom] = useState('');
  const [salaryTo, setSalaryTo] = useState('');
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [homeOffice, setHomeOffice] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/jobs/${id}`);
        const job = response.data;
        setCompany(job.company);
        setPosition(job.position);
        setDescription(job.description);
        setSalaryFrom(job.salaryFrom);
        setSalaryTo(job.salaryTo);
        setType(job.type);
        setCity(job.city);
        setHomeOffice(job.homeOffice);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken');
      const userId = JSON.parse(atob(accessToken.split('.')[1])).userId;

      const jobData = {
        company,
        position,
        description,
        salaryFrom: parseInt(salaryFrom),
        salaryTo: parseInt(salaryTo),
        type,
        city,
        homeOffice: Boolean(homeOffice),
        userId,
      };

      await axios.patch(`http://localhost:3030/jobs/${id}`, jobData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert('Álláshirdetés sikeresen szerkesztve!');
      navigate('/profile');
    } catch (error) {
      alert('Hiba történt az álláshirdetés szerkesztése során. Kérlek, próbáld újra később.');
    }
  };

  return (
    <div className="container">
      <h1>Álláshirdetés szerkesztése</h1>
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
            Kezdő fizetés:
            <input type="number" value={salaryFrom} onChange={(e) => setSalaryFrom(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Maximális fizetés:
            <input type="number" value={salaryTo} onChange={(e) => setSalaryTo(e.target.value)} required />
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
        <button type="submit">Mentés</button>
      </form>
    </div>
  );
};

export default EditJob;
