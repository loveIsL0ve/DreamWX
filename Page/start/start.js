// Page/start/start.js
const app=getApp()
Page({

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show:true

  },
  bindGetUserInfo: function (e) {
    var that = this
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      that.setData({
        show: false,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.redirectTo({
        url: '/Page/index/index',
      })
    } else {
      //用户按了拒绝按钮
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              console.log(1)
              app.globalData.userInfo = res.userInfo
              that.setData({
                userInfo: app.globalData.userInfo
              })
              //用户已经授权过
              setTimeout(function () {
                wx.reLaunch({ url: '../../Page/index/index', }) }, 
              2000)
            }
          })
        } else {
          that.setData({
            show: false
          })
        }
      }
    })
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
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