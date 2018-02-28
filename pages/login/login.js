Page({
    // 数据
    data: {
        cardNumber: '',
        session_id: ''
    },

    // 页面加载前
    onLoad: function (options) {
        // 调用API从本地缓存中获取数据
        var Uid = wx.getStorageSync('user') || '';
        //userInfo用户信息
        var userInfo = wx.getStorageSync('userInfo') || {};
        // 微信授权登录
        this.login();  
    },

    // 手机号获取input值
    cardNumberInput: function (e) {
        this.setData({
            // e代表输入框.里面详细的值
            cardNumber: e.detail.value
        })
    },

    // login页点击登录
    goIndex: function () {
        var that = this;
        // 重新赋值工号，传递给登录方法
        var cardNumber = this.data.cardNumber;
        if (cardNumber == '') {
            wx.showToast({
                title: '手机号为空'
            })
        }
        else {
            // 点击调取后台注册工具
            wx.request({
                url: 'https://oa.jltengfang.com/small/index/binding',
                data: {
                    phone: cardNumber
                },
                header: {
                    'content-type': 'application/json',
                    'Cookie': 'PHPSESSID=' + this.data.session_id,
                    'Flag': 'MiniApp'
                },
                method: 'POST',
                dataType: 'json',
                success: function (res) {
                    let resData = res.data.Binding_Status;
                    // 注册成功跳转
                    if (resData == 'OK') {
                        wx.showToast({
                            title: '注册成功',
                            icon: 'success',
                            mask: true,
                            success: function () {
                                // 注册成功1.5s后跳转首页
                                setTimeout(function () {
                                    wx.redirectTo({
                                        url: '/pages/index/index'
                                    })
                                }, 1500)
                            }
                        })
                    }
                    // 注册失败提示，清除表单信息重新注册
                    else {
                        wx.showToast({
                            title: '注册失败',
                            icon: 'loading',
                            mask: true
                        })
                    }
                },
                fail: function (err) {}
            })
        }
    },

    // 微信登录方法
    login: function () {
        var that = this;
        wx.showLoading({
            title: '正在验证信息...',
            mask: true,
        })
        wx.login({
            success: function (res) {
                // 如果请求的状态码不为空，则获取用户登录态成功
                if (res.code) {
                    wx.getUserInfo({
                        success: function (data) {
                            // 定义空对象，用来存储用户基本信息
                            var userInfo = {};
                            userInfo.avatarUrl = data.userInfo.avatarUrl;
                            userInfo.nickName = data.userInfo.nickName;
                            //存储userInfo
                            wx.setStorageSync('userInfo', userInfo);
                            //发起网络请求
                            wx.request({
                                url: 'https://oa.jltengfang.com/small/index/index',
                                method: 'POST',
                                header: {
                                    'content-type': 'application/json',
                                    'Flag': 'MiniApp'
                                },
                                data: {
                                    code: res.code,
                                    encryptedData: data.encryptedData,
                                    iv: data.iv, data
                                },
                                dataType: 'json',
                                success: function (ssdata) {
                                    // 如果存在session_id, 存储session_id
                                    if (ssdata.data.session_id) {
                                        // 全局存储session_id
                                        wx.setStorageSync('session_id', ssdata.data.session_id);
                                        // 此页存储session_id
                                        that.setData({
                                            session_id: ssdata.data.session_id
                                        })
                                    }
                                    // 获取到Uid,添加至缓存中
                                    if (ssdata.data.userId){
                                        wx.setStorageSync('user', ssdata.data.userId.MemberInfo.Id);
                                    }
                                    // 判断授权状态，如果不存在，说明已经注册，则跳转首页
                                    if (ssdata.data.regist_status != 0) {
                                        wx.redirectTo({
                                            url: '/pages/index/index'
                                        })
                                    }
                                    else {
                                        // 关闭loading
                                        wx.hideLoading();
                                    }
                                },
                                fail: function (err) {
                                    wx.hideLoading();
                                    return;
                                }
                            })
                        },
                        // 授权登录被拒绝，尝试再次登录
                        fail: function (err) {
                            wx.hideLoading();
                            if (wx.openSetting) {
                                wx.openSetting({
                                    success: function (res) {
                                        //尝试再次登录
                                        that.login();
                                    }
                                })
                            } else {
                                wx.showModal({
                                    title: '授权提示',
                                    content: '小程序需要您的微信授权才能使用'
                                })
                            }
                        }
                    });
                }
                // 如果请求的状态码为空，则获取用户登录态失败
                else {
                    return
                }
            }
        });
    }
})