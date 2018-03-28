import React from 'react';
import onedrive from './odapi';
import {ipcRenderer} from './utils';
import './OnedriveOauth.css';
import icon from './onedrive.png';

ipcRenderer.on('onedrive-oauth-reply', function(event, json) {
  onedrive.handleAuthData(json);
  window.location.hash = '/';
});

function authenticate(event) {
  if (event.target.classList.contains('disabled')) { return; }

  event.target.classList.add('disabled');
  ipcRenderer.send('onedrive-oauth');
}

function OnedriveOauth(props) {
  if (onedrive.isAuthenticated()) { return null; }

  return (
    <button className="OnedriveOauth button" onClick={authenticate} style={{backgroundImage: `url(${icon})`}}></button>
  );
}

export default OnedriveOauth;
