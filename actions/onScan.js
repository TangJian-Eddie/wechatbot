//  二维码生成
function onScan(qrcode) {
  require('qrcode-terminal').generate(qrcode); // 在console端显示二维码
  const qrcodeImageUrl = `https://wechaty.js.org/qrcode/${encodeURIComponent(
    qrcode
  )}`;
  console.log(qrcodeImageUrl);
}
module.exports = onScan;
