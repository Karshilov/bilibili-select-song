/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/require-default-props */
import React, { CSSProperties } from 'react';
import { Card } from 'antd';

const BasementCSS: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const LayerCSS: CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const BoardCSS: CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  color: 'white',
};

export const Basement = (props: {
  children: React.ReactNode;
  onClick?: Function;
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <div
      onClick={() => {
        props.onClick;
      }}
      style={{ ...BasementCSS, ...props.style }}
      className={props.className}
    >
      {props.children}
    </div>
  );
}; // 默认100%大小container

export const Layer = (props: {
  children: React.ReactNode;
  onClick?: Function;
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <div
      onClick={() => {
        props.onClick;
      }}
      style={{ ...LayerCSS, ...props.style }}
      className={props.className}
    >
      {props.children}
    </div>
  );
}; // z轴分层

export const Board = (props: {
  children: React.ReactNode;
  onClick?: Function;
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <div
      onClick={() => {
        props.onClick;
      }}
      style={{ ...BoardCSS, ...props.style }}
      className={props.className}
    >
      {props.children}
    </div>
  );
}; // 默认白色蒙板

export const Container = (props: {
  children: React.ReactNode;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
  onClick?: Function;
  hoverable?: boolean;
}) => {
  return (
    <Card
      onClick={() => {
        if (props.onClick !== undefined) props.onClick();
      }}
      style={{
        borderRadius: '10px',
        ...(props.style ?? {}),
      }}
      bodyStyle={{ padding: '15px 25px', ...(props.bodyStyle ?? {}) }}
      hoverable={props.hoverable ?? true}
      className="shadow-xl"
    >
      {props.children}
    </Card>
  );
};
