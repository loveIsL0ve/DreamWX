//获取应用实例
const app = getApp()
Page({
    data: {
        indexList:[],
        array:[],
        hidcourses:false,
        trueName:app.globalData.Name,
        trueCollage:app.globalData.College,
        show:false,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        iconList:[],
        /*iconList: [{
            icon: 'cardboardfill',
            color: 'red',
            badge: 120,
            name: 'VR',
            id:0,
            event: {
                type: 'link',
                value: 'pages/index'
            }
        }, {
            icon: 'recordfill',
            color: 'orange',
            badge: 1,
            name: '樱花季',
            id:1,
        }, {
            icon: 'picfill',
            color: 'yellow',
            badge: 0,
            name: '志愿者系统',
            id:2,
        }, {
            icon: 'noticefill',
            color: 'olive',
            badge: 22,
            name: '二维码',
            id:3,
        }, {
            icon: 'upstagefill',
            color: 'cyan',
            badge: 0,
            name: '排行榜',
            id:4,
        }, {
            icon: 'clothesfill',
            color: 'blue',
            badge: 0,
            name: '皮肤',
            id:5,
        }, {
            icon: 'discoverfill',
            color: 'purple',
            badge: 0,
            name: '发现',
            id:6,
        }, {
            icon: 'questionfill',
            color: 'mauve',
            badge: 0,
            name: '帮助',
            id:7,
        }],*/
        gridCol: 4,//九宫格列数
        skin: false,
        DotStyle: true//轮播图配置
    },
    updateCourses(e) {
      var that=this
      let coursesUrl = app.globalData.baseUrl + 'course/getnowcourse'
      app.appRequest('post', coursesUrl, {}, (res) => {
        console.log( res.data)
        if (res.code == 0) {
          that.setData({
            type: res.data.type,
            className: res.data.className,
            teacher: res.data.teacher,
            address: res.data.address
          })
        } else {
          that.setData({
            hidcourses: true
          })
        }
      })
    },
    iconApp(event) {
      console.log(event.target.dataset)
      if(event.target.dataset.event=='page'){
        wx.navigateTo({
          url: event.target.dataset.value,
        })
      }else if(event.target.dataset.event=='link'){
        var authorization
        wx.getStorage({
          key: 'authorization',
          success: function(res) {
            authorization=res.data
            let url = event.target.dataset.value
            wx.navigateTo({
              url: url,
            })
          },
        })
      }else if(event.target.dataset.event=='talk'){
        wx.navigateTo({
          url: '/Page/component/kefu/kefu',
        })
      }
    },
    toRegister(e){
      if(app.globalData.isBound==false){
      wx.navigateTo({
        url: '/Page/choose/choose',
      })
      }
    },
  onClose() {
    this.setData({ show: true });
  },
    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
  toMomentsPage:function(e){
    console.log(e.currentTarget.dataset.name)
    app.globalData.jumpUrl=e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/Page/component/out/out',
    })
  },
    onLoad: function () {
      var that=this
      let getMomentUrl=app.globalData.baseUrl+'base/getcampusdynamics'
      app.appRequest('post',getMomentUrl,{},(res)=>{
        
        console.log(res.data)
        that.setData({
          array:res.data,
        })
      })
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
                console.log(1)
                app.globalData.userInfo = res.userInfo
                that.setData({
                  userInfo : app.globalData.userInfo
                })
                //用户已经授权过
              }
            })
          } else {
            that.setData({
              show: true
            })
          }
        }
      })
      var auh;
      var _enc;
      var _iv;
      wx.getStorage({
        key: 'Authorization',
        success: function (resp) {
          auh = resp.data;
        },
      })
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
                console.log("index.js 获取" + resp.authorization)
                wx.setStorage({
                  key: 'Authorization',
                  data: resp.authorization,
                })
              }
            })
          }
        }
      })
      let url = app.globalData.baseUrl + 'user/fastBinding'
      let data = {
        encryptedData: _enc,
        iv: _iv
      }
      app.appRequest('post', url, data, (res) => {
        //var resp = JSON.parse(res.data)
        if (res.code == 0) {
          app.globalData.isBound=true;
          console.log(res.msg)
          let url1 = app.globalData.baseUrl + 'user/getinfo'
          app.appRequest('post', url1, {}, (res) => {
            app.globalData.Name = res.data.name,
            app.globalData.Oranization = res.data.oranization
            console.log(res.data.name)
          })
        }
      })
      let urlGetInfo = app.globalData.baseUrl + 'user/getinfo'
      app.appRequest('post', urlGetInfo, {}, (response) => {
        console.log(response.data.app)
        if (response.code == 0) {
          app.globalData.isBound=true;
          that.setData({
            trueName: response.data.name,
            trueCollage: response.data.college,
            iconList: response.data.app
          })
          wx.setStorage({
            key: 'name',
            data: response.data.name,
          })
          wx.setStorage({
            key: 'organization',
            data: response.data.organization,
          })
        }
      })/*
      if(app.globalData.Name!=null){
        app.globalData.isBound=true;
      }*/
      let coursesUrl = app.globalData.baseUrl +'course/getnowcourse'
      app.appRequest('post',coursesUrl,{},(res)=>{
        if(res.data.type=='none'){
          that.setData({hidcourses:true})
          return 
        }
        console.log("获取courses信息"+res.data)
        if(res.code==0){
        that.setData({
          type:res.data.type,
          className:res.data.className,
          teacher:res.data.teacher,
          address:res.data.address
        })
        }else{
          that.setData({
            hidcourses:true
          })
        }
      })
    },
    getUserInfo: function (e) {
      var that=this
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo

        alertModal({
            title:'test',
            content:"test1"
        })
          var auh;
          var _enc;
          var _iv;
          wx.getStorage({
            key: 'Authorization',
            success: function (resp) {
              auh = resp.data;
            },
          })
          wx.getUserInfo({
            success: function (res) {
              var th=that
              _enc = res.encryptedData,
                _iv = res.iv
              app.globalData.userInfo = res.userInfo

              console.log("1"+this.data.userInfo)
            }
          })
          let url = app.globalData.baseUrl + 'user/fastBinding'
          let data = {
            encryptedData: _enc,
            iv: _iv
          }
          app.appRequest('post', url, data, (res) => {
            //var resp = JSON.parse(res.data)
            if (res.code == 0) {
              console.log(res.msg)
              let url1 = app.globalData.baseUrl + 'user/getinfo'
              app.appRequest('post', url1, {}, (res) => {
                app.globalData.Name = res.data.name,
                app.globalData.Oranization = res.data.oranization
                console.log(res.data.name)
              })
            }
          })


    }
})
