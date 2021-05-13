/* eslint-disable no-param-reassign */
import { stat } from 'fs';
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
  neteaseUser: any;
  played: Array<any>;
}

const initialState: StoreState = {
  isLogin: false,
  user: { roomId: '' },
  song: undefined,
  songs: [],
  played: [],
  isPlay: false,
  neteaseUser: undefined,
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
    state.played = state.played.concat(payload);
    return state;
  },
  setIsPlay(state, payload) {
    state.isPlay = payload;
    return state;
  },
  addSong(state, payload) {
    state.songs = state.songs.concat(payload);
    // eslint-disable-next-line prefer-destructuring
    if (state.song === undefined) state.song = state.songs[0];
    return state;
  },
  clearAll(state) {
    state.song = initialState.song;
    state.songs = initialState.songs;
    state.isPlay = false;
    state.played = [];
    return state;
  },
  neteaseLogin(state, payload) {
    state.neteaseUser = payload;
    return state;
  },
  neteaseLogout(state) {
    state.neteaseUser = undefined;
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
