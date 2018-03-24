import React from 'react';
import Manga from './LocalManga';

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
