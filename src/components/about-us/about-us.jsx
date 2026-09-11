import React from "react";
import "./about-us.scss";

const AboutUs = () => {
  return (
    <section className="about-us" id="about">
      <div className="about-us__container">
        <div className="about-us__container__header">
          <h2 className="about-us__container__header__title">Про мене</h2>
          <span></span>
        </div>
        <div className="about-us__container__text">
          <p className="about-us__container__text__intro">
            Вітаю! Роблю сайти-візитки та односторінкові сайти (SPA) для малого
            бізнесу та фахівців 🚀
          </p>

          <div className="about-us__container__text__doing">
            <h3 className="about-us__container__text__doing__title">
              Що я роблю:
            </h3>
            <ul className="about-us__container__text__doing__list">
              <li>Сайт‑візитка / лендинг під ваші послуги</li>
              <li>Чиста верстка: HTML5, CSS3, SCSS, JS/TypeScript</li>
              <li>Адаптивність під телефон і ПК</li>
              <li>Допоможу розмістити сайт на хостингу</li>
            </ul>
          </div>

          <div className="about-us__container__text__doing">
            <h3 className="about-us__container__text__doing__title ">Як працюю:</h3>
            <ol className="about-us__container__text__doing__list" id="ol-list">
              <li>Обговорюємо задачу та ваші побажання</li>
              <li>Узгоджуємо деталі та ціну</li>
              <li>Верстаю сайт з нуля, вношу правки за потреби</li>
            </ol>
          </div>

          <div className="about-us__container__text__price">
            <p>
              💰 Ціна від 500 грн — працюю на портфоліо та відгуки, тому по-чесному дешево. Включено: макет, верстка, адаптив під девайси. Можна домовитись під ваш бюджет.
            </p>
            <a href="#contact">
              Зв'язатися
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
