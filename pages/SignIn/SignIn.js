var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
    data: {
        // 自动获取日期——>new Date().toLocaleDateString()
        date: new Date().toLocaleDateString().replace(/\//g, '-'),
        // 经纬度
        latitude: '',
        longitude: '',
        // 签到签退
        Sign: null,
        // 立即提交时验证信息
        Validate: '',
        tip: '',
        imgSrc: '',
        // 实时位置
        Address: '',
        // 头像
        imgSrc: '',
        // 用户姓名
        nickName: ''
    },
    // 页面刚加载的时候
    onLoad: function (options) {
        // 获取缓存
        var userInfo = wx.getStorageSync('userInfo')
        // 传到data里面头像跟用户名
        this.setData({
            imgSrc: userInfo.avatarUrl,
            nickName: userInfo.nickName
        })
        // 获取当前的地理位置
        var that = this
        // 实例化腾讯地图API核心类
        qqmapsdk = new QQMapWX({
            key: 'R2UBZ-77GRO-LJAWG-SI5FQ-6V2F3-M6B4L' // 必填
        });
        //1、获取当前位置坐标
        wx.getLocation({
            // 返回 gps 坐标
            type: 'wgs84',
            // res调取这个接口成功后返回的数据
            success: function (res) {
                //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: function (addressRes) {
                        var address = addressRes.result.formatted_addresses.recommend;
                        that.setData({
                            Address: address,
                            latitude: res.latitude,
                            longitude: res.longitude
                        })
                    }
                })
            }
        })
    },

    // 签到按钮
    Sign_Come: function () {
        this.setData({
            Sign: 1,
            Validate: ''
        })
    },
    // 签退按钮
    Sign_back: function () {
        this.setData({
            Sign: 0,
            Validate: ''
        })
    },

    // 立即提交
    Submit_button: function () {
        // 签到 | 签退校验
        if (this.data.Sign == null) {
            this.setData({
                Validate: '您还没有选择签到或签退哦',
                tip: '/images/tip.png'
            })
        }
        // 校验通过发送数据，进行签到
        else {
            wx.request({
                url: 'https://oa.jltengfang.com/small/index/Legwork',
                data: {
                    Status: this.data.Sign,
                    Address: this.data.Address,
                    Date: this.data.date,
                    Lat: this.data.latitude,
                    Lng: this.data.longitude,
                    Uid: wx.getStorageSync('user'),
                },
                header: {
                    'content-type': 'application/json',
                    'Cookie': 'PHPSESSID=' + wx.getStorageSync('session_id'),
                    'Flag': 'MiniApp'
                },
                method: 'POST',
                dataType: 'json',
                success: function (res) {
                    // 如果签到或签退成功，则调回首页
                    wx.showToast({
                        title: '正在签到...',
                        mask: true,
                        icon: 'loading',
                        success: function () {
                            setTimeout(function () {
                                // 返回首页
                                wx.navigateBack({
                                    delta: 2
                                })
                            }, 1500);
                        }
                    })
                },
                fail: function (err) {
                    wx.showToast({
                        title: '网络异常',
                        mask: true,
                        icon: 'loading'
                    })
                },

            })
        }
    }
})