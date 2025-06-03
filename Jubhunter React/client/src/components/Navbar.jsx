import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, isEmployer, onLogout }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Jobhunter</Link></li>
        <li><Link to="/">Főoldal</Link></li>
        {!isLoggedIn && <>
          <li><Link to="/register">Regisztráció</Link></li>
          <li><Link to="/login">Bejelentkezés</Link></li>
        </>}
        {isLoggedIn && !isEmployer && <>
          <li><Link to="/profile">Profilom</Link></li>
          <li><a href="/" onClick={onLogout}>Kijelentkezés</a></li>
        </>}
        {isLoggedIn && isEmployer && <>
          <li><Link to="/profile">Profilom</Link></li>
          <li><Link to="/add-job">Álláshirdetés hozzáadása</Link></li>
          <li><a href="/" onClick={onLogout}>Kijelentkezés</a></li>
        </>}
      </ul>
    </nav>
  );
};

export default Navbar;
