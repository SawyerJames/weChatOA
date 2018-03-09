Page({
    data: {
        // 报销编号
        reiNumber: ['编号1', '编号2', '编号3', '编号4'],
        index: 0,
        // 成本中心
        cost_centre: ['1', '2', '3', '4'],
        cost: 0,
        // 报销科目
        cost_subject: ['5', '6', '7', '8'],
        subject: 0,
        date: '2018-01-01',
        //金额及备注
        money: '',
        remark: '',
        // 图片临时缓存路径
        tempFilePaths: []
    },

    // 页面加载前
    onLoad: function (options) {

    },

    //报销编号当前选择
    bindReiNumber: function (e) {
        this.setData({
            index: e.detail.value
        })
    },

    // 成本中心请选择
    bindCost_centre: function (e) {
        this.setData({
            cost: e.detail.value,

        })
    },

    // 报销科目请选择
    bindReiType: function (e) {
        this.setData({
            subject: e.detail.value,

        })
    },

    //产品日期
    bindDate: function (e) {
        this.setData({
            date: e.detail.value
        })
    },

    // 金额
    bindMoney: function (e) {
        this.setData({
            money: e.detail.value
        })
    },

    // 备注
    bindRemMark: function (e) {
        this.setData({
            remark: e.detail.value
        })
    },

    // 选择图片
    chooseimage: function () {
        var that = this;
        // 选择图片接口
        wx.chooseImage({
            // 默认图片数 
            count: 4,
            // 可以指定是原图还是压缩图，默认二者都有
            sizeType: ['original', 'compressed'],
            // 可以指定来源是相册还是相机，默认二者都有
            sourceType: ['album', 'camera'],
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            success: function (res) {
                that.setData({
                    tempFilePaths: res.tempFilePaths
                });
            }
        });
    },

    // 清除图片
    clearimage: function () {
        this.setData({
            tempFilePaths: ''
        });
    },

    // 立即提交
    Lay: function () {
        if (this.data.tempFilePaths == '') {
            wx.showToast({
                title: '图片未上传',
                mask: true,
                icon: 'loading'
            })
        }
        if (this.data.remark == '') {
            wx.showToast({
                title: '未填写详细备注',
                mask: true,
                icon: 'loading'
            })
        }
        if (this.data.money == '') {
            wx.showToast({
                title: '未填写金额',
                mask: true,
                icon: 'loading'
            })
        }
        if (this.data.tempFilePaths != '' && this.data.remark != '' && this.data.money != '') {
            var that = this;
            // 验证通过：发送立即提交时请求
            wx.request({
                url: 'https://oa.jltengfang.com/small/index/payment',
                data: {
                    DocumentNumber: this.data.index,
                    SubjectName: this.data.cost_subject[this.data.subject],
                    Amount: this.data.money,
                    Date: this.data.date,
                    Img: this.data.tempFilePaths,
                    Remark: this.data.remark,
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
                    // 如果报销通过，跳至已提交页
                    if (res.data.status == 'OK') {
                        wx.showToast({
                            title: '正在提交',
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
                    return;
                }
            })
        }
    }
})