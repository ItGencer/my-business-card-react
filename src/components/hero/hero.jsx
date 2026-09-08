import React from "react";
import "./hero.scss";
import photo from "../../assets/Artem-foto.webp";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__text">
          <p className="hero__text__name">Frontend Developer · React</p>
          <h1 className="hero__text__title">Front-end Developer</h1>
          <p className="hero__text__subtitle">Відповідальний підхід — якісний результат</p>
          <div className="hero__text__socials">
          <a className="hero__text__cta" href="#portfolio" rel="noopener noreferrer">
           Переглянути роботи
          </a>
            <a className="hero__text__socials__link" href="#contact" rel="noopener noreferrer">
                Зв'язатися
            </a>
            </div>
        </div>
        <div className="hero__photo">
          <img src={photo} alt="Artem" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
