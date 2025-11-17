import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { store } from './index';

export const useAppDispatch = () => useDispatch();

export const useAppSelector = (selector) => {
  const memoizedSelector = useMemo(() => selector, [selector]);
  return useSelector(memoizedSelector);
};

export const { dispatch: appDispatch } = store;


