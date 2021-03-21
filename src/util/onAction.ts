import { message } from 'antd';
import { useDispatch } from 'react-redux';
import SongApi from './songApi';

const { songUrl } = SongApi();

const SongActions = () => {
  const dispatch = useDispatch();
  const onChangeSong = async (id: string) => {
    const song = await songUrl(id)
      .then((result: any) => result.data.data[0])
      .catch((err: any) => console.log(err));
    // 歌曲权限不足时，URL为空
    if (!song || !song.url) {
      message.error('此歌曲无权播放╮(￣▽￣"")╭');
      return false;
    }
    dispatch({ type: 'changeSong', payload: song });
    return true;
  };

  const onRemoveSong = (id: string) => {
    dispatch({ type: 'removeSong', payload: id });
  };

  const onPauseOrPlay = (status: boolean) => {
    dispatch({ type: 'setIsPlay', payload: status });
  };

  return {
    onChangeSong,
    onRemoveSong,
    onPauseOrPlay,
  };
};

export default SongActions;
