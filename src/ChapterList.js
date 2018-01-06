import React, { Component } from 'react';
import { openItem } from './utils';
import './ChapterList.css';

class Chapter extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.chapter.id;
    this.toggleRead = this.toggleRead.bind(this);
    this.download = this.download.bind(this);
    this.downloadPoll = this.downloadPoll.bind(this);
    this.downloadPollInterval = null;
  }

  toggleRead(e) {
    const chapter = this.props.chapter;
    const url = `http://localhost:8999/chapters/${this.id}/read`;
    const button = e.target;

    fetch(url, {method: chapter.read ? 'DELETE' : 'POST'})
      .then((res) => {
        if (res.status === 200) {
          chapter.read = !chapter.read;
          button.innerText = `Mark as ${chapter.read ? 'Un' : ''}read`;
        }
      })
  }

  download(e) {
    const url = `http://localhost:8999/chapters/${this.id}/download`;
    const button = e.target;

    if (button.classList.contains('downloading')) { return; }

    button.classList.add('downloading');

    fetch(url, {method: 'POST'})
      .then((res) => {
        if (res.status !== 202 && res.status !== 409) {
          throw new Error('Failed to download manga');
        }
        this.downloadPollInterval = window.setInterval(() => this.downloadPoll(button), 1000);
      })
      .catch((e) => {
        console.error(e);
        button.classList.remove('downloading');
      });
  }

  downloadPoll(button) {
    if (!this.downloadPollInterval) { return; }

    fetch(`http://localhost:8999/manga/${this.id}/download`)
      .then((res) => {
        if (res.status === 409) { return; }

        if (res.status !== 200) {
          throw new Error('Failed to download manga');
        }

        button.classList.remove('downloading');
        window.location.reload();
      })
      .catch((e) => {
        console.error(e);
        button.classList.remove('downloading');
        window.clearInterval(this.downloadPollInterval);
        this.downloadPollInterval = null;
      });
  }

  render() {
    const chapter = this.props.chapter;
    let readOfflineButton;

    if (this.props.downloaded) {
      readOfflineButton = (
        <a className="Chapter-read button small" href={this.props.downloaded} onClick={openItem}>Read Offline</a>
      );
    } else {
      readOfflineButton = (
        <div className="Chapter-download button small" onClick={this.download}>Download </div>
      );
    }

    return (
      <div className="Chapter">
        <span className="label">{chapter.read ? '' : 'UN'}READ</span>
        <strong className="Chapter-name">{chapter.name}</strong>
        <div className='Chapter-toggle-read button small' onClick={this.toggleRead} >
          Mark as {chapter.read ? 'Un' : ''}read
        </div>
        {readOfflineButton}
      </div>
    );
  }
}

class ChapterList extends Component {
  render() {
    const chapters = this.props.chapters.map((chapter) => (
      <Chapter key={chapter.id} chapter={chapter} downloaded={this.props.downloads[chapter.id]} />
    ));
    return (
      <div className="ChapterList">
        {chapters}
      </div>
    );
  }
}

export default ChapterList;
