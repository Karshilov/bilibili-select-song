import { useApi } from './api';

const SongApi = () => {
  const api = useApi();
  const songUrl = (id: string) => api.get('/song/url', { params: { id } });

  const songDetail = (id: string) =>
    api.get('/song/detail', { params: { id } });

  const getLyric = (id: string) => api.get('/lyric', { params: { id } });

  const userLogin = (phone: string, password: string) =>
    api.post('/login/cellphone', { phone, password });

  const userLogout = () => api.post('/logout');

  const checkLogin = () => api.get('/login/status');

  const userDetail = (uid: string) =>
    api.get('/user/detail', { params: { uid } });

  const loginRefresh = () => api.post('/login/refresh');

  return {
    songUrl,
    songDetail,
    getLyric,
    userLogin,
    userLogout,
    checkLogin,
    userDetail,
    loginRefresh,
  };
};

export default SongApi;
