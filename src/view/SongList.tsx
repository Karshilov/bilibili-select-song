/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SelectItem, ListItem } from '../component/ListElement';
import { mapStateToProps, mapDispatchToProps } from '../store/dispatchBind';

const SongList = connect(
  mapStateToProps,
  mapDispatchToProps
)((props: any) => {
  const { songs, song, played } = props;
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
    if (
      song === undefined &&
      songs.length !== 0 &&
      songs.length > played.length
    ) {
      props.onChangeSong(songs[played.length].id);
    }
  }, [pageAndPageSize, songs]);

  useEffect(() => {
    if (song !== undefined) {
      const curId = songs.findIndex((item: any) => item.id === song.id);
      if (
        song !== undefined &&
        curId !== -1 &&
        Math.floor(curId / pageAndPageSize[1]) + 1 !== pageAndPageSize[0]
      ) {
        console.log(curId, pageAndPageSize);
        setPageAndPageSize([
          Math.floor(curId / pageAndPageSize[1]) + 1,
          pageAndPageSize[1],
        ]);
      }
    }
  }, [song, songs]);

  return (
    <div className="p-2" style={{ marginLeft: '10%', marginRight: '10%' }}>
      {songs
        .slice(
          (pageAndPageSize[0] - 1) * pageAndPageSize[1],
          Math.min(pageAndPageSize[0] * pageAndPageSize[1], songs.length)
        )
        .map((item: any) => {
          const fg = song !== undefined && item.id === song.id;
          return fg ? (
            <SelectItem
              title={item.title}
              id={item.id}
              spendTime={item.spendTime}
              key={item.id}
              singer={item.singer}
            />
          ) : (
            <ListItem
              title={item.title}
              id={item.id}
              spendTime={item.spendTime}
              key={item.id}
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
                  className={
                    i === pageAndPageSize[0]
                      ? 'bg-baseRed font-semibold text-white px-2 py-1 border-transparent'
                      : 'bg-transparent hover:bg-baseRed font-semibold text-baseRed hover:text-white px-2 py-1 hover:border-transparent'
                  }
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
