// pages/activity/sakura/spotbooking/spotbooking.js
const app = getApp();
Page({

    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        phone: ''
    },

    onLoad: function (options) {

    },

    getPhoneNumber: function (e) {
        var that=this;
        var _iv = e.detail.iv;
        var _enc = e.detail.encryptedData;
        let url=app.globalData.baseUrl+'user/getPhoneNumber' ;
        let data={
            encryptedData:_enc,
            iv:_iv,
            type: 'all'
        };
        var athration;
        wx.getStorage({
            key: 'Authorization',
            success: (res) => {
                athration = res.data;
                wx.request({
                    url: url,
                    method: 'get',
                    header: {
                        'content-type': 'application/json',
                        'Authorization': athration,
                    },
                    dataType: 'json',
                    data,
                    success: (response) => {
                        that.setData({
                            phone: response.data.data.phone_number,
                        });
                    },
                    fail: (err) => {
                        console.log("err")
                        wx.showToast({
                            title: '请关注武汉大学学生会公众号',
                            image: '../../images/gongzhonghao.svg'
                        })
                    }
                })
            },
        })
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
        if(reg.test(id)){ 
            this.setData({
                modalName: 'Modal',
                tips: '请输入正确的身份证号'
            })
            return false; 
        } 
        wx.request({
            url: app.globalData.baseUrl + 'reservation/doprereservation',
            method: 'post',
            header: {
                'content-type':  'application/x-www-form-urlencoded',
            },
            dataType: 'json',
            data: {
                id_number: id,
                phone,
                name
            },
            success: (res) => {
                if(res.data && res.data.code == 0){
                    
                }
            }
        })
    },

    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
})