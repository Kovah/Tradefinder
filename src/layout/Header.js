import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, selectCount } from '../features/trading/tradingSlice';

export function Header () {
  const trading = useSelector(selectCount);
  const dispatch = useDispatch();
  console.log(trading); //@DEBUG

  return (
    <h1 className="text-2xl text-center uppercase tracking-widest" onClick={() => dispatch(increment())}>
      Tradefinder <span>{trading.value}</span>
    </h1>
  )
}
