const axios = require('axios');
const qs = require('qs');

const BASE_URL = 'https://app-api.pixiv.net';
const CLIENT_ID = 'KzEZED7aC0vird8jWyHM38mXjNTY';
const CLIENT_SECRET = 'W9JZoJe00qPvJsiyCGT3CCtC6ZUtdpKpzMbNlUGP';
const filter = 'for_ios';

class PixivApi {
  constructor() {
    this.headers = {
      'App-OS': 'ios',
      'Accept-Language': 'en-us',
      'App-OS-Version': '9.3.3',
      'App-Version': '6.8.3',
      'User-Agent': 'PixivIOSApp/6.8.3 (iOS 9.0; iPhone8,2)',
    };
  }

  login(username, password, rememberPassword) {
    if (!username) {
      return Promise.reject(new Error('username required'));
    }
    if (!password) {
      return Promise.reject(new Error('password required'));
    }
    const data = qs.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      get_secure_url: 1,
      grant_type: 'password',
      username,
      password,
      device_token: 'pixiv',
    });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data
    };
    return axios('https://oauth.secure.pixiv.net/auth/token', options)
      .then(res => {
        this.auth = res.data.response;

        // console.log("this is this.auth", this.auth);

        this.rememberPassword = rememberPassword === false ? false : true;
        if (rememberPassword) {
          this.username = username;
          this.password = password;
        }
        return res.data.response;
      })
      .catch(err => {
        if (err.response) {
          throw err.response.data;
        } else {
          throw err.message;
        }
      });
  }
}

module.exports = PixivApi;