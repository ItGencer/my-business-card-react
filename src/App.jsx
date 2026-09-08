import { useState } from "react";
import "./App.scss";
import Header from "./components/layout/header/header";
import Hero from "./components/hero/hero";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}

export default App;
