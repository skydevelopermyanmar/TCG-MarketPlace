import React, { useContext, useState } from 'react';
import { CountContext } from '../App';
import styled from 'styled-components';
// import SAMPLE from '../assets/images/1.png';

import { mobile } from '../responsive';

const Container = styled.div`
  width: 23%;
  height: 150px;
  padding: 20px;
  margin-top: 230px;
  margin-bottom: 100px;
  border-radius: 10px;
  background-color: white;
  -webkit-box-shadow: 0px 8px 15px 4px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 8px 15px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: visible;
  clear: both;
  ${mobile({
    width: '70%',
    height: '120px',
    marginLeft: '0',
    marginRight: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  })}
`;
const CardImageWrapper = styled.div`
  position: absolute;
  top: -230px;
  left: -5;
  width: 200px;
  height: 280px;
  ${mobile({ position: 'absolute', top: '-200px', left: '45px' })}
`;
const CardImage = styled.img`
  width: 100%;
  ${mobile({ width: '80%' })}
`;
const CardName = styled.span`
  font-size: 1.3em;
  font-weight: bold;
  margin-top: 35px;
  ${mobile({ marginTop: '5px' })}
`;
const CardRarity = styled.span`
  color: blue;
`;
const CardValue = styled.div`
  padding: 10px;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2em;
  font-weight: 600;
  color: gray;
`;
const CardAvailable = styled.span``;
const CardPrice = styled.span``;
const CardButton = styled.button`
  position: absolute;
  bottom: -15px;
  padding: 10px 50px;
  border: none;
  border-radius: 25px;
  background-color: ${(porps) =>
    porps.value === 'Select card' ? 'gold' : 'black'};
  color: ${(porps) => (porps.value === 'Select card' ? 'black' : 'white')};
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
`;

const Card = ({ card, selectedCardHandler }) => {
  const [
    countBadge,
    setcountBadge,
    totalCards,
    setTotalCards,
    totalPrice,
    setTotalPrice,
  ] = useContext(CountContext);
  const [selected, setSelected] = useState('Select card');
  const selectEvent = (value, card) => {
    setSelected(value);
    selectedCardHandler(card);
    setcountBadge(countBadge + 1);
    setTotalCards(totalCards + 1);
    setTotalPrice(totalPrice + card.cardmarket.prices.averageSellPrice);
  };
  return (
    <Container>
      <CardImageWrapper>
        <CardImage src={card.images.small} />
      </CardImageWrapper>
      <CardName>{card.name}</CardName>
      <CardRarity>{card.rarity}</CardRarity>
      <CardValue>
        <CardPrice>$ {card.cardmarket.prices.averageSellPrice}</CardPrice>
        <CardAvailable>{card.set.total} left</CardAvailable>
      </CardValue>
      <CardButton
        value={selected}
        onClick={() => selectEvent('Selected', card)}
      >
        {selected}
      </CardButton>
    </Container>
  );
};

export default Card;
