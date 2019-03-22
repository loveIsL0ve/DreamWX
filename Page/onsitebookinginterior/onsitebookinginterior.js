// Page/onsitebookinginterior/onsitebookinginterior.js
const app = getApp();
Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    phone: '',
    name: '',
    id: ''
  },

  onLoad: function (options) {

  },

  inputPhone: function(e){
    console.log(e.detail.value);
    this.setData({phone: e.detail.value});
  },

  inputName: function(e){
    console.log(e.detail.value);
    this.setData({name: e.detail.value});
  },

  inputID: function(e){
    console.log(e.detail.value);
    this.setData({id: e.detail.value});
  },

  submit: function(e){
    var that = this;
    let phone = this.data.phone;
    let name = this.data.name;
    let id = this.data.id;
    var reg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!reg.test(phone)){
        this.setData({
            modalName: 'Modal',
            tips: '请输入正确的电话号码'
        })
        return false;
    } 
    if(!name){
        this.setData({
            modalName: 'Modal',
            tips: '请输入姓名'
        })
        return false;
    }
    reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    if(!reg.test(id)){ 
        this.setData({
            modalName: 'Modal',
            tips: '请输入正确的身份证号'
        })
        return false; 
    }
    let url = app.globalData.baseUrl +'reservation/doreservation'
    app.appRequest('post',url,{
        id_number: id,
        phone,
        name
    },(res)=>{
        console.log(res);
        if(res && res.code == 30001) {
            this.setData({
                phone: '',
                name: '',
                id: '',
                modalName: 'Modal',
                tips: res.tips
            })
            return false;
        } else if(res && res.code == 0){
          this.setData({
            phone: '',
            name: '',
            id: '',
            modalName: 'Modal',
            tips: '提交成功'
          })
        }
    })
  },

  hideModal(e) {
    this.setData({
        modalName: null
    })
  },

  scan: function(e){
    wx.scanCode({
      success: (res) => {
        console.log("扫码结果");
        console.log(res);
        let url = app.globalData.baseUrl +'reservation/getuserinfo'
        app.appRequest('post',url,{
          id: res.result.split('&')[0],
          encrypt: res.result.split('&')[1]
        },(respone)=>{
          console.log(res);
          if(respone && respone.code == 10040) {
            this.setData({
              modalName: 'Modal',
              tips: "找不到数据"
            })
          } else if(respone && respone.code == 0){
            this.setData({
              phone: respone.data.phone,
              name: respone.data.name,
              id: respone.data.id_number
            })
          }
        })
      }
    })
  }
})