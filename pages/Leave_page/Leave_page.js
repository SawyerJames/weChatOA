Page({
    data: {
        // 请假类型
        array: ['事假', '病假', '年假', '婚假'],
        index: 0,
        // 起始时间
        date_start: '2016-09-01',
        time_start: '12:01',
        date_end: '2017-09-01',
        time_end: '12:01',
        // 请假内容
        textValue: '',
        // 加减
        num: 0,
        // 禁止按钮点击，true为禁止
        disabled: false,
        // Uid & session_id
        Uid: '',
        session_id: ''
    },

    // 页面加载时
    onLoad: function (options){
        // 将数据缓存放入data中
        this.setData({
            Uid: wx.getStorageSync('user'),
            session_id: wx.getStorageSync('session_id')
        })
    },

    // 选择请假类型的索引值
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },

    // 点击增加与减少
    Click_add() {
        var newNum = this.data.num;
        newNum = newNum + 0.5;
        this.setData({
            num: newNum
        })
    },
    Click_adv() {
        var newNum = this.data.num;
        if (newNum <= 0) {
        } else {
            newNum = newNum - 0.5;
            this.setData({
                num: newNum
            })
        }
    },

    // 起始日期
    bindDateChange: function (e) {
        this.setData({
            date_start: e.detail.value
        })
    },
    bindDateChange_end: function (e) {
        this.setData({
            date_end: e.detail.value
        })
    },

    // 起始时间
    bindTimeChange: function (e) {

        this.setData({
            time_start: e.detail.value
        })
    },
    bindTimeChange_end: function (e) {
        this.setData({
            time_end: e.detail.value
        })
    },

    // 请假内容
    bindTextAreaBlur: function (e) {
        this.setData({
            textValue: e.detail.value
        })
    },

    // 保存草稿
    Save: function () {
        var that = this;
        // 拼接起始日期
        var startTime = this.data.date_start + ' ' + this.data.time_start;
        var endTime = this.data.date_end + ' ' + this.data.time_end;
        // 保存草稿时发送请求
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/Vacate',
            data: {
                leaveType: this.data.array[this.data.index],
                endTime: endTime,
                startTime: startTime,
                applyTime: this.data.num,
                textValue: this.data.textValue,
                Uid: this.data.Uid
            },
            header: {
                'content-type': 'application/json',
                'Cookie': 'PHPSESSID=' + this.data.session_id,
                'Flag': 'MiniApp'
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) { },
            fail: function (err) { }
        })
    },

    // 立即提交
    Lay: function () {
        var that = this;
        // 拼接起始日期
        var startTime = this.data.date_start + ' ' + this.data.time_start;
        var endTime = this.data.date_end + ' ' + this.data.time_end;
        // 验证表单信息
        // 验证通过：发送立即提交时请求
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/Vacate',
            data: {
                leaveType: this.data.array[this.data.index],
                endTime: endTime,
                startTime: startTime,
                applyTime: this.data.num,
                textValue: this.data.textValue,
                Uid: this.data.Uid
            },
            header: {
                'content-type': 'application/json',
                'Cookie': 'PHPSESSID=' + this.data.session_id,
                'Flag': 'MiniApp'
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) {
                // 如果请假通过，则接收一个标志id，传递给下一页用来获取详细请假信息
                if (res.data.status == 'OK'){
                    var markId = res.data.markId;
                    wx.redirectTo({
                        url: '../my_leave_a/my_leave_a?markId=' + markId
                    })
                }
            },
            fail: function (err) {
                return;
            }
        })
    }
})