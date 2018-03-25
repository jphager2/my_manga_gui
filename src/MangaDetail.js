import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { openExternal } from './utils';
import ChapterList from './ChapterList';
import Image from './Image';
import './MangaDetail.css';

class MangaDetail extends Component {
  constructor(props) {
    super(props);

    this.id = props.id;
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.performAction = this.performAction.bind(this);
    this.poll = this.poll.bind(this);
    this.pollInterval = {};
  }

  poll(button, action, url, redirectTo) {
    if (!this.pollInterval[action]) { return; }

    fetch(url)
      .then((res) => {
        if (res.status === 409) { return; }

        if (res.status !== 200) {
          throw new Error(`Failed to ${action} manga`);
        }

        button.classList.remove('loading');
        window.clearInterval(this.pollInterval[action]);
        this.pollInterval[action] = null;

        if (redirectTo) {
          window.location.hash = redirectTo;
        } else {
          window.location.reload();
        }
      })
      .catch((e) => {
        console.error(e);
        button.classList.remove('loading');
        window.clearInterval(this.pollInterval[action]);
        this.pollInterval[action] = null;
      });
  }

  update(e) {
    const url = `http://localhost:8999/manga/${this.id}/update`;

    this.performAction(e, url, 'update');
  }

  remove(e) {
    const url = `http://localhost:8999/manga/${this.id}/delete`;

    if (window.confirm('Remove this manga?')) {
      this.performAction(e, url, 'update', '/');
    }
  }

  performAction(e, url, action, redirectTo) {
    const button = e.target;

    if (button.classList.contains('loading')) { return; }

    button.classList.add('loading');

    fetch(url, {method: 'POST'})
      .then((res) => {
        if (res.status !== 202 && res.status !== 409) {
          throw new Error(`Failed to ${action} manga`);
        }
        this.pollInterval[action] = window.setInterval(() => {
          this.poll(button, action, url, redirectTo)
        }, 1000);
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
      .replace('www.mangareader.net', 's1.mangareader.net')
      .replace(slug, `cover/${slug}/${slug}-l0.jpg`);
    let cover;

    if (manga.uri !== '#') {
      cover = (
        <Image src={image} alt={manga.name} />
      );
    }

    return (
      <div className="MangaDetail">
        <div className="row">
          <Link className="button small" to={'/'}>Back</Link>
        </div>
        <div className="row">
          <div className="Manga-cover">
            {cover}
          </div>
          <div className="MangaDetail-info">
            <h2 className="MangaDetail-title">
              {manga.name}
              &nbsp;
              <span className={`Manga-zine label small${this.props.zine ? '' : ' hidden'}`}>ZINE</span>
            </h2>
            <p className="MangaDetail-description">
              {manga.read_count} chapters read of {manga.total_count}
            </p>
            <div>
              <a className="MangaDetail-link button" href={manga.uri} onClick={openExternal}>
                Read online
              </a>
              <button className="MangaDetail-update button" onClick={this.update} >
                Update
              </button>
              <button className="MangaDetail-remove button" onClick={this.remove} >
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <ChapterList chapters={this.props.chapters} downloads={this.props.downloads} />
        </div>
      </div>
    )
  }
}

export default MangaDetail;
