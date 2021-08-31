const { Wechaty } = require('wechaty');
const name = 'wechat-puppet-wechat';
// generate xxxx.memory-card.json and save login data for the next login
const bot = new Wechaty({ name });
const onLogin = require('./actions/onLogin');
const onScan = require('./actions/onScan');
const onFriend = require('./actions/onFriend');
const onMessage = require('./actions/onMessage');
const onError = require('./actions/onError');

bot
  .on('scan', onScan)
  .on('login', onLogin)
  .on('friendship', onFriend)
  .on('message', onMessage)
  .on('error', onError);

bot
  .start()
  .then(() => {
    console.log('开始登陆微信');
  })
  .catch(async function () {
    await bot.stop();
  });
