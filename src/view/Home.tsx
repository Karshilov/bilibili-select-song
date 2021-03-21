/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KeepLiveWS } from 'bilibili-live-ws';
import { Basement, Layer, Board } from '../component/BasicHTMLElement';
import { StoreState } from '../store';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: StoreState) => state);

  useEffect(() => {
    const live = new KeepLiveWS(parseInt(user.roomId));
    live.on('open', () => {
      console.log('连接成功');
    });
    live.on('live', () => {
      live.on('heartbeat', console.log);
    });
    live.on('msg', (data) => {
      console.log(data);
    });
    return () => {
      live.close();
    };
  }, [user?.roomId]);

  return (
    <button
      type="button"
      onClick={() => {
        dispatch({ type: 'logout' });
      }}
    >
      退出
    </button>
  );
};

export default Home;
