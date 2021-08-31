module.exports = {
  AUTO_ADD_GROUP: '前端互助学习帮', // 好友申请通过自动添加群名
  RESPONSE_GROUP_ID_LIST: ['前端互助学习帮'], // 群聊功能群组列表
  REMIND_GROUP_ID_LIST: ['前端互助学习帮'], // 群聊@提醒群组列表
  RESPONSE_ID_LIST: ['小臭屁屁', '大臭屁屁'], // 私聊专属功能账号列表（为了避免重复，此处为alias）
  GREET_ID: { alias: '小臭屁屁' }, // 问候账号
  REPORT_ID: { alias: '大臭屁屁' }, // 告警账号
  NICKNAME: '臭屁屁', // 问候昵称
  GOOD_NIGHT_GREETING: '不知不觉又到了一天说再见的时间了，臭屁屁早些休息哦~',
  MEMORIAL_DAY: '2018/02/08',
  CITY: '香港',
  HUG_IMG: './assets/EAB1F74492BB2AE64127D8C567F2364A.gif',
  INIT_TIME: { minute: 30, hour: 6 }, //上线问候发送时间 每天6点30分发送
  // 提醒喝水时间
  REMIND_TIME: {
    second: 30,
    minute: 0,
    hour: [7, 9, 13, 16, 18, 21],
  },
  OFFLINE_TIME: { minute: 30, hour: 22 }, //下线问候发送时间 每天10点30分发送
  AI_APPID: '39591aab6aa529fcdfa4539d4e28f259', // 思知机器人
  TXAPIKEY: 'ddd77119351e8e8b0d016e5a604a84b0', // 天行接口
  MAX_RETRY_TIME: 3, // 错误重试最大次数
};
