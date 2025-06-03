import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AddJob from './pages/AddJob';
import JobDetail from './pages/JobDetail';
import EditJob from './pages/EditJob';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (user, isEmployer) => {
    setUser(user);
    setIsLoggedIn(true);
    setIsEmployer(isEmployer);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsEmployer(false);
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} isEmployer={isEmployer} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs/:id" element={<JobDetail user={user} />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        {isLoggedIn && (
          <>
            <Route path="/profile" element={<Profile user={user} />} />
            {isEmployer && <Route path="/add-job" element={<AddJob />} />}
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
