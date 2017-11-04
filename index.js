const async = require('async');
const keys = require('./config/keys');
const PixivApi = require('./pixivApi/login');

const query = 'ラブライブ';

pixivApi = new PixivApi();
var login = false;

async function logUser() {
  // once you get the device_token, switch over to your own app?
  login = await pixivApi.login(keys.username, keys.password);
  
  if(login) {
    return login;
  } else {
    return false;
  }
}

//manipulate here
async function printUser() {
  var temp = await logUser();
  // console.log("this is temp", temp);
  return temp;
}

// attach a cookie or token or something to this

printUser().then((response) => {
  if(response) {
      console.log("this is the response", response);
  }
  // do redirection for routes here
});
