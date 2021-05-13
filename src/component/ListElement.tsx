/* eslint-disable @typescript-eslint/ban-types */
import React, { CSSProperties } from 'react';
import { message } from 'antd';
import { useDispatch, connect } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import SongApi from '../util/songApi';
import { Container } from './BasicHTMLElement';
import { mapDispatchToProps, mapStateToProps } from '../store/dispatchBind';

const { songUrl } = SongApi();

const handleTime = (milliseconds: number) => {
  const time = milliseconds / 1000;
  const minutes = time / 60 < 10 ? `0${time / 60}` : time / 60;
  const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
  return `${parseInt(minutes.toString(), 10)}:${parseInt(
    seconds.toString(),
    10
  )}`;
};

const SelectItem = connect(
  null,
  mapDispatchToProps
)(
  (props: {
    isPlay: boolean;
    title: string;
    singer: string;
    id: string;
    spendTime: number;
    onChangeSong: Function;
    onPauseOrPlay: Function;
    onRemoveSong: Function;
  }) => {
    const { isPlay, title, singer, id, spendTime } = props;

    return (
      <Container
        onClick={async () => {
          await props.onChangeSong(id);
          props.onPauseOrPlay(true);
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundImage: 'linear-gradient(180deg, #ffe6e9, #ffb8c5)',
          margin: 25,
          marginLeft: '3rem',
          marginRight: '3rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignItems: 'baseline',
          }}
        >
          <div className="text-baseRed font-medium text-lg">{title}</div>
          <div className="m-2 text-baseRed">-</div>
          <div className="text-baseRed font-normal text-sm">{singer}</div>
          <div className="m-2 text-baseRed">{handleTime(spendTime)}</div>
          <div style={{ flexGrow: 1 }} />
          <DeleteOutlined
            onClick={() => {
              props.onRemoveSong(id);
            }}
            style={{
              color: '#D0104C',
              margin: 10,
              fontSize: 24,
              marginRight: 20,
              flexGrow: 0,
            }}
            className="transition duration-500 ease-in-out transform hover:scale-110"
          />
        </div>
      </Container>
    );
  }
);

const ListItem = connect(
  null,
  mapDispatchToProps
)(
  (props: {
    isPlay: boolean;
    title: string;
    singer: string;
    id: string;
    spendTime: number;
    onChangeSong: Function;
    onPauseOrPlay: Function;
    onRemoveSong: Function;
  }) => {
    const { isPlay, title, singer, id, spendTime } = props;

    return (
      <Container
        onClick={async () => {
          await props.onChangeSong(id);
          props.onPauseOrPlay(true);
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 25,
          marginLeft: '3rem',
          marginRight: '3rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignItems: 'baseline',
          }}
        >
          <div className="text-black font-medium text-lg">{title}</div>
          <div className="m-2">-</div>
          <div className="text-black font-normal text-sm">{singer}</div>
          <div className="m-2">{handleTime(spendTime)}</div>
          <div style={{ flexGrow: 1 }} />
          <DeleteOutlined
            onClick={() => {
              props.onRemoveSong(id);
            }}
            style={{
              color: '#D0104C',
              margin: 10,
              fontSize: 24,
              marginRight: 20,
              flexGrow: 0,
            }}
            className="transition duration-500 ease-in-out transform hover:scale-110"
          />
        </div>
      </Container>
    );
  }
);

export { SelectItem, ListItem };
