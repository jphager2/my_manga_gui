import React from 'react';
import { openExternal } from './utils';
import Image from './Image';
import './ExternalManga.css';

function Manga(props) {
  const url = props.href.replace(/\/+$/, '');
  const slug = url.split('/').reverse()[0];
  const image = url
    .replace('www.mangareader.net', 's1.mangareader.net')
    .replace(slug, `cover/${slug}/${slug}-l0.jpg`);

  return (
    <div className="ExternalManga">
      <div className="ExternalManga-cover">
        <Image src={image} alt={props.name} />
      </div>
      <div className="ExternalManga-info">
        <h2 className="ExternalManga-title">{props.name}</h2>
        <p>
          <a className="ExternalManga-link button" href={props.href} onClick={openExternal}>
            Read online
          </a>
        </p>
      </div>
    </div>
  );
}

export default Manga;
