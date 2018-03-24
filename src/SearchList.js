import React from 'react';
import ExternalManga from './ExternalManga';
import LocalManga from './LocalManga';

function SearchList(props) {
  const { results, manga, zine } = props;

  const items = results.map((item) => {
    const local = manga.find(({uri}) => uri === item.uri)

    if (local) {
      return (
        <LocalManga
          key={local.id.toString()}
          id={local.id}
          name={local.name}
          href={local.uri}
          chapterCount={local.total_count}
          readCount={local.read_count}
          zine={zine.includes(item.id)}
        />
      )
    }

    return (
      <ExternalManga
        key={item.uri}
        name={item.name}
        href={item.uri}
      />
    )
  });

  return (
    <div className="SearchList">{items}</div>
  );
}

export default SearchList;
