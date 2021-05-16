/* eslint-disable promise/always-return */
/* eslint-disable react/require-default-props */
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { StoreState } from '../store';
import Login from '../view/Login';

interface Props {
  children?: React.ReactNode;
}

const AuthGuard: React.FC<Props> = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'clearAll' });
  }, []);

  // 获取登录状态
  const { isLogin } = useSelector((state: StoreState) => state);

  return <>{isLogin ? children : <Login />}</>;
};

export default AuthGuard;
