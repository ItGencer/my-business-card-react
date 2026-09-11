import React from "react";
import "./skills.scss";
import html5 from  '../../assets/icon/html5.svg';
import sass from '../../assets/icon/sass.svg';
import js from  '../../assets/icon/js.svg';
import ts from '../../assets/icon/ts.svg';
import gitHub from  '../../assets/icon/github.svg';
import angular from '../../assets/icon/angular.svg';
import bem from '../../assets/icon/bem.svg';
import SkillCard from "../elements/skill-card/skill-card";

const skills = [
  { label: "HTML5 / CSS3", icon: html5 },
  { label: "SASS / SCSS", icon: sass },
  { label: "JavaScript", icon: js },
  { label: "TypeScript", icon: ts },
  { label: "GitHUB", icon: gitHub },
  { label: "Angular", icon: angular },
  { label: "BEM", icon: bem },
];

function Skills() {
  return (
    <section className="skils">
      <div className="skils__container">
        <div className="skils__container__header">
          <h2 className="skils__container__title">Навички та технології</h2>
          <span />
        </div>

        <ul className="skils__container__grid">
          {skills.map((elem, index) => (
            <li key={index}>
                <SkillCard data = {elem}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Skills;