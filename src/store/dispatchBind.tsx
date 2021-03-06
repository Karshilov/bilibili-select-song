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
    dispatch({ type: 'changeSong', payload: { ...song, id } });
    return true;
  };

  const onRemoveSong = async (id: string, nextId: string | undefined) => {
    if (nextId !== undefined) {
      onChangeSong(nextId);
    }
    dispatch({ type: 'removeSong', payload: id });
  };

  const onPlayedSong = (id: string) => {
    dispatch({ type: 'addPlayedSong', payload: { id } });
  };

  const onPauseOrPlay = (status: any) => {
    dispatch({ type: 'setIsPlay', payload: status });
  };

  const onSetUser = (status: any) => {
    if (status === false) dispatch({ type: 'neteaseLogout' });
    else dispatch({ type: 'neteaseLogin', payload: status });
  };

  const onClearAll = () => {
    dispatch({ type: 'clearAll' });
  };

  const onAddSong = (payload: any) => {
    dispatch({
      type: 'addSong',
      payload,
    });
  };

  const onWaiting = () => {
    dispatch({ type: 'changeSong', payload: undefined });
    // dispatch({ type: 'refreshSongs' });
  };

  const onSetFansOnly = () => {
    dispatch({ type: 'setFansOnly' });
  };

  return {
    onChangeSong,
    onPauseOrPlay,
    onSetUser,
    onRemoveSong,
    onPlayedSong,
    onClearAll,
    onAddSong,
    onWaiting,
    onSetFansOnly,
  };
}

export function mapStateToProps(state: any) {
  return {
    song: state.song,
    songs: state.songs,
    isPlay: state.isPlay,
    neteaseUser: state.neteaseUser,
    user: state.user,
    played: state.played,
    fansOnly: state.fansOnly,
  };
}
