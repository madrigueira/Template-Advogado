import React from "react";
import "./index.scss";
import face from "../../assets/social-icons/face.png";
import insta from "../../assets/social-icons/insta.png";
import wpp from "../../assets/social-icons/wpp.png";

const Header = () => {
  return (
    <div className="Header">
      <header>
        <h2>Template</h2>
        <nav>
          <a className="active">Home</a>
          <a>Quem Sou</a>
          <a>Atuação</a>
          <a>Contato</a>
        </nav>
        <div className="social-network">
          <a href="#">
            <img src={face} alt="Facebook" />
          </a>
          <a href="#">
            <img src={insta} alt="Instagram" />
          </a>
          <a href="#">
            <img src={wpp} alt="Whatsapp" />
          </a>
        </div>
      </header>
    </div>
  );
};

export default Header;
