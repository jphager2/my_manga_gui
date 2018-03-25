import React, { Component } from 'react';
import { openExternal } from './utils';
import Image from './Image';
import './ExternalManga.css';

class Manga extends Component {
  constructor(props) {
    super(props);

    this.uri = props.href;
    this.addManga = this.addManga.bind(this);
    this.addMangaPoll = this.addMangaPoll.bind(this);
    this.addMangaPollInterval = null;
  }

  addManga(e) {
    const button = e.target;

    if (button.classList.contains('loading')) { return; }

    button.classList.add('loading');

    const body = JSON.stringify({ uri: this.uri });
    const headers = { 'content-type': 'application/json' };

    fetch(`http://localhost:8999/manga`, {method: 'POST', headers, body})
      .then((res) => {
        if (res.status !== 202 && res.status !== 409) {
          throw new Error('Failed to add manga');
        }
        this.addMangaPollInterval = window.setInterval(() => this.addMangaPoll(button), 1000);
      })
      .catch((e) => {
        console.error(e);
        button.classList.remove('loading');
      });
  }

  addMangaPoll(button) {
    if (!this.addMangaPollInterval) { return; }

    fetch(`http://localhost:8999/manga?uri=${this.uri}`)
      .then((res) => {
        if (res.status === 409) { return; }

        if (res.status !== 200) {
          throw new Error('Failed to add manga');
        }

        button.classList.remove('loading');
        window.location.reload();
      })
      .catch((e) => {
        console.error(e);
        button.classList.remove('loading');
        window.clearInterval(this.addMangaPollInterval);
        this.addMangaPollInterval = null;
      });
  }

  render() {
    const url = this.props.href.replace(/\/+$/, '');
    const slug = url.split('/').reverse()[0];
    const image = url
      .replace('www.mangareader.net', 's1.mangareader.net')
      .replace(slug, `cover/${slug}/${slug}-l0.jpg`);

    return (
      <div className="ExternalManga">
        <div className="ExternalManga-cover">
          <Image src={image} alt={this.props.name} />
        </div>
        <div className="ExternalManga-info">
          <h2 className="ExternalManga-title">{this.props.name}</h2>
          <p>
            <a className="ExternalManga-link button" href={this.props.href} onClick={openExternal}>
              Read online
            </a>
            <button className="ExternalManga-add button" onClick={this.addManga}>
              Add
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Manga;
