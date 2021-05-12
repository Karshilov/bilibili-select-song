import React, { CSSProperties } from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import SongApi from '../util/songApi';
import { Container } from './BasicHTMLElement';

const { songUrl } = SongApi();

export const SelectItem = (props: {
  isPlay: boolean;
  title: string;
  singer: string;
  id: string;
}) => {
  const { isPlay, title, singer, id } = props;
  const dispatch = useDispatch();
  const onChangeSong = async (val: string) => {
    const song = await songUrl(val)
      .then((result: any) => result.data.data[0])
      .catch((err: any) => console.log(err));
    // 歌曲权限不足时，URL为空
    if (!song || !song.url) {
      message.error('此歌曲无权播放╮(￣▽￣"")╭');
      return false;
    }
    dispatch({ type: 'changeSong', payload: song });
    return true;
  };

  const onRemoveSong = (val: string) => {
    dispatch({ type: 'removeSong', payload: val });
  };

  const onPauseOrPlay = (status: boolean) => {
    dispatch({ type: 'setIsPlay', payload: status });
  };

  return (
    <Container
      onClick={async () => {
        await onChangeSong(id);
        onPauseOrPlay(true);
      }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundImage: 'linear-gradient(to top, #ffe6e9, #ffb8c5)',
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
};

export const ListItem = (props: {
  isPlay: boolean;
  title: string;
  singer: string;
  id: string;
}) => {
  const { isPlay, title, singer, id } = props;
  const dispatch = useDispatch();
  const onChangeSong = async (val: string) => {
    const song = await songUrl(val)
      .then((result: any) => result.data.data[0])
      .catch((err: any) => console.log(err));
    // 歌曲权限不足时，URL为空
    if (!song || !song.url) {
      message.error('此歌曲无权播放╮(￣▽￣"")╭');
      return false;
    }
    dispatch({ type: 'changeSong', payload: song });
    return true;
  };

  const onRemoveSong = (val: string) => {
    dispatch({ type: 'removeSong', payload: val });
  };

  const onPauseOrPlay = (status: boolean) => {
    dispatch({ type: 'setIsPlay', payload: status });
  };
  return (
    <Container
      onClick={async () => {
        await onChangeSong(id);
        onPauseOrPlay(true);
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
};
