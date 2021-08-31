const { Friendship } = require('wechaty');
const { delay } = require('../utils/time');
const config = require('../config');
/**
 * 自动通过好友申请
 */
async function onFriend(friendship) {
  if (friendship.type() === Friendship.Type.Receive) {
    // 30秒后将会自动通过好友请求
    // TODO 配置通过关键词
    await delay(30000);
    await friendship.accept();
    await delay(3000);
    const contact = friendship.contact();
    const room = await this.Room.find({ topic: config.AUTO_ADD_GROUP });
    room && room.add(contact);
  }
}

module.exports = onFriend;
