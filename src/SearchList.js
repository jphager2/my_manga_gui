import React from 'react';
import { openExternal } from './utils';
import Image from './Image';
import './SearchList.css';

function Manga(props) {
  const url = props.href.replace(/\/+$/, '');
  const slug = url.split('/').reverse()[0];
  const image = url
    .replace('www.mangareader.net', 's1.mangareader.net')
    .replace(slug, `cover/${slug}/${slug}-l0.jpg`);

  return (
    <div className="Manga">
      <div className="Manga-cover">
        <Image src={image} alt={props.name} />
      </div>
      <div className="Manga-info">
        <h2 className="Manga-title">{props.name}</h2>
        <p>
          <a className="Manga-link button" href={props.href} onClick={openExternal}>
            Read online
          </a>
        </p>
      </div>
    </div>
  );
}

function SearchList(props) {
  const { manga } = props;

  const items = manga.map((item) => (
    <Manga
      key={item.uri}
      name={item.name}
      href={item.uri}
    />
  ));

  return (
    <div className="SearchList">{items}</div>
  );
}

export default SearchList;
