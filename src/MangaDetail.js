import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { openExternal } from './utils';
import './MangaDetail.css';

function MangaDetail(props) {
  const {manga} = props;
  const slug = manga.uri.split('/').reverse()[0];
  const image = manga.uri
    .replace('www.mangareader.net', 's0.mangareader.net')
    .replace(slug, `cover/${slug}/${slug}-l0.jpg`);

  return (
    <div className="MangaDetail">
      <Link to={`/manga/${manga.id}`}>
        <div className="Manga-cover">
          <img src={image} />
        </div>
      </Link>
      <div className="MangaDetail-info">
        <h2 className="MangaDetail-title">{manga.name}</h2>
        <p className="MangaDetail-description">
          {manga.read_count} chapters read of {manga.total_count}
        </p>
        <p>
          <a className="MangaDetail-link" href={manga.url} onClick={openExternal}>
            Read online
          </a>
        </p>
      </div>
    </div>
  )
}

export default MangaDetail;
