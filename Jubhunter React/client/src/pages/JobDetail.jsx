import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetail = ({ user }) => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!user.id) {
      alert('Be kell jelentkezned a jelentkezéshez!');
      return;
    }
  
    try {
      const accessToken = localStorage.getItem('accessToken');

      await axios.patch('http://localhost:3030/jobs_users', {
        jobId: id,
        userId: user.id,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert('Sikeresen jelentkeztél az állásra!');
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Hiba történt a jelentkezés során. Kérlek, próbáld újra később.');
    }
  };
  

  if (!job) {
    return <div>Betöltés...</div>;
  }

  return (
    <div className="container">
      <h1>{job.position}</h1>
      <p><strong>Vállalat:</strong> {job.company}</p>
      <p><strong>Helyszín:</strong> {job.city}</p>
      <p><strong>Fizetési sáv:</strong> {job.salaryFrom} - {job.salaryTo}</p>
      <p><strong>Foglalkoztatottság típusa:</strong> {job.type}</p>
      <p><strong>Home-office lehetőség:</strong> {job.homeOffice ? 'Igen' : 'Nem'}</p>
      <p><strong>Leírás:</strong> {job.description}</p>
      <button onClick={handleApply}>Jelentkezés</button>
    </div>
  );
};

export default JobDetail;
