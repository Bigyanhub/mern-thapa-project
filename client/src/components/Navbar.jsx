import { NavLink } from "react-router-dom";
import "./Navbar.css";

// Main navigation bar component
const Navbar = () => {
  return (
    <>
      <header>
        <div className="container nav-bar">
          {/* Logo/brand */}
          <div className="logo-brand">
            <NavLink to="/">Bigyan</NavLink>
          </div>
          {/* Navigation links */}
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/service">Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
