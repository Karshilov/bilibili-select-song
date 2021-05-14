/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { KeepLiveWS } from 'bilibili-live-ws';
import { LogoutOutlined, ClearOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import {
  Basement,
  Layer,
  Board,
  Container,
} from '../component/BasicHTMLElement';
import { StoreState } from '../store';
import leftBg from '../../assets/left-bg.jpg';
import { DanmuModel } from '../util/DataModel';
import { CommonDanmu, SelectDanmu } from '../component/DanmuElement';
import { useApi } from '../util/api';
import './statictis-font.global.css';
import { mapStateToProps, mapDispatchToProps } from '../store/dispatchBind';
import SongApi from '../util/songApi';
import SongList from './SongList';
import SongStatistic from '../component/Statistic';
import NeteaseLogin from './NeteaseLogin';

const { songUrl } = SongApi();

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)((props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, songs } = useSelector((state: StoreState) => state);
  const [danmuList, setDanmuList] = useState<Array<DanmuModel>>([]);
  const [isBrowsing, setIsBrowsing] = useState(false);
  const [showNetease, setShowNetease] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const api = useApi();

  const addSongIdBySearch = async (keywords: string) => {
    const res = await api.get('/cloudsearch', {
      params: { keywords, limit: 10 },
    });
    if (res.status !== 200) {
      message.error(res.statusText);
      return;
    }
    const firstS = res.data.result.songs[0];
    const firstMatch = await songUrl(res.data.result.songs[0].id)
      .then((result: any) => result.data.data[0])
      .catch((err: any) => console.log(err));
    if (songs.find((item) => item.id === firstMatch.id)) {
      message.error('列表中已存在~');
      return;
    }
    const allSinger = () => {
      let s = '';
      firstS.ar.forEach((item: any) => {
        s += item.tns[0];
      });
      return s;
    };
    if (songs.length === 0) await props.onChangeSong(firstMatch.id);
    dispatch({
      type: 'addSong',
      payload: {
        id: firstMatch.id,
        singer: allSinger(),
        title: firstS.name,
        spendTime: firstS.dt,
      },
    });
  };

  useEffect(() => {
    const container = ref.current;
    if (container) {
      container.addEventListener('scroll', () => {
        if (
          container.scrollTop <
          container.scrollHeight - container.clientHeight - 10
        ) {
          setIsBrowsing(true);
        } else {
          setIsBrowsing(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    addSongIdBySearch('One Last Kiss');
  }, []);

  useEffect(() => {
    if (Number.isNaN(parseInt(user.roomId))) {
      message.error('房间号应为数字');
      dispatch({ type: 'logout' });
      history.go(-1);
    }
    const live = new KeepLiveWS(parseInt(user.roomId));
    live.on('open', () => {});
    live.on('live', () => {
      live.on('heartbeat', () => {});
    });
    live.on('msg', (data) => {
      if (data.cmd === 'DANMU_MSG') {
        setDanmuList((list) => {
          const newList = list.concat({
            auther: data.info[2][1],
            content: data.info[1],
            id: Math.random(),
          });
          return newList.length > 50
            ? newList.slice(newList.length - 50)
            : newList;
        });
        const isSelect = /点歌\S.*/;
        if (isSelect.test(data.info[1]) === true && data.info[1].length > 3) {
          addSongIdBySearch(data.info[1].slice(3));
        }
        if (ref.current) {
          if (isBrowsing === false) {
            ref.current.scrollTop =
              ref.current.scrollHeight - ref.current.clientHeight;
          }
        }
      }
    });
    return () => {
      live.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.roomId]);

  return (
    <Basement>
      <Board style={{ background: '#F8F2F8' }}>
        <Layer
          className="shadow-lg"
          style={{
            right: '75%',
            background: `url(${leftBg}) no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <div />
        </Layer>
        <Layer
          className="opacity-70"
          style={{
            right: '75%',
            background: 'black',
          }}
        >
          <div
            className="m-6 font-semibold text-2xl tracking-widest"
            style={{ marginBottom: 5 }}
          >
            弹幕栏
          </div>
          <div className="line" />
          <div
            className="m-4 overflow-y-hidden appearance-none"
            style={{ height: 'calc(100% - 200px)' }}
            ref={ref}
          >
            {danmuList.map((item) => {
              const isSelect = /点歌 .*/;
              if (
                isSelect.test(item.content) === true &&
                item.content.length > 3
              ) {
                return (
                  <SelectDanmu
                    auther={item.auther}
                    content={item.content}
                    key={item.id}
                  />
                );
              }
              return (
                <CommonDanmu
                  auther={item.auther}
                  content={item.content}
                  key={item.id}
                />
              );
            })}
          </div>
        </Layer>
        <Layer className="shadow-lg" style={{ left: '25%' }}>
          <div
            style={{
              width: '100%',
              height: 45,
              display: 'flex',
              justifyContent: 'end',
              flexDirection: 'row-reverse',
            }}
          >
            <LogoutOutlined
              onClick={() => {
                dispatch({ type: 'logout' });
              }}
              style={{
                color: '#D0104C',
                margin: 10,
                fontSize: 24,
                marginRight: 20,
              }}
              className="transition duration-500 ease-in-out transform hover:scale-110"
            />
            <ClearOutlined
              onClick={() => {
                dispatch({ type: 'clearAll' });
              }}
              style={{
                color: '#D0104C',
                margin: 10,
                fontSize: 24,
                marginRight: 20,
              }}
              className="transition duration-500 ease-in-out transform hover:scale-110"
            />
            <UserOutlined
              onClick={() => {
                setShowNetease(!showNetease);
              }}
              style={{
                color: '#D0104C',
                margin: 10,
                fontSize: 24,
                marginRight: 20,
              }}
              className="transition duration-500 ease-in-out transform hover:scale-110"
            />
          </div>
          {showNetease ? (
            <NeteaseLogin />
          ) : (
            <Layer style={{ top: 50 }}>
              <Container
                style={{
                  backgroundImage:
                    'linear-gradient(to bottom right, #D0104C, #f78ba2)',
                  marginLeft: '7%',
                  marginRight: '7%',
                  marginTop: 20,
                }}
                hoverable={false}
              >
                <SongStatistic />
              </Container>
              <SongList />
            </Layer>
          )}
        </Layer>
      </Board>
    </Basement>
  );
});

export default Home;
