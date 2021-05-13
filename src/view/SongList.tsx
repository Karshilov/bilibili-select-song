import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { SelectItem, ListItem } from '../component/ListElement';
import { StoreState } from '../store';
import { mapStateToProps } from '../store/dispatchBind';

const SongList = connect(
  mapStateToProps,
  null
)(() => {
  const { songs, song, isPlay } = useSelector((state: StoreState) => state);
  const [pageAndPageSize, setPageAndPageSize] = useState<Array<number>>([1, 4]);
  const [pageNums, setPageNums] = useState<Array<number>>([]);

  useEffect(() => {
    let tot = songs.length;
    let i = 1;
    const newNums: Array<number> = [];
    while (tot > 0) {
      newNums.push(i);
      tot -= pageAndPageSize[1];
      i += 1;
    }
    setPageNums([...newNums]);
  }, [pageAndPageSize, songs]);

  return (
    <div className="p-2" style={{ marginLeft: '10%', marginRight: '10%' }}>
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
              spendTime={item.spendTime}
              key={Math.random()}
              singer={item.singer}
            />
          ) : (
            <ListItem
              isPlay={isPlay}
              title={item.title}
              id={item.id}
              spendTime={item.spendTime}
              key={Math.random()}
              singer={item.singer}
            />
          );
        })}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        {pageNums.length <= 1
          ? null
          : pageNums.map((i: number) => {
              return (
                <button
                  key={i}
                  style={{ fontSize: 17, margin: 5 }}
                  type="button"
                  className="bg-transparent hover:bg-baseRed font-semibold text-baseRed hover:text-white px-2 py-1 hover:border-transparent"
                  onClick={() => {
                    setPageAndPageSize([i, pageAndPageSize[1]]);
                  }}
                >
                  {i}
                </button>
              );
            })}
      </div>
    </div>
  );
});

export default SongList;
