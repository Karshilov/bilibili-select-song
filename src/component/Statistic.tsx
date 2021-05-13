import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Row, Col, Typography, message, Pagination } from 'antd';
import { SelectItem, ListItem } from './ListElement';
import { StoreState } from '../store';
import { mapStateToProps } from '../store/dispatchBind';
import '../view/statictis-font.global.css';

const { Text, Paragraph } = Typography;

const SongStatistic = connect(
  mapStateToProps,
  null
)(() => {
  const { songs, played } = useSelector((state: StoreState) => state);
  const statisticsColumns = [
    {
      key: '总点歌数',
      num: songs.length,
    },
    {
      key: '已播放数',
      num: played,
    },
    {
      key: '未播放数',
      num: songs.length - played,
    },
  ];

  return (
    <Row>
      {statisticsColumns.map((item) => {
        return (
          <Col span={Math.floor(24 / statisticsColumns.length)} key={item.key}>
            <Text style={{ color: 'white', opacity: 0.8 }}>{item.key}</Text>
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
  );
});

export default SongStatistic;
