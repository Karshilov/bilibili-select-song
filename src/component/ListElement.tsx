/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  DeleteOutlined,
  PauseOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Container } from './BasicHTMLElement';
import { mapDispatchToProps, mapStateToProps } from '../store/dispatchBind';
import { StoreState } from '../store';

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
  mapStateToProps,
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
    const { title, singer, id, spendTime } = props;
    const iconStyle: React.CSSProperties = {
      color: '#D0104C',
      margin: 10,
      fontSize: 24,
      marginRight: 20,
      flexGrow: 0,
    };
    const { song, isPlay } = useSelector((state: StoreState) => state);
    const ref = useRef<HTMLAudioElement>(null);

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
          marginLeft: '1rem',
          marginRight: '1rem',
        }}
        bodyStyle={{ width: '100%', position: 'relative', height: '100%' }}
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
          {isPlay ? (
            <PauseOutlined
              onClick={() => {
                props.onPauseOrPlay(!isPlay);
              }}
              style={iconStyle}
              className="transition duration-500 ease-in-out transform hover:scale-110"
            />
          ) : (
            <PlayCircleOutlined
              onClick={() => {
                props.onPauseOrPlay(!isPlay);
              }}
              style={iconStyle}
              className="transition duration-500 ease-in-out transform hover:scale-110"
            />
          )}
          <DeleteOutlined
            onClick={() => {
              props.onRemoveSong(id);
            }}
            style={iconStyle}
            className="transition duration-500 ease-in-out transform hover:scale-110"
          />
        </div>
        <audio src={song.url} ref={ref} />
      </Container>
    );
  }
);

const ListItem = connect(
  mapStateToProps,
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
    const { title, singer, id, spendTime } = props;

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
          marginLeft: '1rem',
          marginRight: '1rem',
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
