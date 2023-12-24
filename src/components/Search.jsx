import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
const Container = styled.div`
  padding: 50px;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ marginTop: '200px', padding: '50px 20px' })}
`;
const SearchWrapper = styled.div`
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ display: 'flex', flexDirection: 'column' })}
`;
const SearchText = styled.input`
  ::placeholder {
    color: lightgray;
  }
  font-weight: 100;
  padding: 11px 8px;
  padding-left: 25px;
  border: none;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  box-shadow: 3px 5px 15px 1px rgba(0, 0, 0, 0.08);
  ${mobile({
    borderRadius: '20px',
    width: '100%',
    textAlign: 'center',
    marginBottom: '10px',
  })}
`;
const SearchType = styled.select`
  color: lightgray;
  font-weight: 200;
  padding: 10px 4px;
  margin-left: 2px;
  border: none;
  border-top-right-radius: ${(props) =>
    props.itemType === 'rightmost' ? '20px' : ''};
  border-bottom-right-radius: ${(props) =>
    props.itemType === 'rightmost' ? '20px' : ''};
  box-shadow: 3px 5px 15px 1px rgba(0, 0, 0, 0.08);
  ${mobile({ display: 'flex', width: '30%', borderRadius: '20px' })}
`;
const SearchTypeWrapper = styled.div`
  ${mobile({
    width: '100%',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'space-between',
  })}
`;
const TypeItem = styled.option`
  font-weight: 200;
`;
const Search = ({ searchText, setSearchText, filterDispatch }) => {
  return (
    <Container>
      <SearchWrapper>
        <SearchText
          type="text"
          placeholder="Name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SearchTypeWrapper>
          <SearchType
            onChange={(e) =>
              filterDispatch({ type: 'SORT_BY_TYPE', payload: e.target.value })
            }
          >
            <TypeItem>Type</TypeItem>
            <TypeItem value="ascending">Asc</TypeItem>
            <TypeItem value="descending">Desc</TypeItem>
          </SearchType>
          <SearchType
            onChange={(e) =>
              filterDispatch({
                type: 'SORT_BY_RARITY',
                payload: e.target.value,
              })
            }
          >
            <TypeItem>Rarity</TypeItem>
            <TypeItem value="ascending">Asc</TypeItem>
            <TypeItem value="descending">Desc</TypeItem>
          </SearchType>
          <SearchType
            itemType={'rightmost'}
            onChange={(e) =>
              filterDispatch({ type: 'SORT_BY_PRICE', payload: e.target.value })
            }
          >
            <TypeItem>Set</TypeItem>
            <TypeItem value="lowtohigh">Low to High</TypeItem>
            <TypeItem value="hightolow">High to Low</TypeItem>
          </SearchType>
        </SearchTypeWrapper>
      </SearchWrapper>
    </Container>
  );
};

export default Search;
