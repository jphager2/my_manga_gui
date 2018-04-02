// TODO: Think about using https://github.com/mawie81/electron-oauth2
// Code based on https://www.manos.im/blog/electron-oauth-with-github/

const {ipcMain, BrowserWindow} = require('electron');
const fetch = require('node-fetch');
const logger = require('./logger')(0);
const config = require('./onedrive.config.json');
let authWindow;

function handleAuthenticationCallback(url, resolve) {
  const raw_code = /code=([^&]*)/.exec(url) || null;
  const code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
  const error = /\?error=(.+)$/.exec(url);

  if (code || error) {
    authWindow.destroy();
  }

  if (code) {
    requestToken(code).then(resolve);
  } else if (error) {
    logger.error('Could not get code from onedrive.');
  }
}

function requestToken(code) {
  const tokenUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/token`;
  const body = `client_id=${config.clientId}&client_secret=${encodeURIComponent(config.clientSecret)}&redirect_uri=${encodeURIComponent(config.redirectUri)}&code=${encodeURIComponent(code)}&grant_type=authorization_code`;
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'accepts': 'application/json'
  };

  return fetch(tokenUrl, {method: 'POST', headers, body})
    .then(res => {
      logger.debug(`res.status: ${res.status}`);

      if (res.status !== 200) {
        throw new Error('Failed to get token.');
      }

      return res.json();
    })
    .then(json => {
      logger.debug(JSON.stringify(json));
      return json;
    })
    .catch(e => logger.error(e.message || e));
}

function authenticate() {
  return new Promise((resolve, reject) => {
    authWindow = new BrowserWindow({
      width: 880,
      height: 600,
      show: false,
      'node-integration': false
    });

    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${config.clientId}&scope=${encodeURIComponent(config.scope)}&redirect_uri=${encodeURIComponent(config.redirectUri)}&response_type=code`;

    authWindow.loadURL(authUrl);
    authWindow.show();

    authWindow.webContents.on('will-navigate', function(event, url) {
      handleAuthenticationCallback(url, resolve);
    });

    authWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl) {
      handleAuthenticationCallback(newUrl, resolve);
    });

    authWindow.on('close', function() {
      authWindow = null;
    }, false);
  });
}

function refresh(refreshToken) {
  const tokenUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/token`;
  const body = `client_id=${config.clientId}&client_secret=${encodeURIComponent(config.clientSecret)}&redirect_uri=${encodeURIComponent(config.redirectUri)}&refresh_token=${encodeURIComponent(refreshToken)}&grant_type=refresh_token`;
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'accepts': 'application/json'
  };

  return fetch(tokenUrl, {method: 'POST', headers, body})
    .then(res => {
      logger.debug(`res.status: ${res.status}`);

      if (res.status !== 200) {
        throw new Error('Failed to get token.');
      }

      return res.json();
    })
    .then(json => {
      return json;
    })
    .catch(e => logger.error(e.message || e));
}

ipcMain.on('onedrive-oauth', (event) => {
  authenticate().then(json => {
    event.sender.send('onedrive-oauth-reply', json);
  });
});

ipcMain.on('onedrive-oauth-refresh', (event, refreshToken) => {
  refresh(refreshToken).then(json => {
    event.sender.send('onedrive-oauth-refresh-reply', json);
  });
});
