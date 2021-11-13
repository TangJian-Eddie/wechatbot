const path = require('path');
const { Message } = require('wechaty');
const config = require('../config');
const superagent = require('../api');
// const { dealErrorWrap } = require('../utils/errorHandler');
const { FileBox } = require('file-box');
const HUG_IMG = path.resolve(config.HUG_IMG);

const WEIXINOFFICIAL = [
  '朋友推荐消息',
  '微信支付',
  '微信运动',
  '微信团队',
  'Friend recommendation message',
]; // 微信官方账户，针对此账户不做任何回复
const DELETEFRIEND = '开启了朋友验证'; // 被人删除后，防止重复回复
const NEWADDFRIEND = '你已添加';
/**
 * 处理私聊消息事件
 * @description     1.自动回复 2. 垃圾分类
 * @param {*} bot   bot实例
 * @param {*} message  消息主体
 */
async function onPrivateMessage(bot, msg) {
  const contact = msg.talker();
  const message = msg.text();
  if (msg.type() === Message.Type.Text) {
    const alias = await contact.alias();
    if (config.RESPONSE_ID_LIST.includes(alias)) {
      // const res = message.includes('垃圾 ')
      //   ? await superagent.getRubbishType(message.replace('垃圾 ', ''))
      //   : await superagent.getTXAIAnswer(
      //       encodeURI(alias).replace(/%/g, ''),
      //       message
      //     );
      // await contact.say(res);
      // if (res === '你是最傻的屁') {
      //   const hugImg = FileBox.fromFile(HUG_IMG);
      //   await contact.say(hugImg);
      // }
    } else {
      const name = contact.name();
      if (
        message.includes(DELETEFRIEND) ||
        WEIXINOFFICIAL.includes(name) ||
        message.includes(NEWADDFRIEND)
      ) {
        return;
      }
      const reportContact = await bot.Contact.find(config.REPORT_ID);
      reportContact &&
        reportContact.say('有人给你发送私聊信息，请及时查看回复～');
    }
  }
}
/**
 * 处理群聊消息事件
 * @description     1. 群聊问答整理
 * @param {*} bot   bot实例
 * @param {*} msg   消息主体
 * @param {*} room  群聊
 */
async function onGroupMessage(bot, msg, room) {
  const topic = await room.topic();
  if (config.REMIND_GROUP_ID_LIST.includes(topic)) {
    if (msg.type() === Message.Type.Text) {
      const message = msg.text();
      if (/@Eddie/.test(message)) {
        const reportContact = await bot.Contact.find(config.REPORT_ID);
        reportContact.say(`有人在${topic}@你，请及时查看回复～`);
      }
    }
  }
  // if (config.RESPONSE_GROUP_ID_LIST.includes(room.topic)) {
  //   const type = msg.type();
  //   if (type === bot.Message.Type.Text) {
  //     const content = msg.text();
  //     // TODO 群问答整理
  //     // if(message.includes("提问 ")){
  //     // }
  //     // if(message.includes("回答 ")){
  //     // }
  //   }
  // }
}

async function onMessage(msg) {
  const room = msg.room(); // 是否为群消息
  const msgSelf = msg.self(); // 是否自己发给自己的消息
  if (msgSelf) return;
  if (room) {
    onGroupMessage(this, msg, room);
  } else {
    onPrivateMessage(this, msg);
  }
}

module.exports = onMessage;
