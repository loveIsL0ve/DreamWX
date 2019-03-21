// pages/activity/sakura/index/index.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        signWay:true,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        user:{
            name:"姓名",
            organization:"部门"
        },
        signin:{
            switch:true,//是否有扫码权限
            work:false,//是否已经签到
            between:'下午时段',//工作时段
            work_hours:1.2,//工时数据 浮点数
            violation:false,//违规记录设定 false或者int
            ranking:2//工时排名数据 int
        }
    },
    switch1:function(e){
      var that=this
      that.setData({signWay:e.detail.value})
      console.log(e.detail.value)
    },
    scan(e){
      var _this=this
          if (!this.data.signWay) {
            console.log('用户点击signOut')
            wx.scanCode({
              success: (res) => {
                console.log(res)
                var codeInfo = res.result
                    let url = app.globalData.baseUrl + 'punchtheclock/addSignOutUser'
                    console.log(codeInfo)
                    let data = {
                      qr_info: codeInfo
                    }
                    app.appRequest('post', url, data, (res) => {
                      if (res.code = 0) {
                        if (res.type == 'OUT_MORNING_FAIL') {
                          wx.showToast({
                            title: '上午时段签退失败',
                            image: '../../images/fail.svg',
                          })
                          return
                        }
                        console.log(res)
                        wx.showToast({
                          title: '签退成功',
                        })
                      } else if (res.code == 30023) {
                        wx.showToast({
                          title: '还未签到，无法执行签退操作',
                          image: '../../images/fail.svg',
                        })
                      }else if(res.code==30024){
                        wx.showToast({
                          title: '未在指定区域签退',
                          image: '../../images/fail.svg',
                        })
                      }
                    })
              }
            })
          } else if (this.data.signWay) {
            console.log('用户点击signIn')
            wx.scanCode({
              success: (res) => {
                console.log(res)
                var codeInfo = res.result
                wx.getLocation({
                  type: 'gcj02',
                  success: function (res) {
                    var latitude = res.latitude
                    var longitude = res.longitude
                    console.log(res.latitude)
                    console.log(res.longitude)
                    let url = app.globalData.baseUrl + 'punchtheclock/addSignInUser'
                    console.log(codeInfo)
                    let data = {
                      latitude: latitude,
                      longitude: longitude,
                      qr_info: codeInfo
                    }
                    console.log()
                    app.appRequest('post', url, data, (res) => {
                      if (res.code == 0) {
                        wx.showToast({
                          title: '签到成功',
                        })
                      }else if(res.code==30020){
                        wx.showToast({
                          title: '不在活动签到时间区间内',
                          image: '../../images/fail.svg',
                        })
                      }else if(res.code==30021){
                        wx.showToast({
                          title: '用户二维码过期或失效',
                          image: '../../images/fail.svg',
                        })
                      }else if(res.code==30022){
                        wx.showToast({
                          title: '已经是工作状态无需签到',
                          image: '../../images/fail.svg',
                        })
                      }else if(res.code==30024){
                        wx.showToast({
                          title: '未在指定区域签到',
                          image: '../../images/fail.svg',
                        })
                      }
                    })
                  }
                })
              }
            })
            let url=app.globalData.baseUrl+'punchtheclock/getBaseInfo'
            app.appRequest('post',url,{},(res)=>{
              _this.setData({
                user:res.user,
                signin:res.signin
              })
            })
          }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let url = app.globalData.baseUrl +'punchtheclock/getBaseInfo'
      app.appRequest('post',url,{},(res)=>{
        console.log(res)
        this.setData({
          user:res.user,
          signin:res.signin
        })
        console.log("user+sgnin",this.data.user,this.data.signin)
      })
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
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

    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        alertModal({
            title: 'test',
            content: "test1"
        })
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})