import React, { useState } from 'react';
import Home from './pages/Home';
export const CountContext = React.createContext();
function App() {
  const [countBadge, setcountBadge] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [start, setStart] = useState(false);
  return (
    <CountContext.Provider
      value={[
        countBadge,
        setcountBadge,
        totalCards,
        setTotalCards,
        totalPrice,
        setTotalPrice,
        setStart,
      ]}
    >
      <Home />
    </CountContext.Provider>
  );
}

export default App;
