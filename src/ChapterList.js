import React, { Component } from 'react';
import './ChapterList.css';

class Chapter extends Component {
  constructor(props) {
    super(props);
    this.toggleRead = this.toggleRead.bind(this);
  }

  toggleRead(e) {
    const chapter = this.props.chapter;
    const url = `http://localhost:8999/chapters/${chapter.id}/read`
    const button = e.target;

    fetch(url, {method: chapter.read ? 'DELETE' : 'POST'})
      .then((res) => {
        if (res.status === 200) {
          chapter.read = !chapter.read;
          button.innerText = `Mark as ${chapter.read ? 'Un' : ''}read`;
        }
      })
  }

  render() {
    const chapter = this.props.chapter;

    return (
      <div className="Chapter">
        <span className="label">{chapter.read ? '' : 'UN'}READ</span>
        <strong className="Chapter-name">{chapter.name}</strong>
        <div className='Chapter-toggle-read button small' onClick={this.toggleRead} >
          Mark as {chapter.read ? 'Un' : ''}read
        </div>
        <div className="Chapter-download button small">Download</div>
      </div>
    );
  }
}

class ChapterList extends Component {
  render() {
    const chapters = this.props.chapters.map((chapter) => (
      <Chapter key={chapter.id} chapter={chapter} />
    ));
    return (
      <div className="ChapterList">
        {chapters}
      </div>
    );
  }
}

export default ChapterList;
