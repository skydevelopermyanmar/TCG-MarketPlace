import React, { useReducer, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import CardList from './CardList';
const Home = () => {
  //for getting selected card
  const [selectedCard, setSelectedCard] = useState([]);
  //console.log(selectedCard);
  const selectedCardHandler = (data) => {
    setSelectedCard([...selectedCard, { eachCount: 1, ...data }]);
  };

  //for searching
  const [searchText, setSearchText] = useState('');

  //using useReducer hook for filter by price or set , rarity and type
  const filterReducer = (state, action) => {
    switch (action.type) {
      case 'SORT_BY_PRICE':
        return { ...state, byPrice: action.payload };
      case 'SORT_BY_RARITY':
        return { ...state, byRarity: action.payload };
      case 'SORT_BY_TYPE':
        return { ...state, byType: action.payload };
      default:
        return state;
    }
  };
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byType: '',
    byRarity: '',
    byPrice: '',
  });

  return (
    <>
      <Navbar />
      <Search
        setSearchText={setSearchText}
        searchText={searchText}
        filterDispatch={filterDispatch}
      />
      <CardList
        selectedCardHandler={selectedCardHandler}
        searchText={searchText}
        filterState={filterState}
      />
      <Footer selectedCard={selectedCard} onsetSelectedCard={setSelectedCard} />
    </>
  );
};

export default Home;
