import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Pagination } from 'antd';
import { SelectItem, ListItem } from '../component/ListElement';
import { StoreState } from '../store';
import { mapStateToProps } from '../store/dispatchBind';

const SongList = connect(
  mapStateToProps,
  null
)(() => {
  const { songs, song, isPlay, played } = useSelector(
    (state: StoreState) => state
  );
  const [pageAndPageSize, setPageAndPageSize] = useState<Array<number>>([1, 4]);
  return (
    <div className="m-3 p-2">
      {songs
        .slice(
          (pageAndPageSize[0] - 1) * pageAndPageSize[1],
          Math.min(pageAndPageSize[0] * pageAndPageSize[1], songs.length)
        )
        .map((item) => {
          return item.id === song.id ? (
            <SelectItem
              isPlay={isPlay}
              title={item.title}
              id={item.id}
              key={Math.random()}
              singer={item.singer}
            />
          ) : (
            <ListItem
              isPlay={isPlay}
              title={item.title}
              id={item.id}
              key={Math.random()}
              singer={item.singer}
            />
          );
        })}
      <Pagination
        responsive
        defaultCurrent={1}
        hideOnSinglePage
        onChange={(pg, pgSize) => {
          console.log(pg, pgSize);
          setPageAndPageSize([pg, pgSize ?? 4]);
        }}
      />
    </div>
  );
});

export default SongList;
