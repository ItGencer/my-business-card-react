import { useState } from "react";
import "./App.scss";
import Header from "./components/layout/header/header";
import Hero from "./components/hero/hero";
import AboutUs from "./components/about-us/about-us";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutUs />
      </main>
    </>
  );
}

export default App;
