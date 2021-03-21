import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Basement, Layer, Board } from '../component/BasicHTMLElement';
import EmptyAvatar from '../../assets/empty-avatar.png';

const Login = () => {
  const [roomId, setRoomId] = useState('');
  const dispatch = useDispatch();
  const bothMiddle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const login = (value: string) => {
    dispatch({ type: 'user', payload: value });
    dispatch({ type: 'login' });
  };

  return (
    <Basement>
      <Board
        style={{
          ...bothMiddle,
          background: '#F8F2F8',
          flexDirection: 'column',
        }}
      >
        <img src={EmptyAvatar} alt="" width={75} className="m-4" />
        <div
          style={{
            ...bothMiddle,
            flexDirection: 'row',
          }}
        >
          <div className="text-black font-mono text-lg m-3">Room ID</div>
          <input
            className="shadow-md border-b-2 outline-none text-black cursor-auto"
            style={{ height: 32, width: 200 }}
            value={roomId}
            onChange={onChange}
          />
        </div>
        <button
          type="button"
          className="bg-transparent hover:bg-baseRed text-baseRed font-semibold hover:text-white py-2 px-4 border border-baseRed hover:border-transparent rounded m-3"
          onClick={() => {
            login(roomId);
          }}
        >
          确认
        </button>
      </Board>
    </Basement>
  );
};

export default Login;
