import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="brand-logo">
          
        </Link>
        <nav className="main-nav">
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
          <Link to="/logout">Logout</Link>
        </nav>
      </div>
    </header>
  );
}
