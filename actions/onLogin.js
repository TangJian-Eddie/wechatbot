const schedule = require('../utils/schedule');
const superagent = require('../api');
const config = require('../config');
const time = require('../utils/time');

function initSchedule(bot) {
  initGreetingSchedule(bot);
  initDrinkingSchedule(bot);
}
// 每天问候任务
async function initGreetingSchedule(bot) {
  const contact = await bot.Contact.find(config.GREET_ID);
  schedule.setSchedule(config.INIT_TIME, () => {
    initGreeting(bot);
  });
  schedule.setSchedule(config.OFFLINE_TIME, () => {
    contact.say(config.GOOD_NIGHT_GREETING);
  });
}

// 定时喝水任务
async function initDrinkingSchedule(bot) {
  const contact = await bot.Contact.find(config.GREET_ID);
  schedule.setSchedule(config.REMIND_TIME, () => {
    contact.say('到整点的喝水时间了');
  });
}

async function initGreeting(bot) {
  const one = await superagent.getOne(); // 获取每日一句
  const weather = await superagent.getBaiDuWeather(); // 获取天气信息
  const contact = await bot.Contact.find(config.GREET_ID);
  const content = `${config.NICKNAME}机器人上线了<br>今天是和${
    config.NICKNAME
  }相恋的第${time.getDay(config.MEMORIAL_DAY)}天<br>${one}<br>${weather}`;
  contact.say(content);
}

/**
 * 登录成功监听事件
 * @param {*} user 登录用户
 */
async function onLogin() {
  setTimeout(() => {
    // 由于存在QQ机器人，所以此处暂时注释
    // initSchedule(this);
    // initGreeting(this);
  }, 4000);
}

module.exports = onLogin;
