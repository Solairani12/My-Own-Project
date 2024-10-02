import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/student">Student</Link></li>
        <li className="navbar-item"><Link to="/todo">Todo List</Link></li>
        <li className="navbar-item"><Link to="/Add">Increment & decrement</Link></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
