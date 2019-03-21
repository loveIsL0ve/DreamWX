const app=getApp();
var width=''
var height=''
Page({
  data: {
    hid1:false,
    hid2:true,
    hid3:true,
    hid4:true,
    hid5:true,
    hid6:true,
    TabCur: 1,
    scrollLeft: 0,
    star: 5,
    show: false,
    startPoint:[0,0],
    startPoint1:[0,0],
    longitude: [],
    scale: 16,
    latitude: [],
    markers1:[],
    markers2:[],
    markers3: [],
    markers4: [],
    markers5: [],
    markers6: [],
    controls: [{
      id: 1,
      iconPath: '../../images/sub.jpg',
      position: {
        left: app.globalData.windowWidth-40,
        top: app.globalData.windowHeight-200,
        width: 20,
        height: 20
      },
      clickable: true
    },
    {
      id: 2,
      iconPath: '../../images/add.jpg',
      position: {
        left: app.globalData.windowWidth - 40,
        top: app.globalData.windowHeight - 230,
        width: 20,
        height: 20
      },
      clickable: true
    }],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  tabSelect(e) {
    console.log(e.currentTarget.dataset.id);
    wx.setStorageSync('markerid',e.currentTarget.dataset.id);
    if (e.currentTarget.dataset.id==1){
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
        hid1:false,
        hid2: true,
        hid3: true,
        hid4: true,
        hid5: true,
        hid6: true,
      })
    } else if (e.currentTarget.dataset.id == 2){
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
        hid1: true,
        hid2: false,
        hid3: true,
        hid4: true,
        hid5: true,
        hid6: true,
      })
    } else if (e.currentTarget.dataset.id == 3){
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
        hid1: true,
        hid2: true,
        hid3: false,
        hid4: true,
        hid5: true,
        hid6: true,
      })
    } else if (e.currentTarget.dataset.id == 4){
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
        hid1: true,
        hid2: true,
        hid3: true,
        hid4: false,
        hid5: true,
        hid6: true,
      })
    } else if (e.currentTarget.dataset.id == 5){
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
        hid1: true,
        hid2: true,
        hid3: true,
        hid4: true,
        hid5: false,
        hid6: true,
      })
    } else if (e.currentTarget.dataset.id == 6){
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
        hid1: true,
        hid2: true,
        hid3: true,
        hid4: true,
        hid5: true,
        hid6: false,
      })
    }
  },
  showRule: function () {
    this.setData({
      isRuleTrue: true
    })
  },
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
  },

  popdownStart: function (e) {
    this.setData({
      startPoint1: [e.touches[0].pageX, e.touches[0].pageY]
    })
  },
  popdownMove: function (e) {
    var curPoint = [e.touches[0].pageX, e.touches[0].pageY];
    var startPoint1 = this.data.startPoint1;
    if (curPoint[0] <= startPoint1[0]) {
      if (Math.abs(curPoint[0] - startPoint1[0]) < Math.abs(curPoint[1] - startPoint1[1])) {
        if (curPoint[1] > startPoint1[1]) {
          console.log(e.timeStamp + '-touch down')
          if(this.data.TabCur==1){
            this.setData({
              show: false,
              hid1: false,
              hid2: true,
              hid3: true,
              hid4: true,
              hid5: true,
              hid6: true,
            })
          }else if(this.data.TabCur==2){
            this.setData({
              show: false,
              hid2: false,
              hid1: true,
              hid3: true,
              hid4: true,
              hid5: true,
              hid6: true,
            })
          }else if(this.data.TabCur==3){
            this.setData({
              show: false,
              hid2: true,
              hid1: true,
              hid3: false,
              hid4: true,
              hid5: true,
              hid6: true,
            })
          }else if(this.data.TabCur==4){
            this.setData({
              show: false,
              hid2: true,
              hid1: true,
              hid3: true,
              hid4: false,
              hid5: true,
              hid6: true,
            })
          }else if(this.data.TabCur==5){
            this.setData({
              show: false,
              hid2: true,
              hid1: true,
              hid3: true,
              hid4: true,
              hid5: false,
              hid6: true,
            })
          }else if(this.data.TabCur==6){
            this.setData({
              show: false,
              hid2: true,
              hid1: true,
              hid3: true,
              hid4: true,
              hid5: true,
              hid6: false,
            })
          }
          
        }
      }
    } else {
      if (Math.abs(curPoint[0] - startPoint1[0]) < Math.abs(curPoint[1] - startPoint1[1])) {
        if (curPoint[1] > startPoint1[1]) {
          console.log(e.timeStamp + '-touch down')
          this.setData({
             show: false
          })
        }
      }
    }
  }, 
  putStart:function(e){
    this.setData({
      startPoint:[e.touches[0].pageX,e.touches[0].pageY]
    })
  },
  navigate:function(e){
    console.log(e.currentTarget.id)
    var ltude,latitude,name
    if(this.data.TabCur==1){
      ltude=this.data.markers1[e.currentTarget.id].longitude
      latitude=this.data.markers1[e.currentTarget.id].latitude
      name = this.data.markers1[e.currentTarget.id].name
    }else if(this.data.TabCur==2){
      ltude=this.data.markers2[e.currentTarget.id].longitude
      latitude=this.data.markers2[e.currentTarget.id].latitude
      name = this.data.markers2[e.currentTarget.id].name
    }else if(this.data.TabCur==3){
      ltude=this.data.markers3[e.currentTarget.id].longitude
      latitude=this.data.markers3[e.currentTarget.id].latitude
      name = this.data.markers3[e.currentTarget.id].name
    }else if(this.data.TabCur==4){
      ltude=this.data.markers4[e.currentTarget.id].longitude
      latitude=this.data.markers4[e.currentTarget.id].latitude
      name = this.data.markers4[e.currentTarget.id].name
    }else if(this.data.TabCur==5){
      ltude=this.data.markers5[e.currentTarget.id].longitude
      latitude=this.data.markers5[e.currentTarget.id].latitude
      name = this.data.markers5[e.currentTarget.id].name
    }else if(this.data.TabCur==6){
      ltude=this.data.markers6[e.currentTarget.id].longitude
      latitude=this.data.markers6[e.currentTarget.id].latitude
      name = this.data.markers6[e.currentTarget.id].name
    }
    wx.openLocation({
      latitude: latitude,
      longitude: ltude,
      scale: 18,
      name: name,
    })
  },
  putMove:function(e){
    var curPoint=[e.touches[0].pageX,e.touches[0].pageY];
    var startPoint=this.data.startPoint;
    if(curPoint[0]<=startPoint[0]){
      if(Math.abs(curPoint[0]-startPoint[0])<Math.abs(curPoint[1]-startPoint[1])){
        if(curPoint[1]<startPoint[1]){
          console.log(e.timeStamp+'-touch up move')
          this.setData({
            show: true,
            showModalStatus:false,
            hid1: true,
            hid2: true,
            hid3: true,
            hid4: true,
            hid5: true,
            hid6: true,
          })
        }
      }
    }else{
      if (Math.abs(curPoint[0] - startPoint[0]) < Math.abs(curPoint[1]-startPoint[1])){
        if(curPoint[1]<startPoint[1]){
          console.log(e.timeStamp + '-touch up move')
          this.setData({
            show:true,
            showModalStatus:false,
            hid1: true,
            hid2: true,
            hid3: true,
            hid4: true,
            hid5: true,
            hid6: true,
          })
        }
      }
    }
  },
  onClose() {
    this.setData({ show: false });
  },
  onLoad: function (options) {
    var that=this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = 30.5354440000//res.latitude//30.5354440000,114.3634280000
        var longitude = 114.3634280000//res.longitude
        var marker1 = new Array();
        var marker2 = new Array();
        var marker3 = new Array();
        var marker4 = new Array();
        var marker5 = new Array();
        var marker6 = new Array();
        var markers = new Array();
        //数据库读取标记信息
        var info1
        var info2
        var info3
        var info4
        var info5
        var info6
        let getMapInfoUrl = app.globalData.baseUrl +'sakura/getAllPositionList'
        app.appRequest('post',getMapInfoUrl,{},(res)=>{
          console.log(res.data)
          for(var i=0;i<6;i++){
            for(var j=0;res.data[i][j]!=undefined;j++){
              if(i==0){
                info1=res.data[i][j]
                marker1.push(info1)
              }else if(i==1){
                info2=res.data[i][j]
                marker2.push(info2)
              }else if(i==2){
                marker3.push(res.data[i][j])
              }else if(i==3){
                marker4.push(res.data[i][j])
              }else if(i==4){
                marker5.push(res.data[i][j])
              }else if(i==5){
                marker6.push(res.data[i][j])
              }
            }
          }
          that.setData({
            markers1: marker1,
            markers2: marker2,
            markers3: marker3,
            markers4: marker4,
            markers5: marker5,
            markers6: marker6,
            latitude: latitude,
            longitude: longitude,
          })
          console.log(that.data.markers1)
          console.log(that.data.markers2)
          console.log(that.data.markers3)
          console.log(that.data.markers4)
          console.log(that.data.markers5)
          console.log(that.data.markers6)
        })

      },
      fail: function (err) {
       },//请求失败
      complete: function () { 
        
      },//请求完成后执行的函数
      
    })
  },

  //显示对话框
  showModal: function (event) {
    console.log(event.markerId);
    var i = event.markerId;
    /*var url = app.url + 'Api/Api/get_shop_dp_detail&PHPSESSID=' + wx.getStorageSync('PHPSESSID');
    var that = this;
    console.log('====get_detail====')
    wx.request({
      url: url,
      data: {
        id: i,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log(res);
        that.setData({
          myall: res.data.data
        });
      }
    });*/

    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  regionchange(e) {
    console.log("regionchange===" + e.type)
  },
  distance: function (la1, lo1, la2, lo2) { 
    var La1 = la1 * Math.PI / 180.0; 
    var La2 = la2 * Math.PI / 180.0; 
    var La3 = La1 - La2; 
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0; 
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2))); 
    s = s * 6378.137; 
    s = Math.round(s * 10000) / 10000; 
    s = s.toFixed(2); return s; 
  },
  //点击markers
  markertap(e) {
    var that=this
    console.log(e.markerId)
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
    if(that.data.TabCur==1){
      var distance = that.distance(res.latitude, res.longitude, that.data.markers1[e.markerId].latitude, that.data.markers1[e.markerId].longitude);
      that.setData({
        showModalStatus: true,
        navigateId:e.markerId,
        name: that.data.markers1[e.markerId].name,
        imgUrl: that.data.markers1[e.markerId].imgUrl,
        diming: that.data.markers1[e.markerId].name,
        star: that.data.markers1[e.markerId].starIndex,
        introduction: that.data.markers1[e.markerId].introduce,
        straightDis:distance
      })
    }else if(that.data.TabCur==2){
      var distance = that.distance(res.latitude, res.longitude, that.data.markers2[e.markerId].latitude, that.data.markers2[e.markerId].longitude);
      that.setData({
        showModalStatus: true,
        name: that.data.markers2[e.markerId].name,
        imgUrl: that.data.markers2[e.markerId].imgUrl,
        diming: that.data.markers2[e.markerId].name,
        star: that.data.markers2[e.markerId].starIndex,
        introduction: that.data.markers2[e.markerId].introduce,
        straightDis:distance
      })
    }else if(that.data.TabCur==3){
      var distance = that.distance(res.latitude, res.longitude, that.data.markers3[e.markerId].latitude, that.data.markers3[e.markerId].longitude);
      that.setData({
        showModalStatus: true,
        name: that.data.markers3[e.markerId].name,
        imgUrl: that.data.markers3[e.markerId].img_url,
        diming: that.data.markers3[e.markerId].name,
        star: that.data.markers3[e.markerId].starIndex,
        introduction:that.data.markers3[e.markerId].introduce,
        straightDis:distance
      })
    }else if(that.data.TabCur==4){
      var distance = that.distance(res.latitude, res.longitude, that.data.markers4[e.markerId].latitude, that.data.markers4[e.markerId].longitude);
      that.setData({
        showModalStatus: true,
        name: that.data.markers4[e.markerId].name,
        imgUrl: that.data.markers4[e.markerId].imgUrl,
        diming: that.data.markers4[e.markerId].name,
        star: that.data.markers4[e.markerId].starIndex,
        introduction: that.data.markers4[e.markerId].introduce,
        straightDis:distance
      })
    }else if(that.data.TabCur==5){
      var distance = that.distance(res.latitude, res.longitude, that.data.markers5[e.markerId].latitude, that.data.markers5[e.markerId].longitude);
      that.setData({
        showModalStatus: true,
        name: that.data.markers5[e.markerId].name,
        imgUrl: that.data.markers5[e.markerId].imgUrl,
        diming: that.data.markers5[e.markerId].name,
        star: that.data.markers5[e.markerId].starIndex,
        introduction: that.data.markers5[e.markerId].introduce,
        straightDis:distance
      })
    }else if(that.data.TabCur==6){
      var distance = that.distance(res.latitude, res.longitude, that.data.markers6[e.markerId].latitude, that.data.markers6[e.markerId].longitude);
      that.setData({
        showModalStatus: true,
        name: that.data.markers6[e.markerId].name,
        imgUrl: that.data.markers6[e.markerId].imgUrl,
        diming: that.data.markers6[e.markerId].name,
        star: that.data.markers6[e.markerId].starIndex,
        introduction: that.data.markers6[e.markerId].introduce,
        straightDis:distance
      })
    }
    }
    })
  },
  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    console.log("scale===" + this.data.scale)
    if (e.controlId === 1) {
      // if (this.data.scale === 13) {
      that.setData({
        scale: --this.data.scale
      })
    } else {
      //  if (this.data.scale !== 13) {
      that.setData({
        scale: ++this.data.scale
      })
    }
  },
  
  onReady: function () {
   
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