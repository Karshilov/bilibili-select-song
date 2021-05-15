import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import RootRouter from './router/index';
import AuthGuard from './component/AuthGuard';
import './style/tailwind.global.css';

const APP: React.FC = () => (
  <Provider store={store}>
    <AuthGuard>
      <RootRouter />
    </AuthGuard>
  </Provider>
);

export default APP;
