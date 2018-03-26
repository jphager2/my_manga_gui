import React from 'react';
import onedrive from './odapi';
import {ipcRenderer} from './utils';

ipcRenderer.on('onedrive-oauth-reply', function(json) {
  console.log(`json: ${JSON.stringify(json)}`);
  onedrive.handleAuthData(json);
  window.location.hash = '/';
});

function authenticate() {
  ipcRenderer.send('onedrive-oauth');
}

function OnedriveOauth(props) {
  if (onedrive.isAuthenticated()) { return; }

  return (
    <button className="OnedriveOauth button" onClick={authenticate}>Sign in</button>
  );
}

export default OnedriveOauth;
