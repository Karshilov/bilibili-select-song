/* eslint-disable @typescript-eslint/ban-types */
import React, { CSSProperties } from 'react';
import { message } from 'antd';
import { useDispatch, connect } from 'react-redux';
import SongApi from '../util/songApi';
import { Container } from './BasicHTMLElement';
import { mapDispatchToProps, mapStateToProps } from '../store/dispatchBind';

const { songUrl } = SongApi();

const SelectItem = connect(
  null,
  mapDispatchToProps
)(
  (props: {
    isPlay: boolean;
    title: string;
    singer: string;
    id: string;
    onChangeSong: Function;
    onPauseOrPlay: Function;
  }) => {
    const { isPlay, title, singer, id } = props;

    return (
      <Container
        onClick={async () => {
          await props.onChangeSong(id);
          props.onPauseOrPlay(true);
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundImage: 'linear-gradient(to bottom, #ffe6e9, #ffb8c5)',
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
          <div className="m-2">-</div>
          <div className="text-baseRed font-normal text-sm">{singer}</div>
          <div style={{ flexGrow: 1 }} />
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
    onChangeSong: Function;
    onPauseOrPlay: Function;
  }) => {
    const { isPlay, title, singer, id } = props;

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
          <div style={{ flexGrow: 1 }} />
        </div>
      </Container>
    );
  }
);

export { SelectItem, ListItem };
