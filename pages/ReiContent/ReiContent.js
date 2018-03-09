Page({
    data: {
        reiArray: ['编号1', '编号2', '编号3', '编号4'],
        reiNumber: '',
        reiMoney: '',
        reiRemark: '',
        reiImg: [],
        // 报销标志
        markId: null,
        FormName: 'oa_finance_expenses_info'
    },

    // 页面加载前
    onLoad: function (option) {
        var that = this;
        // 获取上一页传来的报销标志markId保存在data中
        this.setData({
            markId: option.markId
        })
        // 通过发送markId，获取详细报销数据
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/ApplicationInfo',
            data: {
                markId: this.data.markId,
                FormName: this.data.FormName,
                Uid: wx.getStorageSync('user')
            },
            header: {
                'content-type': 'application/json',
                'Cookie': 'PHPSESSID=' + wx.getStorageSync('session_id'),
                'Flag': 'MiniApp'
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) {
                // 获取的数据赋值在data中
                that.setData({
                    reiImg: res.data.Img,
                    reiNumber: that.data.reiArray[res.data.DocumentNumber],
                    reiRemark:res.data.Remark,
                    reiMoney: res.data.Amount
                })
            },
            fail: function (err) {
                wx.showToast({
                    title: '网络异常',
                    mask: true,
                    icon: 'loading'
                })
            }
        })
    },

    // 撤销申请
    modalcnt: function () {
        var that = this;
        // 微信小程序自定义弹窗
        wx.showModal({
            content: '请问确定撤消吗？',
            success: function (res) {
                // 点击确定后撤销申请，抛出markId及Uid
                if (res.confirm) {
                    wx.request({
                        url: 'https://oa.jltengfang.com/small/index/DeleteApplicationProgress',
                        data: {
                            markId: that.data.markId,
                            FormName: that.data.FormName,
                            Uid: wx.getStorageSync('user')
                        },
                        header: {
                            'content-type': 'application/json',
                            'Cookie': 'PHPSESSID=' + wx.getStorageSync('session_id'),
                            'Flag': 'MiniApp'
                        },
                        method: 'POST',
                        dataType: 'json',
                        success: function (res) {
                            // 获取数据并判断是否撤销成功
                            let resData = res.data.State.Message;
                            // 如果数据判定成功，则撤销申请
                            if (resData == 'Success') {
                                wx.showToast({
                                    title: '正在撤销',
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
                            }
                        },
                        fail: function (err) {
                            wx.showToast({
                                title: '网络异常',
                                mask: true,
                                icon: 'loading'
                            })
                        }
                    })
                }
            }
        })
    }
})