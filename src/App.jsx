import { useState } from "react";
import "./App.scss";
import Header from "./components/layout/header/header";
import Hero from "./components/hero/hero";
import AboutUs from "./components/about-us/about-us";
import Skills from "./components/skils/skills";
import Services from "./components/services/services";
import Contact from "./components/contact/contact";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <Skills />
        <Services />
        <Contact />
      </main>
    </>
  );
}

export default App;
