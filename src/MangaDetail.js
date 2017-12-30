import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { openExternal } from './utils';
import ChapterList from './ChapterList';
import './MangaDetail.css';

class MangaDetail extends Component {
  render() {
    const manga = this.props.manga;
    const slug = manga.uri.split('/').reverse()[0];
    const image = manga.uri
      .replace('www.mangareader.net', 's0.mangareader.net')
      .replace(slug, `cover/${slug}/${slug}-l0.jpg`);

    return (
      <div className="MangaDetail">
        <div className="row">
          <Link className="button small" to={'/'}>&lt;&lt;- Back</Link>
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
            <p>
              <a className="MangaDetail-link button" href={manga.url} onClick={openExternal}>
                Read online
              </a>
            </p>
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
