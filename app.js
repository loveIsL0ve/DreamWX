App({
  globalData:{
    jumpUrl:'',
    isBound:false,
    whuStdInfo:{},
    windowHeight:'',
    windowWidth:'',
    userInfo:{},
    IsStudent:null,
    Token:'',
    Name:'点击认证',
    Gender:'',
    Organization:'未认证',
    Department:'',
    birthDate:'',
    stdNum:'',
    Phone: '',
    Pwd:'',
    School:'',
    College:'',
    Major:'',
    Grade:'',
    Openid: '',
    baseUrl:"https://api.whusu.org/dream/v1/",
  },
  /**
   * methods： 请求方式
   * url: 请求地址
   * data： 要传递的参数
   * callback： 请求成功回调函数
   * errFun： 请求失败回调函数
   */
  appRequest(methods, url, data, callback) {
    var athration;
    wx.getStorage({
      key: 'Authorization',
      success: function(res) {
        athration=res.data
        wx.request({
          url: url,
          method: methods,
          header: {
            'content-type': methods == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
            'Authorization': athration,
          },
          dataType: 'json',
          data: data,
          success: function (res) {
            console.log("收包")
            console.log(res)
            callback(res.data);
          },
          fail: function (err) {
            console.log("err")
          }
        })
      },
    })
    
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);        // 屏幕宽度、高度        
        console.log('height=' + res.windowHeight);        
        console.log('width=' + res.windowWidth);        // 高度,宽度 单位为px              
        that.globalData.windowHeight=res.windowHeight,       
        that.globalData.windowWidth=res.windowWidth        
      }
    })

    wx.checkSession({
      success() {
        wx.getStorage({
          key: 'Authorization',
          success: function(res) {
            console.log("检查token"+res.data)
            if(res.data==undefined){
              wx.login({
                //重新登陆
                success: res => {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  if (res.code) {
                    let url = 'https://api.whusu.org/dream/v1/user/login'
                    wx.request({
                      url: url,
                      method: "POST",
                      data: {
                        code: res.code
                      },
                      dataType: JSON,
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function (res) {
                        var resp = JSON.parse(res.data)
                        console.log("app.js 获取" + resp.authorization)
                        wx.setStorage({
                          key: 'Authorization',
                          data: resp.authorization,
                        })
                      }
                    })
                  }
                }
              })
            }else{
              let url1 = 'https://api.whusu.org/dream/v1/base/checkAuthorization'
              var _authorization
              wx.getStorage({
                key: 'Authorization',
                success: function(res) {
                  _authorization:res.data
                },
              })
              console.log("mark" + _authorization)
              wx.request({
                url: url1,
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'Authorization': _authorization
                },
                data: {},
                dataType: 'json',
                success: function (r) {
                  console.log("checkauth数据" + r.data.code)
                  if (r.data.code == 0) {
                    console.log("not expired")
                  } else {
                    console.log("验证auth failed  重新申请")
                    wx.login({
                      success: res2 => {
                        let url3 = 'https://api.whusu.org/dream/v1/user/login'
                        wx.request({
                          url: url3,
                          method: "POST",
                          data: {
                            code: res2.code
                          },
                          dataType: JSON,
                          header: {
                            'content-type': 'application/json' // 默认值
                          },
                          success: function (res) {
                            var resp = JSON.parse(res.data)
                            console.log("app.js 获取" + resp.authorization)
                            wx.setStorage({
                              key: 'Authorization',
                              data: resp.authorization,
                            })
                          }
                        }) 
                      }
                    })
                  }
                }
              })
                  
            }
          },
        })
      },fail:function() {
        wx.login({
          //重新登陆
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              let url = 'https://api.whusu.org/dream/v1/user/login'
              wx.request({
                url: url,
                method: "POST",
                data: {
                  code:res.code
                },
                dataType: JSON,
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  var resp = JSON.parse(res.data)
                  console.log("app.js 获取"+resp.authorization)
                  wx.setStorage({
                    key: 'Authorization',
                    data: resp.authorization,
                  })
                  let url1 = 'https://api.whusu.org/dream/v1/base/checkAuthorization'
                  console.log("mark"+resp.authorization)
                  wx.request({
                    url: url1,
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded',
                      'Authorization': resp.authorization
                    },
                    data:{},
                    dataType: 'json',
                    success: function (r) {
                      console.log("checkauth数据"+r.data.code)
                      if (r.data.code == 0) {
                        console.log("not expired")
                      } else {
                        console.log("验证auth failed  重新申请")
                        wx.login({
                          success:res2=>{
                            let url3 = 'https://api.whusu.org/dream/v1/user/login'
                        wx.request({
                          url: url3,
                          method: "POST",
                          data: {
                            code: res2.code
                          },
                          dataType: JSON,
                          header: {
                            'content-type': 'application/json' // 默认值
                          },
                          success:function(res){
                            var resp = JSON.parse(res.data)
                            console.log("app.js 获取" + resp.authorization)
                            wx.setStorage({
                              key: 'Authorization',
                              data: resp.authorization,
                            })
                          }
                        })  

                          }
                        })



                      }
                    },
                    fail: function (err) {
                      console.log("connext failed")
                    }
                  })
                }
              })
            }
            
          }
        })
        
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },

  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
