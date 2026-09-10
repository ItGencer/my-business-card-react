import { useState } from "react";
import "./App.scss";
import Header from "./components/layout/header/header";
import Hero from "./components/hero/hero";
import AboutUs from "./components/about-us/about-us";
import Skills from "./components/skils/skills";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <Skills />
      </main>
    </>
  );
}

export default App;
