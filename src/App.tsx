import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import RootRouter from './router/index';
import icon from '../assets/icon.svg';
import AuthGuard from './component/AuthGuard';
import './style/tailwind.global.css';

const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};

const APP: React.FC = () => (
  <Provider store={store}>
    <AuthGuard>
      <RootRouter />
    </AuthGuard>
  </Provider>
);

export default APP;
