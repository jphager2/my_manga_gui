import React, { Component } from 'react';
import './MangaList.css';

let shell;

if (window.require) {
  const electron = window.require('electron');
  const fs = electron.remote.require('fs');
  shell = electron.shell;
}

function openExternal(e) {
  const url = e.target.getAttribute('href');

  if (!shell) { return; }
  e.preventDefault();
  shell.openExternal(url);
}

function Manga(props) {
  const url = props.href;
  const slug = url.split('/').reverse()[0];
  const image = url
    .replace('www.mangareader.net', 's0.mangareader.net')
    .replace(slug, `cover/${slug}/${slug}-l0.jpg`);

  return (
    <div className="Manga">
      <div className="Manga-cover">
        <img src={image} />
      </div>
      <div className="Manga-info">
        <h2 className="Manga-title">{props.name}</h2>
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
  )
}

function MangaList(props) {
  const { manga } = props;
  const items = manga.map((item) => (
    <Manga
      key={item.id.toString()}
      name={item.name}
      href={item.uri}
      chapterCount={item.total_count}
      readCount={item.read_count}
    />
  ));

  return (
    <div className="MangaList">{items}</div>
  );
}

export default MangaList;
