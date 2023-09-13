import React from "react";
import "./index.scss";
import face from "../../assets/social-icons/face.png";
import insta from "../../assets/social-icons/insta.png";
import wpp from "../../assets/social-icons/wpp.png";

const Header = () => {
  function toggleMobileMenu() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
  }

  return (
    <div className="Header">
      <header>
        <h2>Template</h2>
        <button className="btnMobile" onClick={toggleMobileMenu}>
          ☰
        </button>
        <nav>
          <button className="btnMobile" onClick={toggleMobileMenu}>
            ✕
          </button>
          <a className="active">Home</a>
          <a>Quem Sou</a>
          <a>Atuação</a>
          <a>Contato</a>
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
        </nav>
      </header>
    </div>
  );
};

export default Header;
