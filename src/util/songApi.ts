import { useApi } from './api';

const SongApi = () => {
  const api = useApi();
  const songUrl = (id: string) => {
    return api.get('/song/url', { params: { id } });
  };

  const songDetail = (id: string) => {
    return api.get('/song/detail', { params: { id } });
  };

  const getLyric = (id: string) => {
    return api.get('/lyric', { params: { id } });
  };
  return {
    songUrl,
    songDetail,
    getLyric,
  };
};

export default SongApi;
