export default {
  isAuthenticated() {
    const token = window.localStorage.getItem('onedrive.token');
    const expiresAt = window.localStorage.getItem('onedrive.expiresAt');

    if (Date.now() > expiresAt) { return false; }

    return token && token.length;
  },

  handleAuthData(json) {
    console.log(json);
    const expiresAt = Date.now() + json.expires_in * 1000;

    window.localStorage.setItem('onedrive.token', json.access_token);
    window.localStorage.setItem('onedrive.expiresAt', expiresAt);
    window.localStorage.setItem('onedrive.refreshToken', json.refresh_token);
  }
};
