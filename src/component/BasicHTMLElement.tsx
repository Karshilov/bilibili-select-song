/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/require-default-props */
import React from 'react';

const BasementCSS: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const LayerCSS: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const BoardCSS: React.CSSProperties = {
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
  style?: React.CSSProperties;
}) => {
  return (
    <div
      onClick={() => {
        props.onClick;
      }}
      style={{ ...BasementCSS, ...props.style }}
    >
      {props.children}
    </div>
  );
}; // 默认100%大小container

export const Layer = (props: {
  children: React.ReactNode;
  onClick?: Function;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      onClick={() => {
        props.onClick;
      }}
      style={{ ...LayerCSS, ...props.style }}
    >
      {props.children}
    </div>
  );
}; // z轴分层

export const Board = (props: {
  children: React.ReactNode;
  onClick?: Function;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      onClick={() => {
        props.onClick;
      }}
      style={{ ...BoardCSS, ...props.style }}
    >
      {props.children}
    </div>
  );
}; // 默认白色蒙板
