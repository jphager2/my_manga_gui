import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { openExternal } from './utils';
import './MangaList.css';

function Manga(props) {
  const url = props.href;
  const slug = url.split('/').reverse()[0];
  const image = url
    .replace('www.mangareader.net', 's0.mangareader.net')
    .replace(slug, `cover/${slug}/${slug}-l0.jpg`);

  return (
    <div className="Manga">
      <Link to={`/manga/${props.id}`}>
        <div className="Manga-cover">
          <img src={image} />
        </div>
      </Link>
      <div className="Manga-info">
        <h2 className="Manga-title">{props.name}</h2>
        <p className="Manga-description">
          {props.readCount} chapters read of {props.chapterCount}
        </p>
        <p>
          <a className="Manga-link" href={props.href} onClick={openExternal}>
            Read online
          </a>
        </p>
      </div>
    </div>
  )
}

function MangaList(props) {
  const { manga } = props;
  const items = manga.map((item) => (
    <Manga
      key={item.id.toString()}
      id={item.id}
      name={item.name}
      href={item.uri}
      chapterCount={item.total_count}
      readCount={item.read_count}
    />
  ));

  return (
    <div className="MangaList">{items}</div>
  );
}

export default MangaList;
