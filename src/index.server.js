const { exec } = require('child_process');
const shellescape = require('shell-escape');
const express = require('express');
const app = express();
const db = require('./db');

const port = process.env.PORT ? (parseInt(process.env.PORT) + 100) : 3000;

const REACT_ORIGIN = `http://localhost:${port}`;
const MY_MANGA_PATH = process.env.MY_MANGA_PATH || 'my_manga'

function cmd(...subCommand) {
  return shellescape([MY_MANGA_PATH, ...subCommand]);
}

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', REACT_ORIGIN);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/manga', (req, res) => {
  db('manga')
    .select('*')
    .then((manga) => {
      res.setHeader('Content-type', 'application/json');
      res.send(JSON.stringify(manga));
    })
    .catch((e) => {
      console.error(e);
      res.status(500).end();
    });
});

let updatingManga = false;

app.get('/manga/update', (req, res) => {
  res.status(updatingManga ? 409 : 200).end();
});

app.post('/manga/update', (req, res) => {
  if (updatingManga) {
    status = 409
  } else {
    status = 202
    updatingManga = true;
    exec(cmd('update'), (err, stdout, stderr) => {
      if (err) { console.error(err); }
      updatingManga = false;
    });
  }

  res.status(status).end();
});

app.get('/manga/:id', (req, res) => {
  db('manga')
    .select('*')
    .where({id: req.params.id})
    .limit(1)
    .then((manga) => {
      res.setHeader('Content-type', 'application/json');
      res.send(JSON.stringify(manga[0]));
    })
    .catch((e) => {
      console.error(e);
      res.status(500).end();
    });
});

app.get('/manga/:id/chapters', (req, res) => {
  db('chapters')
    .select('*')
    .where({manga_id: req.params.id})
    .orderBy('number', 'desc')
    .then((chapters) => {
      res.setHeader('Content-type', 'application/json');
      res.send(JSON.stringify(chapters));
    })
    .catch((e) => {
      console.error(e);
      res.status(500).end();
    });
});

let updatingSingleManga = {};

app.get('/manga/:id/update', (req, res) => {
  res.status(updatingSingleManga[req.params.id] ? 409 : 200).end();
});

app.post('/manga/:id/update', (req, res) => {
  const id = req.params.id;

  if (updatingSingleManga[id]) {
    status = 409
  } else {
    status = 202
    updatingSingleManga[id] = true;
    
    db('manga')
      .select('name')
      .where({id})
      .limit(1)
      .then((manga) => {
        exec(cmd('update', manga.name), (err, stdout, stderr) => {
          if (err) { console.error(err); }
          delete updatingSingleManga[id];
        });
      })
      .catch((e) => {
        console.error(e);
        delete updatingSingleManga[id];
      });
  }

  res.status(status).end();
});

app.listen(8999);
