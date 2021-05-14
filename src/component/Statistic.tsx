import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Typography } from 'antd';
import { mapStateToProps } from '../store/dispatchBind';
import '../view/statictis-font.global.css';

const { Text, Paragraph } = Typography;

const SongStatistic = connect(
  mapStateToProps,
  null
)((props: any) => {
  console.log(props);
  const statisticsColumns = [
    {
      key: '总点歌数',
      num: props.songs.length,
    },
    {
      key: '已播放数',
      num: props.played.length,
    },
    {
      key: '未播放数',
      num:
        props.songs.length - props.played.length >= 0
          ? props.songs.length - props.played.length
          : 0,
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
