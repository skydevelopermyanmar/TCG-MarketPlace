import { Search } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

import { mobile } from '../responsive';

// Creating React Element with Styled-components
const Container = styled.div`
  padding: 20px 20px;
  width: 60%;
  height: auto;
  margin: auto;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({ width: '80%' })}
`;
const CardListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  ${mobile({
    width: '100%',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  })}
`;
const ShowMore = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const Icon = styled.span`
  & > * {
    font-size: 15px !important;
  }
  margin-right: 3px;
`;
const CardList = ({ searchText, selectedCardHandler, filterState }) => {
  //Calling UseState to get Data from API

  // limit pages at first
  const perPage = 12;
  const [page, setPage] = useState(1);
  const [totoalPages, setTotoalPages] = useState(1);

  //geathering data of cards from API
  const [cardList, setCardList] = useState([]);

  // to wait to get data from API
  const [loading, setLoading] = useState(false);

  //use useEffect hook to get data at page fist-loading
  useEffect(() => {
    setLoading(true);
    const getCards = () => {
      axios
        .get(
          `https://api.pokemontcg.io/v2/cards?pageSize=${perPage}&page=${page}`
        )
        .then((response) => {
          //set page total from API to know how many pages
          setTotoalPages(response.data.pageSize);

          //set data to cardList array
          setCardList([...cardList, ...response.data.data]);

          //after getting data ,set loading to false
          setLoading(false);
        });
    };
    getCards();
  }, [perPage, page]);

  //filtering for Search Text
  const filterCards = () => {
    let sortedCards = cardList;
    if (searchText) {
      sortedCards = cardList.filter((card) => {
        if (searchText === '') {
          return card;
        } else if (card.name.toLowerCase().includes(searchText.toLowerCase())) {
          return card;
        }
      });
    }
    //filtering by price
    if (filterState.byPrice !== '') {
      sortedCards = cardList.sort((a, b) =>
        filterState.byPrice === 'lowtohigh'
          ? a.cardmarket.prices.averageSellPrice -
            b.cardmarket.prices.averageSellPrice
          : b.cardmarket.prices.averageSellPrice -
            a.cardmarket.prices.averageSellPrice
      );
    }
    //filtering by types
    if (filterState.byType !== '') {
      sortedCards = cardList.sort((a, b) =>
        filterState.byType === 'ascending'
          ? a.types - b.types
          : b.types - a.types
      );
    }
    //filtering by rarity
    if (filterState.byRarity !== '') {
      sortedCards = cardList.sort((a, b) =>
        filterState.byRarity === 'descending'
          ? a.rarity - b.rarity
          : b.rarity - a.rarity
      );
    }
    return sortedCards;
  };
  return (
    <Container>
      <CardListWrapper>
        {/*Iteration cards */}
        {filterCards().map((card) => (
          <Card
            card={card}
            key={card.id}
            selectedCardHandler={selectedCardHandler}
          />
        ))}
      </CardListWrapper>
      {totoalPages !== page && (
        <ShowMore onClick={() => setPage(page + 1)}>
          <Icon>
            <Search />
          </Icon>
          {loading ? 'Showing ...' : 'show more'}
        </ShowMore>
      )}
    </Container>
  );
};

export default CardList;
