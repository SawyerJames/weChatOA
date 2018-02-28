Page({
    data: {
        // 报销编号
        reiNumber: ['demo1', 'demo2', 'demo3', 'demo4'],
        index: 0,
        // 成本中心
        cost_centre: ['1', '2', '3', '4'],
        cost: 0,
        // 报销科目
        cost_subject: ['5', '6', '7', '8'],
        subject: 0,
        // 起始日期
        date_start: '2018-01-01',
        date_end: '2019-01-01',
        // 金额及备注
        money: '',
        remark: '',
        // 图片临时缓存路径
        tempFilePaths: '',
        // base64位图
        file1: ""
    },

    // 监听页面加载
    onLoad: function (options) {
    },

    // 报销编号当前选择
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

    // 产品开始日期
    bindDateStart: function (e) {
        console.log(e.detail.value);
        this.setData({
            date_start: e.detail.value
        })
    },
    
    // 产品结束日期
    bindDateEnd: function (e) {
        this.setData({
            date_end: e.detail.value
        })
    },

    // 金额及备注
    bindMoney: function (e){
        this.setData({
            money: e.detail.value
        })
    },
    bindRemark: function (e) {
        console.log(e.detail.value)
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
            count: 1,
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
    clearimage: function(){
        this.setData({
            tempFilePaths: '',
        })
    },

    // 保存草稿
    Save: function () {
        // 日期拼接
        var date = this.data.date_start + ' ' + this.data.date_end;
        // 发送数据
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/payment',
            data: {
                Uid: wx.getStorageSync('user'),
                DocumentNumber: this.data.reiNumber[this.data.index],
                SubjectName: this.data.cost_subject[this.data.subject],
                Amount: this.data.money,
                Img: this.data.tempFilePaths,
                Remark: this.data.remark,
                Date: date
            },
            header: {
                'content-type': 'application/json',
                'Cookie': 'PHPSESSID=' + wx.getStorageSync('session_id'),
                'Flag': 'MiniApp'
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) { }
        })
    },

    // 立即提交
    Lay: function(){
        // 日期拼接
        var date = this.data.date_start + ' ' + this.data.date_end;
        // 发送数据
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/payment',
            data: {
                Uid: wx.getStorageSync('user'),
                DocumentNumber: this.data.reiNumber[this.data.index],
                SubjectName: this.data.cost_subject[this.data.subject],
                Amount: this.data.money,
                Img: this.data.file1,
                Remark: this.data.remark,
                Date: date
            },
            header: {
                'content-type': 'application/json',
                'Cookie': 'PHPSESSID=' + wx.getStorageSync('session_id'),
                'Flag': 'MiniApp'
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) { }
        })
    }
})