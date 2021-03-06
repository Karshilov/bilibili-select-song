import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { message } from 'antd';
import { Container } from '../component/BasicHTMLElement';
import NeteaseAvatar from '../../assets/netease-cloud-music-fill.svg';
import { mapStateToProps, mapDispatchToProps } from '../store/dispatchBind';
import { StoreState } from '../store';
import SongApi from '../util/songApi';
import './statictis-font.global.css';

const {
  userLogin,
  userAccount,
  loginRefresh,
  userLogout,
  songUrl,
  playlistDetail,
  userPlaylist,
} = SongApi();

const NeteaseLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)((props: any) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const { neteaseUser } = props;

  const bothMiddle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const login = async () => {
    const res = await userLogin(phone, password);
    if (res.data.code !== 200) {
      message.error(res.data.message);
      return;
    }
    const refresh = await loginRefresh();
    if (refresh.data.code !== 200) {
      message.error(res.data.message);
      return;
    }
    const info = await userAccount();
    if (info.data.code !== 200) {
      message.error(res.data.message);
      return;
    }
    props.onSetUser(info.data);
  };

  const logout = async () => {
    const res = await userLogout();
    if (res.status !== 200 && res.status !== 204) {
      message.error(res.statusText);
      return;
    }
    props.onSetUser(false);
  };

  return neteaseUser === undefined ? (
    <Container
      style={{
        ...bothMiddle,
        flexDirection: 'column',
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: 20,
      }}
      hoverable={false}
    >
      <img src={NeteaseAvatar} alt="" width={75} className="m-4" />
      <div
        style={{
          ...bothMiddle,
          flexDirection: 'row',
        }}
      >
        <div className="text-black font-mono text-lg m-3">??????</div>
        <input
          className="shadow-md border-b-2 outline-none text-black cursor-auto"
          style={{ height: 32, width: 200 }}
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          ...bothMiddle,
          flexDirection: 'row',
        }}
      >
        <div className="text-black font-mono text-lg m-3">??????</div>
        <input
          className="shadow-md border-b-2 outline-none text-black cursor-auto"
          style={{ height: 32, width: 200 }}
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button
        type="button"
        className="bg-transparent hover:bg-baseRed text-baseRed font-semibold hover:text-white py-2 px-4 border border-baseRed hover:border-transparent rounded m-3"
        onClick={() => {
          login();
        }}
      >
        ??????
      </button>
    </Container>
  ) : (
    <Container
      style={{
        ...bothMiddle,
        flexDirection: 'column',
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: 20,
      }}
    >
      <img
        src={neteaseUser.profile.avatarUrl}
        alt=""
        width={75}
        className="m-4"
        style={{ borderRadius: '50%' }}
      />
      <div
        style={{
          ...bothMiddle,
          flexDirection: 'row',
        }}
      >
        <div className="text-black font-mono text-lg m-3">????????????: </div>
        <div style={{ fontFamily: 'Quicksand', fontSize: 17, fontWeight: 600 }}>
          {neteaseUser.profile.nickname}
        </div>
      </div>
      <button
        type="button"
        className="bg-transparent hover:bg-baseRed text-baseRed font-semibold hover:text-white py-2 px-4 border border-baseRed hover:border-transparent rounded m-3"
        onClick={() => {
          logout();
        }}
      >
        ????????????
      </button>
    </Container>
  );
});

export default NeteaseLogin;
