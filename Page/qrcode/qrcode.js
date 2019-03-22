const QRCode = require('../utils/weapp-qrcode.js')
import rpx2px from '../utils/rpx2px.js'
let qrcode;
const app = getApp();
const qrcodeWidth = rpx2px(500)
Page({
  data: {
    userInfo: {},
    timer: '',//定时器名字
    countDownNum: '60',//倒计时初始值
    hidQrcode:false,
    hidText:true,
    organization:app.globalData.Organization,
    trueName:app.globalData.Name,
    qrcodeWidth: qrcodeWidth,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  toRegister:function(e){
    wx.redirectTo({
      url: '/Page/choose/choose',
    })
  },
  countDown: function () {
    let that = this; 
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    let countMark=countDownNum   
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面    
    that.setData({      
      timer: setInterval(function () {
      //这里把setInterval赋值给变量名为timer的变量        
      //每隔一秒countDownNum就减一，实现同步        
      countDownNum--;        
      //然后把countDownNum存进data，好让用户知道时间在倒计着        
      that.setData({          
        countDownNum: countDownNum        })        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来        
        if(countDownNum+9<=countMark){
          countMark=countDownNum
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              var latitude = res.latitude
              var longitude = res.longitude
              console.log(res.latitude)
              console.log(res.longitude)
              let url = app.globalData.baseUrl + 'user/updateQrCodeInfo'
              let data = {
                latitude: res.latitude,
                longitude: res.longitude
              }
              app.appRequest('post', url, data, (res) => {
                console.log("已发送经纬信息")
              })
            }
          })
        }
        if (countDownNum == 0) {      
        clearInterval(that.data.timer);
        //关闭定时器之后，可作其他处理codes go here
        console.log("timeUp")
        that.setData({
          hidQrcode:true,
          hidText:false
        })
        }   
      }, 1000)    
    })  
  },
  
  reloadQrcode:function(e){
    wx.redirectTo({
      url: '/Page/qrcode/qrcode',
    })
  },
  changeQrcode:function(e){
    var that=this
    var auth
    wx.getStorage({
      key: 'Authorization',
      success: function (res) {
        console.log(1)
        console.log(res.data)
        auth = res.data
      },
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(res.latitude)
        console.log(res.longitude)
        let url = app.globalData.baseUrl + 'user/delqrcode'
        let data = {
          latitude: res.latitude,//30.540256,
          longitude: res.longitude//114.367483
        }
        var string
        wx.request({
          url: url,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': auth,
          },
          dataType: 'json',
          data: data,
          success: function (res) {
            console.log(res.data.data.string)
            that.setData({
              countDownNum: res.data.data.express_time
            })
            var qrcode = new QRCode('canvas', {
              // usingIn: this,
              text: res.data.data.string,
              width: qrcodeWidth,
              height: qrcodeWidth,
              colorDark: "black",
              colorLight: "white",
              correctLevel: QRCode.CorrectLevel.H,
            });
          }
        })
        console.log(string)
      }
    })
  },
  onLoad: function (options) {
    var that=this
    that.setData({userInfo:app.globalData.userInfo})
    wx.onUserCaptureScreen(function(res){
      let pages = getCurrentPages()
      console.log(pages)
      if (pages[pages.length - 1].route !== 'Page/qrcode/qrcode') {
        return
      }
      wx.showToast({
        title: '禁止截屏操作', 
        image: '../../images/fail.svg',
        duration: '2000'
      })
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          console.log(res.latitude)
          console.log(res.longitude)
          let url = app.globalData.baseUrl + 'user/delqrcode'
          let data = {
            latitude: res.latitude,//30.540256,
            longitude: res.longitude//114.367483
          }
          var string
          wx.request({
            url: url,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization': auth,
            },
            dataType: 'json',
            data: data,
            success: function (res) {
              console.log(res.data.data.string)
              that.setData({
                countDownNum: res.data.data.express_time
              })
              var qrcode = new QRCode('canvas', {
                // usingIn: this,
                text: res.data.data.string,
                width: qrcodeWidth,
                height: qrcodeWidth,
                colorDark: "black",
                colorLight: "white",
                correctLevel: QRCode.CorrectLevel.H,
              });
            }
          })
          console.log(string)
        }
      })
      
    })
    wx.getStorage({
      key: 'name',
      success: function(res) {
        that.setData({
          trueName:res.data
        })
      },
    })
    wx.getStorage({
      key: 'organization',
      success: function(res) {
        that.setData({
          organization: res.data
        })
      },
    })
    var auth
    wx.getStorage({
      key: 'Authorization',
      success: function(res) {
        console.log(1)
        console.log(res.data)
        auth=res.data

        let url=app.globalData.baseUrl+'user/getqrcode'
        var string
        wx.request({
          url: url,
          method: 'POST',
          header: {
            'content-type':  'application/x-www-form-urlencoded',
            'Authorization': auth,
          },
          dataType: 'json',
          data: {},
          success: function (res) {
            console.log(res.data.data.string)
            that.setData({
              countDownNum:res.data.data.express_time
            })
            console.log(that.data.countDownNum)
            var qrcode = new QRCode('canvas', {
              // usingIn: this,
              text: res.data.data.string,
              width: qrcodeWidth,
              height: qrcodeWidth,
              colorDark: "black",
              colorLight: "white",
              correctLevel: QRCode.CorrectLevel.H,
            });
          }
        })
      },
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(res.latitude)
        console.log(res.longitude)
        let url = app.globalData.baseUrl + 'user/updateQrCodeInfo'
        let data = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        app.appRequest('post', url, data, (res) => {
          console.log(res)
        })
      }
    })
        console.log(string)

    
  },
  onReady: function () {
    var that=this
    console.log("ready")
    setTimeout(function () {
      that.countDown();
    },
    2000)
  },

  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})