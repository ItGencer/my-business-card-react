import { useState } from 'react';
import './App.scss';
import Header from './components/layout/header/header';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Header />
  )
}

export default App;