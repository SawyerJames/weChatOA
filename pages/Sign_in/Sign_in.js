// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
    data: {
        // 经纬度
        latitude: '',
        longitude: '',
        // 实时位置
        Address: '',
        // 签到 | 签退 | 验证
        Sign: null,
        Validate: '',
        // 日期
        date: '',
        // 用户信息
        userInfo: {}
    },

    // 页面加载时
    onLoad: function (option) {
        // 日期实例化
        var date = new Date().toLocaleDateString().replace('/', '-').replace('/', '-');
        this.setData({
            date: date
        })
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'HC6BZ-TOOAD-3KW4B-HAQBF-IE7JK-MVBDH'
        });
        // 重定义this
        let that = this;
        // 获取用户信息
        this.setData({
            userInfo: wx.getStorageSync('userInfo')
        });
        // 获取实时定位
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                // 渲染当前位置
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                })
                // 根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: function (addressRes) {
                        var Address = addressRes.result.formatted_addresses.recommend;
                        console.log(Address)
                        // 将获取的地址放入data中
                        that.setData({
                            Address: Address
                        })
                    }
                })
            }
        })
    },

    // 签到 | 签退
    Sign_Come(){
        this.setData({
            Sign: 1,
            Validate: ''
        })
    },
    Sign_back(){
        this.setData({
            Sign: 0,
            Validate: ''
        })
    },

    // 立即提交
    Submit_button() {
        // 验证是否点击了签到或签退
        if (this.data.Sign == null){
            this.setData({
                Validate: '您还未选择签到或签退'
            })
        }
        else {
            // 抛出请假数据
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
                    console.log(res)
                }
            })
        }
    }
})