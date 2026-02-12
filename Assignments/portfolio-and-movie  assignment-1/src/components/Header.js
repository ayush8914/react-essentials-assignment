import "./Header.css";

function Header(props) {
  return (
    <header className="header">
      <nav className="nav">
        <h2
          className={`nav-item ${props.active === "portfolio" ? "active" : ""}`}
          onClick={() => props.setActive("portfolio")}
        >
          Portfolio
        </h2>

        <h2
          className={`nav-item ${props.active === "movies" ? "active" : ""}`}
          onClick={() => props.setActive("movies")}
        >
          Movie-Explorer
        </h2>
      </nav>
    </header>
  );
}

export default Header;
