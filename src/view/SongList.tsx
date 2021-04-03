import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../store';
import { SelectItem, ListItem } from '../component/ListElement';

const SongList = () => {
  const [duration, setDuration] = useState(0);
  const { songs, song, isPlay } = useSelector((state: StoreState) => state);
  return (
    <div className="m-3 p-2">
      {songs.map((item) => {
        return item.url === song.url ? (
          <SelectItem
            isPlay={isPlay}
            title={item.title}
            url={item.url}
            id={item.id}
            singer={item.singer}
          />
        ) : (
          <ListItem
            isPlay={isPlay}
            title={item.title}
            url={item.url}
            id={item.id}
            singer={item.singer}
          />
        );
      })}
    </div>
  );
};

export default SongList;
