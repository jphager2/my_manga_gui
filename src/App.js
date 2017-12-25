import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const manga = JSON.parse(`[{"id":1,"name":"Detective Conan","uri":"http://www.mangareader.net/detective-conan","read_count":1006,"total_count":1006,"created_at":"2017-09-09T23:17:03.166Z","updated_at":"2017-12-20T05:49:45.574Z"},{"id":2,"name":"Kingdom","uri":"http://www.mangareader.net/kingdom","read_count":541,"total_count":541,"created_at":"2017-09-09T23:17:52.667Z","updated_at":"2017-12-20T05:49:52.653Z"},{"id":3,"name":"One Piece","uri":"http://www.mangareader.net/one-piece","read_count":887,"total_count":887,"created_at":"2017-09-09T23:18:11.125Z","updated_at":"2017-12-20T05:49:58.310Z"},{"id":4,"name":"Onepunch-Man","uri":"http://www.mangareader.net/onepunch-man","read_count":131,"total_count":131,"created_at":"2017-09-09T23:18:24.540Z","updated_at":"2017-12-20T05:50:15.868Z"},{"id":29,"name":"Shokugeki no Soma","uri":"http://www.mangareader.net/shokugeki-no-soma","read_count":24,"total_count":243,"created_at":"2017-10-28T15:11:31.949Z","updated_at":"2017-12-20T05:50:23.849Z"},{"id":31,"name":"Bloody Monday","uri":"http://www.mangareader.net/bloody-monday","read_count":0,"total_count":96,"created_at":"2017-12-19T19:32:59.085Z","updated_at":"2017-12-19T19:32:59.643Z"},{"id":30,"name":"Hotel","uri":"http://www.mangareader.net/hotel","read_count":1,"total_count":1,"created_at":"2017-12-19T19:32:05.892Z","updated_at":"2017-12-19T19:33:34.257Z"},{"id":32,"name":"Soil","uri":"http://www.mangareader.net/soil","read_count":0,"total_count":82,"created_at":"2017-12-20T05:14:15.971Z","updated_at":"2017-12-20T05:14:16.535Z"},{"id":33,"name":"Eden: It's an Endless World!","uri":"http://www.mangareader.net/eden-its-an-endless-world","read_count":0,"total_count":18,"created_at":"2017-12-20T05:14:46.144Z","updated_at":"2017-12-20T05:14:46.250Z"}]`);

function Manga(props) {
  const url = props.href;
  const slug = url.split('/').reverse()[0];
  const image = url
    .replace('www.mangareader.net', 's0.mangareader.net')
    .replace(slug, `cover/${slug}/${slug}-l0.jpg`);

  return (
    <div className="manga">
      <img src={image} />
      <h2>{props.name}</h2>
      <p>{props.readCount} chapters read of {props.chapterCount}</p>
      <p><a href={props.href}>Read online</a></p>
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

  return items;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <MangaList manga={manga} />
      </div>
    );
  }
}

export default App;
