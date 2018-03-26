export default {
  isAuthenticated() {
    const token = window.localStorage.getItem('onedrivetoken');
    console.log(`get: ${token}`);
    return token && token.length;
  },

  handleAuthData(json) {
    console.log(`set: ${json.access_token}`);
    window.localStorage.getItem('onedrivetoken', json.access_token);
  }
};
