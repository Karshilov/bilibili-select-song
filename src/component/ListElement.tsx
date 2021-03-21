import React, { CSSProperties } from 'react';
import { Container } from './BasicHTMLElement';
import SongActions from '../util/onAction';

const { onChangeSong, onRemoveSong, onPauseOrPlay } = SongActions();

export const ListItem = (props: {
  isPlay: boolean;
  title: string;
  singer: string;
  order: string;
  url: string;
  id: string;
}) => {
  const { isPlay, title, singer, order, url, id } = props;
  return (
    <Container
      onClick={async () => {
        await onChangeSong(id);
        onPauseOrPlay(true);
      }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundImage: 'linear-gradient(to bottom right, #ffe6e9, #ffb8c5)',
      }}
    >
      <div className="text-baseRed font-medium text-lg">{title}</div>
      <div className="m-2">-</div>
      <div className="text-baseRed font-normal text-sm">{singer}</div>
      <div style={{ flexGrow: 1 }} />
      <div className="text-baseRed font-normal text-sm">{`Order by ${order}`}</div>
    </Container>
  );
};

export const SelectItem = (props: {
  isPlay: boolean;
  title: string;
  singer: string;
  order: string;
  url: string;
  id: string;
}) => {
  const { isPlay, title, singer, order, url, id } = props;
  return (
    <Container
      onClick={async () => {
        await onChangeSong(id);
        onPauseOrPlay(true);
      }}
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div className="text-black font-medium text-lg">{title}</div>
      <div className="m-2">-</div>
      <div className="text-black font-normal text-sm">{singer}</div>
      <div style={{ flexGrow: 1 }} />
      <div className="text-black font-normal text-sm">{`Order by ${order}`}</div>
    </Container>
  );
};
