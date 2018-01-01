import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { openExternal } from './utils';
import ChapterList from './ChapterList';
import './MangaDetail.css';

class MangaDetail extends Component {
  constructor(props) {
    super(props);

    this.id = props.id;
    this.update = this.update.bind(this);
    this.updatePoll = this.updatePoll.bind(this);
    this.updatePollInterval = null;
  }

  updatePoll(button) {
    if (!this.updatePollInterval) { return; }

    fetch(`http://localhost:8999/manga/${this.id}/update`)
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
        window.clearInterval(this.updatePollInterval);
        this.updatePollInterval = null;
      });
  }

  update(e) {
    const button = e.target;

    if (button.classList.contains('loading')) { return; }

    button.classList.add('loading');

    fetch(`http://localhost:8999/manga/${this.id}/update`, {method: 'POST'})
      .then((res) => {
        if (res.status !== 202 && res.status !== 409) {
          throw new Error('Failed to update manga');
        }
        this.updatePollInterval = window.setInterval(() => this.updatePoll(button), 1000);
      })
      .catch((e) => {
        console.error(e);
        button.classList.remove('loading');
      });
  }

  render() {
    const manga = this.props.manga;
    const slug = manga.uri.split('/').reverse()[0];
    const image = manga.uri
      .replace('www.mangareader.net', 's0.mangareader.net')
      .replace(slug, `cover/${slug}/${slug}-l0.jpg`);

    return (
      <div className="MangaDetail">
        <div className="row">
          <Link className="button small" to={'/'}>Back</Link>
        </div>
        <div className="row">
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
            <div>
              <a className="MangaDetail-link button" href={manga.url} onClick={openExternal}>
                Read online
              </a>
              <div className="MangaDetail-update button" onClick={this.update} >
                Update
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <ChapterList chapters={this.props.chapters} />
        </div>
      </div>
    )
  }
}

export default MangaDetail;
