// Adapted from https://tanaikech.github.io/2017/08/15/uploading-files-to-onedrive-using-node.js/

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const {ipcMain} = require('electron');

const logger = require('./logger')(0);
const config = require('./onedrive.config.json');

function resUpload(token, filepath){
  const filename = path.basename(filepath)
  const url = 'https://graph.microsoft.com/v1.0/drive/special/approot:/' + filename + ':/createUploadSession';
  const headers = {
    'Authorization': "Bearer " + token,
    'Content-Type': "application/json",
  };
  const body = '{"item": {"@microsoft.graph.conflictBehavior": "replace", "name": "' + filename + '"}}';
  logger.debug(`url: ${url}`);
  logger.debug(`body: ${body}`);

  return fetch(url, { method: 'POST', headers, body })
    .then(res => {
      logger.debug(`res.status: ${res.status}`);

      if (res.status !== 200) {
        res.json().then(json => {
          logger.debug(`res.body: ${JSON.stringify(json)}`);
          throw new Error('Failed to get upload session.');
        });
        // throw new Error('Failed to get upload session.');
      }

      return res.json();
    })
    .then(json => uploadFile(json.uploadUrl, filepath))
}

function uploadFile(uploadUrl, filepath) { // Here, it uploads the file by every chunk.
  const slices = getparams(filepath).map((st) => {
    return new Promise((resolve, reject) => {
      logger.debug('Uploading file');
      setTimeout(function() {
        fs.readFile(filepath, function read(e, f) {
          let headers = {
            'Content-Length': st.clen,
            'Content-Range': st.cr,
          };
          let body = f.slice(st.bstart, st.bend + 1);

          fetch(uploadUrl, { method: 'PUT', headers, body })
            .then(res => {
              logger.debug(`res.status: ${res.status}`);

              if (res.status.toString()[0] !== '2') {
                throw new Error('Failed to upload part.');
              }
            })
            .then(resolve)
            .catch(reject)
        });
      }, st.stime);
    });
  });

  return Promise.all(slices);
}

// TODO: Use some readable variable names
function getparams(filepath){
  const allsize = fs.statSync(filepath).size;
  const sep = allsize < (60 * 1024 * 1024) ? allsize : (60 * 1024 * 1024) - 1;
  const ar = [];
  for (let i = 0; i < allsize; i += sep) {
    let bstart = i;
    let bend = i + sep - 1 < allsize ? i + sep - 1 : allsize - 1;
    let cr = 'bytes ' + bstart + '-' + bend + '/' + allsize;
    let clen = bend != allsize - 1 ? sep : allsize - i;
    let stime = allsize < (60 * 1024 * 1024) ? 5000 : 10000;
    ar.push({
      bstart : bstart,
      bend : bend,
      cr : cr,
      clen : clen,
      stime: stime,
    });
  }
  return ar;
}

ipcMain.on('onedrive-upload', (event, token, filepath) => {
  resUpload(token, filepath)
    .then(() => {
      event.sender.send('onedrive-upload-success');
    })
    .catch(e => {
      logger.error(e.message || e);
      event.sender.send('onedrive-upload-failed');
    });
});
