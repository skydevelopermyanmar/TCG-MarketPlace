import { useReducer } from 'react';
import { filterReducer } from './FilterReducer';

const FilterContext = () => {
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byType: '',
    byRarity: '',
    byPrice: '',
  });
  return { filterState, filterDispatch };
};

export default FilterContext;
