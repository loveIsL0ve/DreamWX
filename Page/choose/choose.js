const app = getApp();
Page({
  data: {
    e2:0,
    hidBinding:true,
    multiArray: [[], []],
    multiIndex: [0, 0],
    xiaoquList: [],
    sidList: [],
    didList: [],
    xiaoquArr: [],
    _school: '未选择',
    _degree: '未选择',
    Sid: 2,
    Did: 173,
    isStopBodyScroll:true,
    list1:[],
    list2:[],
    hidVerCode:true,
    showPhoneNum:"请点击自动获取",
    time: "获取验证码",
    verificationCode:'',
    suffix: '',
    isStudent: false,
    name:'',
    gender:1,
    Num:'',
    password:'',
    phone:'',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    date: '2000-01-01',
    isChecked: false,
    isAccount: false,
    isHidden:true,
    index: 0,
    S0:true,
    S1:true,
    S2:false,
    S3:false,
    S4:false,
    S6:false,
  },

  formsubmit:function(e){
    var _this = this
    _this.setData({hidBinding:false})
    wx.getUserInfo({
      success: function (res) {
        console.log(res.encryptedData)
        console.log(res.iv)
        /*if(_this.data.Sid!=2){
          wx.showModal({
            title: '绑定未成功',
            content: 'failed',
            duration: 2000
          })
          return
        } */
        if (!_this.data.verificationCode || !_this.data.phone) {
          wx.showModal({
            title: '绑定未成功',
            content: 'failed',
            duration: 2000
          })
          _this.setData({hidBinding:true})
          return;
        }
        let url = app.globalData.baseUrl + 'user/binding'
        var data1 = {
          encryptedData:res.encryptedData,
          iv:res.iv,
          school:_this.data.Sid,
          name:_this.data.name,
          born_date:_this.data.date,
          gender:_this.data.gender,
          verification_code:_this.data.verificationCode,
          signin_phone:_this.data.phone,
          student_num:_this.data.Num,
          password:_this.data.password,
          phone:_this.data.phone
        }
        console.log(data1)
        var athration;
        wx.getStorage({
          key: 'Authorization',
          success: function (res3) {
            athration = res3.data
            wx.request({
              url: url,
              method: 'post',
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': athration,
              },
              dataType: 'json',
              data: data1,
              success: function (res0) {
                console.log(res0.data)
                console.log(res0.data.code)
                let urlGetInfo = app.globalData.baseUrl + 'user/getinfo'
                app.appRequest('post',urlGetInfo,{},(response)=>{
                  console.log(response.data)
                  if(response.code==0){
                  app.globalData.Name=response.data.name
                  app.globalData.Organization=response.data.organization
                  app.globalData.School=response.data.school
                  app.globalData.College=response.data.college
                  app.globalData.Major=response.data.major
                  app.globalData.Department = response.data.department
                  console.log('将信息存入缓存')
                  wx.setStorage({
                    key: 'name',
                    data: response.data.name,
                  })
                  wx.setStorage({
                    key: 'organization',
                    data: response.data.organization,
                  })
                  wx.setStorage({
                    key: 'school',
                    data: response.data.school,
                  })
                  wx.setStorage({
                    key: 'college',
                    data: response.data.college,
                  })
                  wx.setStorage({
                    key: 'major',
                    data: response.data.major,
                  })
                  wx.setStorage({
                    key: 'department',
                    data: response.data.department,
                  })
                  wx.setStorage({
                    key: 'whetherBind',
                    data: '1',
                  })
                  wx.showModal({
                    title: '绑定成功',
                    duration: 2000
                  })
                  wx.redirectTo({
                    url: '/Page/index/index',
                  })
                  }else {
                    _this.setData({hidBinding:true})
                    wx.showModal({
                      title: '绑定未成功',
                      content: response.code,
                      duration: 2000
                    })
                  }
                }) 
              },
              fail: function (err) {
                console.log("err")
              }
            })
          },
        })
      },fail(){
        wx.showModal({
          title: '绑定未成功',
          content: '请重新登陆',
          duration: 2000
        })
        return ;
      }
    })
  },
  switch1:function(e){
    var that=this
    console.log(e.detail.value)
    if(e.detail.value==true){
      that.setData({
        S0:true,
        S1:true,
        S2:true,
        S3:true,
        S4:true,
        S5:true,
        S6:true
      })
    }else if(e.detail.value==false){
      that.setData({
        S0: true,
        S1: true,
        S2: false,
        S3: false,
        S4: false,
        S5: false,
        S6: false
      })
    }
    that.setData({
      isStudent: e.detail.value,
      isHidden: !e.detail.value
    })
  },
  switch2:function(e){
    console.log(e.detail.value)
    if(e.detail.value){
      this.setData({
        gender:1
      })
    }
    if(!e.detail.value){
      this.setData({
        gender:0
      })
    }
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  handleInputName:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  handleInputNum: function (e) {
    this.setData({
      Num: e.detail.value
    })
    console.log(this.data.Num)
  },
  handleInputPwd: function (e) {
    this.setData({
      password: e.detail.value
    })
    console.log(this.data.password)
  },
  handleInputCode:function(e){
    this.setData({
      verificationCode:e.detail.data
    })
  },
  /*
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value,
    })
    console.log(this.data.phone)
  },*/
  getPhoneNumber(e){
    var that=this
    var _iv = e.detail.iv
    var _enc = e.detail.encryptedData
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    let url=app.globalData.baseUrl+'user/getPhoneNumber' 
    let data1={
      encryptedData:_enc,
      iv:_iv
    }
    var athration;
    wx.getStorage({
      key: 'Authorization',
      success: function (res) {
        athration = res.data
        wx.request({
          url: url,
          method: 'get',
          header: {
            'content-type': 'application/json',
            'Authorization': athration,
          },
          dataType: 'json',
          data: data1,
          success: function (res1) {
            console.log(res1)
            console.log(res1.data)
            that.setData({
              phone: res1.data.data.phone_number,
              showPhoneNum: res1.data.data.phone_number,
              verificationCode: res1.data.data.verification_code,
            })
          },
          fail: function (err) {
            console.log("err")
            wx.showToast({
              title: '请关注武汉大学学生会公众号',
              image: '../../images/gongzhonghao.svg'
            })
          }
        })
      },
    })/*
    app.appRequest('get',url,data1,(res1)=>{
    if(res1.code!=0){
      wx.showToast({
        title: '请关注武汉大学学生会公众号',
        image: '../../images/gongzhonghao.svg'
      })
    }
    console.log(res1)
    console.log(res1.data)
    that.setData({
      phone:res1.data.phone_number,
      showPhoneNum:res1.data.phone_number,
      verificationCode:res1.data.verification_code,
    })
    })*/
  },
  // 获取验证码
  /*
  getVerificationCode() {
    let _this = this;
    if (!_this.data.disabled) {
      _this.getCode();
    }
  },
  getCode() {
    let _this = this;
    let phone1 = this.data.phone;
    let url=app.globalData.baseUrl+'user/sendsmscode'
    let data={
      signin_phone:phone1
    }
    app.appRequest('post',url,data,(res)=>{
      this.data.verificationCode=res.msg
    })
      // 设置发送验证码按钮样式
      let interval = null;
      let currentTime = _this.data.currentTime;

      interval = setInterval(function () {
        currentTime--;
        _this.setData({
          time: currentTime,
          suffix: '秒后可重新获取'
        })
        if (currentTime <= 0) {
          clearInterval(interval)
          _this.setData({
            time: '重新发送',
            suffix: '',
            currentTime: 61,
            disabled: false
          })
        }
      else {
      _util.showToast('none', '请输入正确的手机号码。');
      }
  })
  },*/
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var athration;
    wx.getStorage({
      key: 'Authorization',
      success: function (res) {
        athration = res.data
      }
    })
    wx.request({
      url: 'https://api.whusu.org/dream/v1/base/getschoollist',
      method: 'post',
      data: {},
      header: {
        'content-type': 'application/json',// 默认值
        'authorization': athration
      },
      success(res) {
        console.log(res.data)
        var xiaoquList = res.data.data;
        var schools = []
        schools.push("请选择")
        var xiaoquArr = xiaoquList.map(item => {　　　　// 此方法将校区名称区分到一个新数组中
          schools.push(item.name)
          return item.name;
        });
        var sids=[]
        sids.push("-1")
        var sidList = xiaoquList.map(item => {
          sids.push(item.sid)
          return item.sid
        })
        console.log(sidList)
        that.setData({
          multiArray: [schools, []],
          sidList: sids,
          xiaoquArr: schools,
          //xiaoquList,
          //xiaoquArr
        })
        var default_xiaoqu_id = xiaoquList[0]['sid'];
      }
    })   

    
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this
    if(e.detail.column==1){
      if(e.detail.value>1){
        that.setData({e2:0})
      }else{
      that.setData({e2:e.detail.value})
      }
    }
    //e.detail.column 改变的数组下标列, e.detail.value 改变对应列的值
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0) {
      console.log(this.data.sidList[e.detail.value])
      var athration;
      wx.getStorage({
        key: 'Authorization',
        success: function (res) {
          athration = res.data
        }
      })
      wx.request({
        url: 'https://api.whusu.org/dream/v1/base/getDegreeList',
        method: 'post',
        data: {
          school: this.data.sidList[e.detail.value]
        },
        header: {
          'content-type': 'application/json',// 默认值
          'authorization': athration
        },
        success(res0) {
          console.log(res0.data.data)
          var str=[]
          str[0]="请选择"
          var degrees
          var mark = res0.data.data
          degrees = mark.map(item => {
            str.push(item.name)
            return item.name
          })
          var degreeList = []
          var de
          degreeList[0]=undefined
          de=mark.map(item => {
            degreeList.push(item.did)
            return item.did
          })
          that.setData({
            didList: degreeList,
          })
          console.log("degree", that.data.didList[0])
          that.setData({
            multiArray: [that.data.xiaoquArr, str],
            _degree: str[that.data.e2],
          })
          that.data.Did=that.data.didList[0]
        }
      })
      that.setData({
        Sid: this.data.sidList[e.detail.value],
        _school: that.data.multiArray[0][e.detail.value],
        //_degree: that.data.multiArray[1][e.detail.value],
      })
    } else {
      console.log(this.data.didList[e.detail.value])
      that.setData({
        Did: this.data.didList[e.detail.value]
      })
    }
    
    if (e.detail.column == 1) {
      that.setData({
        _degree: that.data.multiArray[1][e.detail.value]
      })
      wx.request({
        url: app.globalData.baseUrl + 'base/getBindingInfo',
        method: 'post',
        header: {
          'content-type':  'application/x-www-form-urlencoded',
        },
        dataType: 'json',
        data: {
          school_id: that.data.Sid,
          degree: that.data.Did
        },
        success: function (res) {
      that.setData({
        S0:true,
        S1:true,
        S2:true,
        S3:true,
        S4:true,
        S5:true,
        S6:true
      })
      console.log(res.data.data.info_list)
      for (var i = 0; res.data.data.info_list[i]!=undefined;i++){
        if (res.data.data.info_list[i]==0){
          that.setData({ S0 : false })
        } else if (res.data.data.info_list[i]==1){
          that.setData({ S1: false })
        } else if (res.data.data.info_list[i]==2){
          that.setData({ S2: false })
        } else if (res.data.data.info_list[i]==3){
          that.setData({ S3: false })
        } else if (res.data.data.info_list[i]==4){
          that.setData({ S4: false })
        } else if (res.data.data.info_list[i]==5){
          that.setData({ S5: false })
        } else if (res.data.data.info_list[i]==6){
          that.setData({ S6: false})
        }
      }
    }
    })
    }
    console.log(this.data.Sid, this.data.Did)
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