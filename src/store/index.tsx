/* eslint-disable no-param-reassign */
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { UserInfoModel } from '../util/DataModel';

export interface StoreState {
  isLogin: boolean;
  user: UserInfoModel;
  song: any;
  songs: Array<any>;
  isPlay: boolean;
}

const initialState: StoreState = {
  isLogin: false,
  user: { roomId: '' },
  song: undefined,
  songs: [],
  isPlay: false,
};

const actions: Actions = {
  login(state) {
    state.isLogin = true;
    return state;
  },
  logout(state) {
    state.isLogin = false;
    state.user = { roomId: '' };
    return state;
  },
  user(state, payload) {
    state.user = { roomId: payload };
    return state;
  },
  changeSong(state, payload) {
    state.song = payload;
    return state;
  },
  removeSong(state, payload) {
    state.songs = state.songs.filter((item) => item.id !== payload);
    return state;
  },
  setIsPlay(state, payload) {
    state.isPlay = payload;
    return state;
  },
};

const reducer = (state: StoreState = initialState, action: Action) => {
  if (typeof actions[action.type] === 'function') {
    const newState = JSON.parse(JSON.stringify(state));
    return actions[action.type](newState, action.payload);
  }
  return initialState;
};

const persistedReducer = persistReducer(
  {
    key: 'karshilov-redux',
    storage,
  },
  reducer
);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

type ActionFunc = (state: StoreState, payload?: any) => StoreState;

interface Action {
  type: string;
  payload?: any;
}

interface Actions {
  [propName: string]: ActionFunc;
}
