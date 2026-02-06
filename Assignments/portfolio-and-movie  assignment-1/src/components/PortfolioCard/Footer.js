import "./Footer.css";
import {
  FaRegHeart as FaHeart,
  FaRegEnvelope as FaEmail,
  FaMoon,
  FaSun,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

function Footer(props) {
  return (

    <div className="footer-container">
      <div className="footer-content">

        <div className="theme-toggle">
          <button onClick={props.toggleDark} className={props.isDark ? "btn-dark" : "btn-light"}>
          {props.isDark ?  <FaSun /> :<FaMoon />}
          {props.isDark ? "Light" : "Dark"}
          </button>
        </div>

        <div className="tabs">
          <FaChevronLeft onClick={props.prevPage} />
          <span className="page">{props.page} / 4</span>
          <FaChevronRight  onClick={props.nextPage}/>
        </div>

        <div className={`likes ${props.isDark ? "dark" : "light"}`}>
          <button onClick={props.toggleLike} className={props.isLiked ? "red-heart" : ""}>
            <FaHeart style={{ color: props.isLiked ? "red" : "" }}/>
            </button>
          <span className="likes-count">{props.likes}</span>
        </div>

        <button
          className="contact-btn"
          onClick={() => alert("Thanks for contact!")}
        >
          <FaEmail />
          Contact
        </button>

      </div>
    </div>
  );
}

export default Footer;
