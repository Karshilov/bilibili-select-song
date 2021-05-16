import React from 'react';
import { Typography } from 'antd';

const { Text, Paragraph } = Typography;

export const CommonDanmu = (props: { auther: string; content: string }) => {
  const { auther, content } = props;
  return (
    <Paragraph>
      <Text strong className="text-gray-400">
        {`${auther}: `}
      </Text>
      <Text className="text-white">{content}</Text>
    </Paragraph>
  );
};

export const SelectDanmu = (props: { auther: string; content: string }) => {
  const { auther, content } = props;
  return (
    <Paragraph>
      <Text strong style={{ color: '#ffb8c5' }}>
        {`${auther}: `}
      </Text>
      <Text style={{ color: '#ffe6e9' }}>{content}</Text>
    </Paragraph>
  );
};
