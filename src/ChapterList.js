import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './ChapterList.css';

class Chapter extends Component {
  render() {
    const chapter = this.props.chapter;

    return (
      <div className="Chapter">
        <span className="label">{chapter.read ? '' : 'UN'}READ</span>
        <strong className="Chapter-name">{chapter.name}</strong>
        <div className="Chapter-toggle-read button small">
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
