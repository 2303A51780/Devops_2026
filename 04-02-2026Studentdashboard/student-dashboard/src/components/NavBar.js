import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar">
      <h1 className="logo">🎓 Student Dashboard</h1>
      <nav>
        <NavLink to="/" end className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/courses" className="nav-link">
          Courses
        </NavLink>
        <NavLink to="/profile" className="nav-link">
          Profile
        </NavLink>
      </nav>
    </header>
  );
}

export default NavBar;
