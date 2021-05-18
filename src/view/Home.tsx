/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { KeepLiveWS } from 'bilibili-live-ws';
import {
  LogoutOutlined,
  ClearOutlined,
  UserOutlined,
  LockOutlined,
  UnlockOutlined,
  SyncOutlined,
} from '@ant-design/icons';
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

const { songUrl, userPlaylist, playlistDetail } = SongApi();

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)((props: any) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: StoreState) => state);
  const [danmuList, setDanmuList] = useState<Array<DanmuModel>>([]);
  const [isBrowsing, setIsBrowsing] = useState(false);
  const [showNetease, setShowNetease] = useState(false);
  const [fansOnly, setFansOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const api = useApi();

  const iconCSS: React.CSSProperties = {
    color: '#D0104C',
    margin: 10,
    fontSize: 24,
    marginRight: 20,
  };

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
    if (
      props.songs.length !== 0 &&
      props.songs.find((item: any) => item.id === firstMatch.id)
    ) {
      message.error('列表中已存在~');
      return;
    }
    const allSinger = () => {
      let s = '';
      firstS.ar.forEach((item: any) => {
        s += item.name;
        s += '/';
      });
      return s.slice(0, s.length - 1);
    };
    props.onAddSong({
      id: firstMatch.id,
      singer: allSinger(),
      title: firstS.name,
      spendTime: firstS.dt,
      byOrder: true,
    });
  };

  const loadDefaultPlaylist = async (curUser: any) => {
    setIsLoading(true);
    const playlist = await userPlaylist(curUser.account.id);
    if (playlist.data.code !== 200) {
      message.error(playlist.data.message);
      return;
    }
    playlist.data.playlist.forEach(async (item: any) => {
      if (item.name === 'bilibili点歌自用') {
        const detail = await playlistDetail(item.id);
        if (detail.data.code !== 200) {
          message.error(detail.data.message);
          return;
        }
        const allSinger = (cur: any) => {
          let s = '';
          cur.ar.forEach((singer: any) => {
            s += singer.name;
            s += '/';
          });
          return s.slice(0, s.length - 1);
        };
        const list: Array<any> = detail.data.playlist.tracks;

        const dfsToAddSongs = async (idx: number) => {
          if (idx >= list.length) return;
          const cur = list[idx];
          const realUrl = await songUrl(cur.id)
            .then((result: any) => result.data.data[0])
            .catch((err: any) => console.log(err));
          if (
            props.songs.length !== 0 &&
            props.songs.find((val: any) => realUrl.id === val.id)
          ) {
            return;
          }
          props.onAddSong({
            id: realUrl.id,
            singer: allSinger(cur),
            title: cur.name,
            spendTime: cur.dt,
            byOrder: false,
          });
          await dfsToAddSongs(idx + 1);
        };
        await dfsToAddSongs(0);
      }
    });
    setIsLoading(false);
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
    if (Number.isNaN(parseInt(user.roomId))) {
      message.error('房间号应为数字');
      dispatch({ type: 'logout' });
      return () => {};
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
        const isSelect = /点歌\s.*/;
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
              const isSelect = /点歌\s.*/;
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
              style={iconCSS}
              className="transition duration-500 ease-in-out transform hover:scale-110"
            />
            <ClearOutlined
              onClick={() => {
                props.onClearAll();
              }}
              style={iconCSS}
              className="transition duration-500 ease-in-out transform hover:scale-110"
            />
            <UserOutlined
              onClick={() => {
                setShowNetease(!showNetease);
              }}
              style={iconCSS}
              className="transition duration-500 ease-in-out transform hover:scale-110"
            />
            {fansOnly ? (
              <UnlockOutlined
                onClick={() => {
                  setFansOnly(false);
                }}
                style={iconCSS}
                className="transition duration-500 ease-in-out transform hover:scale-110"
              />
            ) : (
              <LockOutlined
                onClick={() => {
                  setFansOnly(true);
                }}
                style={iconCSS}
                className="transition duration-500 ease-in-out transform hover:scale-110"
              />
            )}
            <SyncOutlined
              spin={isLoading}
              onClick={() => {
                if (props.neteaseUser !== undefined)
                  loadDefaultPlaylist(props.neteaseUser);
                else {
                  message.error('请先登录网易云音乐');
                }
              }}
              style={iconCSS}
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
