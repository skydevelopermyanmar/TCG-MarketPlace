import {
  CheckOutlined,
  CloseOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import React, { useState, useContext } from 'react';
import { CountContext } from '../App';
import styled from 'styled-components';

import { mobile } from '../responsive';
//import SAMPLE from '../assets/images/1.png';
const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(255, 255, 255, 0.8) 89%
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ViewCart = styled.button`
  background-color: #158aff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 7px 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const Badge = styled.span`
  position: absolute;
  top: -5px;
  left: -7px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff3e3e;
  font-size: 10px !important;
  color: white;
  font-weight: bold;
`;
const IconWrapper = styled.span`
  & > * {
    font-size: 20px !important;
  }
  margin-right: 10px;
`;
const Modal = styled.div`
  z-index: 2;
  position: fixed;
  bottom: 50px;
  width: 20%;
  height: 600px;
  padding: 30px;
  border-radius: 6px;
  background-color: white;
  -webkit-box-shadow: 0px 8px 15px 4px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 8px 15px 4px rgba(0, 0, 0, 0.05);
  ${mobile({ width: '80%', height: '580px' })}
`;
const ModalItemWrapper = styled.div`
  height: 100%;
  margin-bottom: 500px;
  overflow: auto;
`;
const ModalItem = styled.div`
  height: auto;
  display: flex;
  margin-bottom: 30px;
`;
const ModalItemDetail = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-around;
  padding: 5px;
`;
const MIIWrapper = styled.div`
  width: 30%;
  height: 100px;
`;
const ModalItemImage = styled.img`
  width: 100%;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const ModalItemPrice = styled.span`
  color: gray;
`;
const ModalItemName = styled.span`
  font-size: 1.3em;
  font-weight: bold;
`;
const ModalItemAvailable = styled.span`
  margin-top: 25px;
  color: lightgray;
`;
const PriceCalculate = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PCCount = styled.span`
  display: flex;
  align-items: center;
  color: #158aff;
  font-weight: bold;
`;
const Count = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    font-size: 15px !important;
    margin-left: 5px;
  }
`;
const PCPrice = styled.span`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalFooter = styled.div`
  width: 100%;
  position: absolute;
  bottom: -15px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.8) 9%,
    rgba(255, 255, 255, 1) 86%,
    rgba(255, 255, 255, 0) 5%
  );
`;
const ClearAll = styled.button`
  text-decoration: underline;
  padding: 10px 20px;
  margin: 20px 0;
  border: none;
  background: none;
  cursor: pointer;
`;
const TotalCards = styled.span`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1em;
`;
const TotalPrice = styled.span`
  margin-bottom: 20px;
  display: flex;
  align-items: left;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.3em;
`;
const PayNow = styled.button`
  padding: 10px 50px;
  border: none;
  border-radius: 25px;
  background-color: #158aff;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
`;
const Close = styled.button`
  padding: 5px;
  margin-top: 15px;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
`;
const Action = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PaymentSuccess = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  margin-bottom: 30px;
`;
const SuccessIcon = styled.span`
  padding: 5px 10px;
  background: #51ff51;
  border-radius: 50%;
  & > * {
    font-size: 3em !important;
    font-weight: bold;
    color: white;
  }
`;
const Footer = ({ selectedCard, onsetSelectedCard }) => {
  const [
    countBadge,
    setcountBadge,
    totalCards,
    setTotalCards,
    totalPrice,
    setTotalPrice,
  ] = useContext(CountContext);
  const [showModal, setShowModal] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  //to clearn all data from Modal cart lists
  const cleanHandler = () => {
    setcountBadge(0);
    onsetSelectedCard([]);
    setTotalCards(0);
    setTotalPrice(0);
  };

  //to close modal box and payment success handling
  const closeHandler = () => {
    setShowModal(false);
    if (paySuccess) {
      setPaySuccess(false);
    }
  };
  //to get each card plus and total card
  const plusHandler = (card) => {
    const exist = selectedCard.find((x) => x.id === card.id);
    if (exist) {
      onsetSelectedCard(
        selectedCard.map((x) =>
          x.id === card.id ? { ...exist, eachCount: exist.eachCount + 1 } : x
        )
      );
    }
    setTotalCards(totalCards + 1);
    setTotalPrice(totalPrice + exist.cardmarket.prices.averageSellPrice);
  };
  //to get each card minus and total card
  const minusHandler = (scard) => {
    const exist = selectedCard.find((x) => x.id === scard.id);
    if (exist) {
      onsetSelectedCard(
        selectedCard.map((x) =>
          x.id === scard.id ? { ...exist, eachCount: exist.eachCount - 1 } : x
        )
      );
    }
    setTotalCards(totalCards - 1);
    setTotalPrice(totalPrice - exist.cardmarket.prices.averageSellPrice);
  };

  //payment success
  const paySuccessHandler = () => {
    cleanHandler();
    setPaySuccess(true);
  };
  return (
    <Container>
      {showModal === false ? (
        <ViewCart onClick={() => setShowModal(true)}>
          <Badge>{countBadge}</Badge>
          <IconWrapper>
            <ShoppingCartOutlined />
          </IconWrapper>
          View cart
        </ViewCart>
      ) : (
        <Modal>
          <ModalItemWrapper>
            {/*all selected cards */}
            {selectedCard.map((sCard) => (
              <ModalItem key={sCard.id}>
                <ModalItemDetail>
                  <MIIWrapper>
                    <ModalItemImage src={sCard.images.small} />
                  </MIIWrapper>
                  <Info>
                    <ModalItemName>{sCard.name}</ModalItemName>
                    <ModalItemPrice>
                      $ {sCard.cardmarket.prices.averageSellPrice} per card
                    </ModalItemPrice>
                    <ModalItemAvailable>
                      <b style={{ color: 'red' }}>{sCard.set.total}</b> cards
                      left
                    </ModalItemAvailable>
                  </Info>
                </ModalItemDetail>
                <PriceCalculate>
                  <PCCount>
                    {sCard.eachCount}
                    <Count>
                      {sCard.eachCount < sCard.set.total && (
                        <KeyboardArrowUpOutlined
                          onClick={() => plusHandler(sCard)}
                        />
                      )}
                      {sCard.eachCount > 0 && (
                        <KeyboardArrowDownOutlined
                          onClick={() => minusHandler(sCard)}
                        />
                      )}
                    </Count>
                  </PCCount>
                  <PCPrice>
                    price <br />
                    <b style={{ fontWeight: 'bold', color: '#158aff' }}>
                      ${' '}
                      {sCard.cardmarket.prices.averageSellPrice *
                        sCard.eachCount}
                    </b>
                  </PCPrice>
                </PriceCalculate>
              </ModalItem>
            ))}
          </ModalItemWrapper>
          <ModalFooter>
            {!paySuccess ? (
              <Action>
                <ClearAll onClick={() => cleanHandler()}>Clear all</ClearAll>
                <TotalCards>
                  Total cards{' '}
                  <b
                    style={{
                      fontWeight: 'bold',
                      color: 'red',
                      marginLeft: '30px',
                    }}
                  >
                    {totalCards}
                  </b>
                </TotalCards>
                <TotalPrice>
                  Total price{' '}
                  <b
                    style={{
                      fontWeight: 'bold',
                      color: 'red',
                      marginLeft: '30px',
                    }}
                  >
                    $ {totalPrice}
                  </b>
                </TotalPrice>
                <PayNow onClick={() => paySuccessHandler()}>Pay Now</PayNow>
              </Action>
            ) : (
              <PaymentSuccess>
                <SuccessIcon>
                  <CheckOutlined />
                </SuccessIcon>{' '}
                Payment success!
              </PaymentSuccess>
            )}

            <Close onClick={() => closeHandler()}>
              <CloseOutlined />
            </Close>
          </ModalFooter>
        </Modal>
      )}
    </Container>
  );
};

export default Footer;
