import React from 'react';
import { Link } from 'react-router-dom'
import { openExternal } from './utils';
import Image from './Image';
import './MangaList.css';

let updatePollInterval = null;

function updatePoll(button) {
  if (!updatePollInterval) { return; }

  fetch(`http://localhost:8999/manga/update`)
    .then((res) => {
      if (res.status === 409) { return; }

      if (res.status !== 200) {
        throw new Error('Failed to update manga');
      }

      button.classList.remove('loading');
      window.location.reload();
    })
    .catch((e) => {
      console.error(e);
      button.classList.remove('loading');
      window.clearInterval(updatePollInterval);
      updatePollInterval = null
    });
}

function update(e) {
  const button = e.target;

  if (button.classList.contains('loading')) { return; }

  button.classList.add('loading');

  fetch('http://localhost:8999/manga/update', {method: 'POST'})
    .then((res) => {
      if (res.status !== 202 && res.status !== 409) {
        throw new Error('Failed to update manga');
      }
      updatePollInterval = window.setInterval(() => updatePoll(button), 1000)
    })
    .catch((e) => {
      console.error(e);
      button.classList.remove('loading');
    });
}

function Manga(props) {
  const url = props.href;
  const slug = url.split('/').reverse()[0];
  const image = url
    .replace('www.mangareader.net', 's1.mangareader.net')
    .replace(slug, `cover/${slug}/${slug}-l0.jpg`);

  return (
    <div className="Manga">
      <Link to={`/manga/${props.id}`}>
        <div className="Manga-cover">
          <Image src={image} alt={props.name} />
        </div>
      </Link>
      <div className="Manga-info">
        <h2 className="Manga-title">
          <Link to={`/manga/${props.id}`}>{props.name}</Link>
          &nbsp;
          <span className={`Manga-zine label small${props.zine ? '' : ' hidden'}`}>ZINE</span>
        </h2>
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
  );
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
      zine={props.zine.includes(item.id)}
    />
  ));

  return (
    <div className="MangaList">
      <div className="row">
        <div className="MangaList-update button" onClick={update}>Update</div>
      </div>
      <div className="row">
        <div className="MangaList-list">{items}</div>
      </div>
    </div>
  );
}

export default MangaList;
