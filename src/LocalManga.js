import React from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';
import { openExternal } from './utils';
import './LocalManga.css';

function Manga(props) {
  const url = props.href;
  const slug = url.split('/').reverse()[0];
  const image = url
    .replace('www.mangareader.net', 's1.mangareader.net')
    .replace(slug, `cover/${slug}/${slug}-l0.jpg`);

  return (
    <div className="LocalManga">
      <Link to={`/manga/${props.id}`}>
        <div className="LocalManga-cover">
          <Image src={image} alt={props.name} />
        </div>
      </Link>
      <div className="LocalManga-info">
        <h2 className="LocalManga-title">
          <Link to={`/manga/${props.id}`}>{props.name}</Link>
          &nbsp;
          <span className={`LocalManga-zine label small${props.zine ? '' : ' hidden'}`}>ZINE</span>
        </h2>
        <p className="LocalManga-description">
          {props.readCount} chapters read of {props.chapterCount}
        </p>
        <p>
          <a className="LocalManga-link" href={props.href} onClick={openExternal}>
            Read online
          </a>
        </p>
      </div>
    </div>
  );
}

export default Manga;
