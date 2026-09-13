import React from "react";
import "./services.scss";
import iconCode from '../../assets/icon/code.svg';
import iconDoc from '../../assets/icon/doc.svg';
import iconConsole from '../../assets/icon/console.svg';
import ServiceCard from "../elements/service-card/service-card";

const services = [
  {
    title: "Односторінкові сайти (SPA)",
    text: "Швидкі, інтерактивні застосунки з плавною навігацією та сучасним UX.",
    price: "від 500 грн",
    icon: iconCode,
  },
  {
    title: "Сайти-візитки",
    text: "Лаконічні сайти-візитки, що підкреслюють вашу професійну ідентичність.",
    price: "від 500 грн",
    icon: iconDoc,
    badge: "Популярний вибір",
  },
  {
    title: "Індивідуальний проект",
    text: "Нестандартний запит або складніший функціонал? Обговоримо й розробимо рішення під ваші задачі.",
    price: "від 500 грн",
    icon: iconConsole,
  },
];

function Services() {
  return (
    <section className="services">
      <div className="services__container">
        <div className="services__container__header">
          <h2 className="services__container__header__title">Послуги</h2>
          <span />
        </div>

        <ul className="services__container__grid">
          {services.map((element, index) => (
            <li key={index}>
             <ServiceCard data={element}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Services;
