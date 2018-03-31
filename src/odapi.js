import {ipcRenderer} from './utils';

function clearAuthData() {
  window.localStorage.removeItem('onedrive.token');
  window.localStorage.removeItem('onedrive.expiresAt');
  window.localStorage.removeItem('onedrive.refreshToken');
}

export default {
  isAuthenticated() {
    const token = window.localStorage.getItem('onedrive.token');
    const expiresAt = window.localStorage.getItem('onedrive.expiresAt');
    const refreshToken = window.localStorage.getItem('onedrive.refreshToken');

    if (Date.now() > expiresAt) {
      if (refreshToken) {
        ipcRenderer.send('onedrive-oauth-refresh', refreshToken);

        return true;
      }

      return false;
    }

    return token && token.length;
  },

  handleAuthData(json) {
    if (!json) {
      clearAuthData();
      return;
    }

    const expiresAt = Date.now() + json.expires_in * 1000;

    window.localStorage.setItem('onedrive.token', json.access_token);
    window.localStorage.setItem('onedrive.expiresAt', expiresAt);
    window.localStorage.setItem('onedrive.refreshToken', json.refresh_token);
  }
};
