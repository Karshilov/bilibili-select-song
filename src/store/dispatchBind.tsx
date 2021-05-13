import { message } from 'antd';
import songApi from '../util/songApi';

const { songUrl } = songApi();

export function mapDispatchToProps(dispatch: any) {
  const onChangeSong = async (id: string) => {
    const song = await songUrl(id)
      .then((result) => result.data.data[0])
      .catch((err) => console.log(err));
    // 歌曲权限不足时，URL为空
    if (!song || !song.url) {
      message.warning('歌曲权限不足');
      return false;
    }
    dispatch({ type: 'changeSong', payload: song });
    return true;
  };

  const onRemoveSong = async (id: string) => {
    dispatch({ type: 'removeSong', payload: id });
  };

  const onPauseOrPlay = (status: any) => {
    dispatch({ type: 'setIsPlay', payload: status });
  };

  const onSetUser = (status: any) => {
    if (status === false) dispatch({ type: 'neteaseLogout' });
    else dispatch({ type: 'neteaseLogin', payload: status });
  };

  return {
    // 当前播放歌曲
    onChangeSong,
    // 播放或暂停
    onPauseOrPlay,
    // 用户登录或注销
    onSetUser,
    // 移除歌曲
    onRemoveSong,
  };
}

export function mapStateToProps(state: any) {
  return {
    song: state.song,
    songs: state.songs,
    isPlay: state.isPlay,
    neteaseUser: state.neteaseUser,
    user: state.user,
  };
}
