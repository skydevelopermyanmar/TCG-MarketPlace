import React from 'react';
import styled from 'styled-components';
import LOGO from '../assets/images/logo.png';

// for responsive mobile
import { mobile } from '../responsive';

//creating react elments with styled-components
const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 0px 8px 15px 4px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 8px 15px 4px rgba(0, 0, 0, 0.05);
  z-index: 1;
  ${mobile({ height: '150px' })}
`;
const Title = styled.h1`
  padding-top: 30px;
`;
const LogoWrapper = styled.div`
  width: 100px;
  height: 50px;
`;
const Logo = styled.img`
  width: 100%;
  height: 100%;
`;
const Navbar = () => {
  return (
    <Container>
      <Title>TCG Marketplace</Title>
      <LogoWrapper>
        <Logo src={LOGO} />
      </LogoWrapper>
    </Container>
  );
};

export default Navbar;
