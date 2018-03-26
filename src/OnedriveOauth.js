import React from 'react';
import {ipcRenderer} from 'electron';
import onedrive from './odapi';

ipcRenderer.on('onedrive-oauth-reply', function() {
  window.location.hash = '/';
});

function authenticate() {
  ipcRenderer.send('onedrive-oatuh');
}

function OnedriveOauth(props) {
  if (onedrive.isAuthenticated()) { return; }

  return (
    <button class="OnedriveOauth" onClick={authenticate}>Sign in</button>
  );
}

export default OnedriveOauth;
