import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isEditingExperience, setIsEditingExperience] = useState(false);

  useEffect(() => {
    if (user.role === 'jobseeker') {
      fetchExperiences();
    } else {
      fetchJobs();
    }
  }, [user.role]);

  const fetchExperiences = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:3030/experiences?userId=${user.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setExperiences(response.data.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/jobs?userId=${user.id}`);
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleToggleEditExperience = () => {
    setIsEditingExperience(!isEditingExperience);
  };

  const handleEditJob = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Biztosan törölni szeretnéd ezt az álláshirdetést?')) {
      return;
    }
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:3030/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setJobs(jobs.filter(job => job.id !== jobId));
      alert('Álláshirdetés sikeresen törölve!');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Hiba történt az álláshirdetés törlése során. Kérlek, próbáld újra később.');
    }
  };

  const handleViewJob = (jobId) => {
    console.log(`Megtekintés: ${jobId}`);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setExperiences(newExperiences);
  };

  const handleSaveExperience = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      for (const experience of experiences) {
        const experienceData = {
          company: experience.company,
          title: experience.title,
          interval: experience.interval,
          userId: experience.userId,
        };
        
        await axios.patch(`http://localhost:3030/experiences/${experience.id}`, experienceData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      alert('Tapasztalatok sikeresen frissítve!');
      setIsEditingExperience(false);
    } catch (error) {
      console.error('Error saving experiences:', error);
      alert('Hiba történt a tapasztalatok mentése során. Kérlek, próbáld újra később.');
    }
  };
  
  

  return (
    <div className="container">
      <h1>Profilom</h1>
      <div>
        <label>
          Név:
          <input type="text" value={user.fullname} readOnly />
        </label>
      </div>
      <div>
        <label>
          E-mail:
          <input type="email" value={user.email} readOnly />
        </label>
      </div>
      <div>
        <label>
          Státusz:
          <input type="text" value={user.role} readOnly />
        </label>
      </div>
      {user.role === 'jobseeker' && (
        <div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isEditingExperience}
                onChange={handleToggleEditExperience}
              />
              Tapasztalatok szerkesztése
            </label>
          </div>
          {isEditingExperience && (
            <div>
              <h3>Korábbi tapasztalatok:</h3>
              {experiences.map((exp, index) => (
                <div key={index}>
                  <input
                    type="text"
                    defaultValue={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  />
                  <input
                    type="text"
                    defaultValue={exp.title}
                    onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                  />
                  <input
                    type="text"
                    defaultValue={exp.interval}
                    onChange={(e) => handleExperienceChange(index, 'interval', e.target.value)}
                  />
                </div>
              ))}
              <button onClick={handleSaveExperience}>Mentés</button>
            </div>
          )}
        </div>
      )}
      {user.role === 'company' && (
        <div>
          <h3>Meghirdetett állások:</h3>
          <div className="job-list">
            {jobs.map((job) => (
              <div key={job.id} className="job-item">
                <h2>{job.position}</h2>
                <p><strong>Vállalat:</strong> {job.company}</p>
                <p><strong>Helyszín:</strong> {job.city}</p>
                <p><strong>Fizetési sáv:</strong> {job.salaryFrom} - {job.salaryTo}</p>
                <p><strong>Foglalkoztatottság típusa:</strong> {job.type}</p>
                <p><strong>Home-office lehetőség:</strong> {job.homeOffice ? 'Igen' : 'Nem'}</p>
                <div className="job-actions">
                  <button onClick={() => handleEditJob(job.id)}>Szerkesztés</button>
                  <button onClick={() => handleDeleteJob(job.id)}>Törlés</button>
                  <button onClick={() => handleViewJob(job.id)}>Megtekintés</button>
                </div>
              </div>
            ))}
          </div>
          <Link to="/add-job" className="add-job-link">Új álláshirdetés hozzáadása</Link>
        </div>
      )}
    </div>
  );
};

export default Profile;