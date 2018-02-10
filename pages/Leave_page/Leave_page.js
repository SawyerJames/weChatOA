// pages/Leave page/Leave page.js
Page({

    data: {
        array: ['事假', '病假', '年假', '婚假'],
        objectArray: [
            {
                id: 0,
                name: '事假'
            },
            {
                id: 1,
                name: '病假'
            },
            {
                id: 2,
                name: '年假'
            },
            {
                id: 3,
                name: '婚假'
            }
        ],
        index: 0,
        date: '2016-09-01',
        time: '12:01',
        date_end: '2017-09-01',
        time_end: '12:01',
        customItem: '全部',
        // 加减
        num: 0,
        //  false的时候是可以点击， ture是不可以点击
        disabled: false
    },

    //当前选择
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })

    },

    // 点击增加
    Click_add() {
        // 拿到了data的变量
        var newNum = this.data.num;
        newNum = newNum + 0.5;
        this.setData({
            num: newNum
        })
    },

    // 点击减
    Click_adv() {
        // 拿到了data的变量
        var newNum = this.data.num;
        console.log(newNum)
        if (newNum <= 0) {
        } else {
            newNum = newNum - 0.5;
            this.setData({
                num: newNum
            })
        }
    },
    //开始日期
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },

    //结束日期
    bindDateChange_end: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date_end: e.detail.value
        })
    },

    //开始时间
    bindTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: e.detail.value
        })
    },

    // 结束时间
    bindTimeChange_end: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time_end: e.detail.value
        })
    },
    //保存草稿
    Save: function () {
        var startTime = this.data.date + ' ' + this.data.time;
        var endTime = this.data.date_end + ' ' + this.data.time_end;
        console.log(endTime);
        var that = this;
        wx.request({
            // 后台给的地址
            url: '',
            // 抛给后台的数据
            data: {
                Array: this.data.array,
                endTime: endTime,
                startTime: startTime,
                Num: this.data.num,
                Uid: 111
            },
            header: {},
            method: 'POST',
            dataType: 'json',
            success: function (res) { },
            fail: function (err) {
                wx.redirectTo({
                    url: '/pages/turn_page/turn_page'
                })
            }
        })
    },
    Lay: function () {
        wx.request({
            url: '',
            data: {},
            header: {},
            method: 'POST',
            dataType: 'json',
            success: function (res) { },
            fail: function (err) {
                wx.redirectTo({
                    url: '/pages/new_page/new_page'
                })
            }
        })
    }
})