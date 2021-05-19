/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { stat } from 'fs';
import { createStore } from 'redux';
import { UserInfoModel } from '../util/DataModel';

export interface StoreState {
  isLogin: boolean;
  user: UserInfoModel;
  song?: any;
  songs: Array<any>;
  isPlay: boolean;
  neteaseUser: any;
  played: Array<any>;
  fansOnly: boolean;
}

const initialState: StoreState = {
  isLogin: false,
  user: { roomId: '' },
  song: undefined,
  songs: [],
  played: [],
  isPlay: false,
  neteaseUser: undefined,
  fansOnly: false,
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
    state.played = state.played.filter((item) => item !== payload);
    return state;
  },
  addPlayedSong(state, payload) {
    if (!state.played.find((item) => item === payload))
      state.played = state.played.concat(payload);
    return state;
  },
  setIsPlay(state, payload) {
    state.isPlay = payload;
    return state;
  },
  addSong(state, payload) {
    if (
      payload.byOrder !== true ||
      (payload.byOrder === true && state.song === undefined)
    ) {
      state.songs = state.songs.concat(payload);
    } else {
      let curId = state.songs.findIndex((item) => item.id === state.song.id);
      for (let i = curId; i < state.songs.length; i += 1) {
        if (state.songs[i].byOrder === true) curId = i;
      }
      state.songs = [
        ...state.songs.slice(0, curId + 1),
        payload,
        ...state.songs.slice(curId + 1, state.songs.length),
      ];
    }
    return state;
  },
  clearAll(state) {
    state.song = undefined;
    state.songs = [];
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
  refreshSongs(state) {
    state.songs = [...state.songs];
    return state;
  },
  setFansOnly(state) {
    state.fansOnly = !state.fansOnly;
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

const store = createStore(reducer);

export { store };

type ActionFunc = (state: StoreState, payload?: any) => StoreState;

interface Action {
  type: string;
  payload?: any;
}

interface Actions {
  [propName: string]: ActionFunc;
}
