import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [salaryRange, setSalaryRange] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [location, setLocation] = useState('');
  const [homeOffice, setHomeOffice] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3030/jobs')
      .then(response => {
        setJobs(response.data.data);
        setFilteredJobs(response.data.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleFilterChange = () => {
    setShowModal(false);
    let filtered = jobs;

    if (salaryRange) {
      const [minSalary, maxSalary] = salaryRange.split('-').map(Number);
      filtered = filtered.filter(job => job.salaryFrom >= minSalary && job.salaryTo <= maxSalary);
    }

    if (employmentType) {
      filtered = filtered.filter(job => job.type === employmentType);
    }

    if (location) {
      filtered = filtered.filter(job => job.city && job.city.toLowerCase().includes(location.toLowerCase()));
    }

    if (homeOffice) {
      filtered = filtered.filter(job => job.homeOffice);
    }

    setFilteredJobs(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = jobs.filter((job) =>
      job.position.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="container">
      <h1>Állások listázása</h1>
      <input
        type="text"
        placeholder="Keresés..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button onClick={() => setShowModal(true)}>Szűrés megjelenítése</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <div>
              <label>
                Fizetési sáv:
                <input
                  type="text"
                  placeholder="pl. 50000-100000"
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Foglalkoztatottság típusa:
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                >
                  <option value="">Válassz...</option>
                  <option value="full-time">Teljes munkaidős</option>
                  <option value="part-time">Részmunkaidős</option>
                  <option value="internship">Gyakornoki</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Település:
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Home-office lehetőség:
                <input
                  type="checkbox"
                  checked={homeOffice}
                  onChange={(e) => setHomeOffice(e.target.checked)}
                />
              </label>
            </div>
            <button onClick={handleFilterChange}>Szűrés</button>
          </div>
        </div>
      )}
      <div className="job-list">
        {filteredJobs.map((job) => (
          <Link to={`/jobs/${job.id}`} key={job.id} className="job-item">
            <h2>{job.position}</h2>
            <p>
              <strong>Vállalat:</strong> {job.company}
            </p>
            <p>
              <strong>Helyszín:</strong> {job.city}
            </p>
            <p>
              <strong>Fizetési sáv:</strong> {job.salaryFrom} - {job.salaryTo}
            </p>
            <p>
              <strong>Foglalkoztatottság típusa:</strong> {job.type}
            </p>
            <p>
              <strong>Home-office lehetőség:</strong>{' '}
              {job.homeOffice ? 'Igen' : 'Nem'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
