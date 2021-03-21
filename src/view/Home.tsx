/* eslint-disable react/no-array-index-key */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KeepLiveWS } from 'bilibili-live-ws';
import { LogoutOutlined } from '@ant-design/icons';
import { url } from 'inspector';
import { Row, Col, Typography } from 'antd';
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
import './statictis-font.global.css';

const { Text, Paragraph } = Typography;

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: StoreState) => state);
  const [danmuList, setDanmuList] = useState<Array<DanmuModel>>([]);

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
      if (data.cmd === 'DANMU_MSG') {
        setDanmuList(
          danmuList.concat({ auther: data.info[2][1], content: data.info[1] })
        );
      }
      console.log(danmuList);
    });
    return () => {
      live.close();
    };
  }, [user.roomId]);

  const statisticsColumns = [
    {
      key: '总点歌数',
      num: 0,
    },
    {
      key: '已播放数',
      num: 0,
    },
    {
      key: '未播放数',
      num: 0,
    },
  ];

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
          <Typography className="m-4 overflow-y-auto appearance-none">
            {danmuList.map((item, index) => {
              const isSelect = /点歌 .*/;
              if (
                isSelect.test(item.content) === true &&
                item.content.length > 3
              ) {
                return (
                  <SelectDanmu
                    auther={item.auther}
                    content={item.content}
                    key={index}
                  />
                );
              }
              return (
                <CommonDanmu
                  auther={item.auther}
                  content={item.content}
                  key={index}
                />
              );
            })}
          </Typography>
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
          </div>
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
            <Row>
              {statisticsColumns.map((item) => {
                return (
                  <Col
                    span={Math.floor(24 / statisticsColumns.length)}
                    key={item.key}
                  >
                    <Text style={{ color: 'white', opacity: 0.8 }}>
                      {item.key}
                    </Text>
                    <Paragraph>
                      <Text
                        style={{
                          fontFamily: 'Quicksand',
                          fontSize: 32,
                          color: 'white',
                        }}
                      >
                        {item.num}
                      </Text>
                    </Paragraph>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </Layer>
      </Board>
    </Basement>
  );
};

export default Home;
