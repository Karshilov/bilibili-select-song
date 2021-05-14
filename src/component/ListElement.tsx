/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  DeleteOutlined,
  PauseOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
import { configConsumerProps } from 'antd/lib/config-provider';
import { Container, Layer } from './BasicHTMLElement';
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
    songs: Array<any>;
    song: any;
  }) => {
    const { title, singer, id, spendTime } = props;
    const iconStyle: React.CSSProperties = {
      color: '#D0104C',
      margin: 10,
      fontSize: 24,
      marginRight: 20,
      flexGrow: 0,
    };
    const ref = useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const onStepSong = (
      currentSongId: number | undefined = undefined,
      next = true
    ) => {
      if (!currentSongId) {
        // eslint-disable-next-line no-param-reassign
        currentSongId = props.songs.findIndex(
          (item) => item.id === props.song.id
        );
      }
      const step = next ? 1 : -1;
      const nextSong = props.songs[currentSongId + step];
      if (!nextSong) return message.info('歌单已清空');
      props
        .onChangeSong(nextSong.id)
        .then((res: any) => {
          if (!res) onStepSong(currentSongId ? ++currentSongId : 0, next);
          return true;
        })
        .catch((err: any) => {
          message.error(err);
        });
    };

    useEffect(() => {
      const audio = ref.current;
      if (audio) {
        audio.onended = () => {
          onStepSong();
        };
        audio.onpause = () => {
          props.onPauseOrPlay(false);
        };
        audio.onplay = () => {
          setDuration(audio.duration);
          console.log(audio.duration, audio.currentTime, audio.src);
          props.onPauseOrPlay(true);
        };
        audio.ontimeupdate = () => {
          console.log(currentTime);
          setCurrentTime(audio.currentTime);
        };
      }
    }, []);

    return (
      <Container
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
          <audio src={props.song.url} ref={ref} autoPlay />
          <div className="text-baseRed font-medium text-lg">{title}</div>
          <div className="m-2 text-baseRed">-</div>
          <div className="text-baseRed font-normal text-sm">{singer}</div>
          <div className="m-2 text-baseRed">{handleTime(spendTime)}</div>
          <div style={{ flexGrow: 1 }} />
          {props.isPlay ? (
            <PauseOutlined
              onClick={() => {
                if (ref.current) {
                  ref.current.pause();
                }
              }}
              style={iconStyle}
              className="transition duration-500 ease-in-out transform hover:scale-110"
            />
          ) : (
            <PlayCircleOutlined
              onClick={async () => {
                if (ref.current) {
                  const audio = ref.current;
                  console.log(props.song);
                  const res = audio.play();
                  if (res) {
                    res.catch((err) => {
                      audio.play();
                    });
                  }
                }
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
        <Layer
          style={{
            left: `${parseInt(
              ((currentTime * 100) / duration).toString(),
              10
            )}%`,
          }}
        >
          <div
            style={{
              height: '100%',
              width: 2,
              background: '#F8F2F8',
              boxShadow: '6px 0px 4px #FFF',
            }}
          />
        </Layer>
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
    songs: Array<any>;
    song: any;
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
