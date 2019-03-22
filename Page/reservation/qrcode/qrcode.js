// Page/reservation/qrcode/qrcode.js
const QRCode = require('../../utils/weapp-qrcode.js');
import rpx2px from '../../utils/rpx2px.js';
let qrcode;
const app = getApp();
const qrcodeWidth = rpx2px(350)
Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    qrcodeWidth: qrcodeWidth,
  },

  onLoad: function (options) {
    var qrcode = new QRCode('canvas', {
      text: options.id+'&'+options.encrypt,
      width: qrcodeWidth,
      height: qrcodeWidth,
      colorDark: "black",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },


})