Page({
    data: {
        oa_attendance_leave_info: [],
        oa_finance_expenses_info: []
    },
    // 页面显示时（钩子函数）
    onShow: function () {
        var that = this
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/ApplicationProgress',
            data: {
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
                that.setData({
                    oa_attendance_leave_info: res.data.oa_attendance_leave_info,
                    oa_finance_expenses_info: res.data.oa_finance_expenses_info
                })
            },
            fail: function (res) {
                wx.showToast({
                    title: '网络异常',
                    mask: true,
                    icon: 'loading'
                })
            },
        })
    },
    // 点击请假申请进度的列表单一模块
    getIdPostUrlLeave: function (e) {
        // 点击获取当前申请的ID
        let Id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../RepealLeave/RepealLeave?FormName=oa_attendance_leave_info&markId=' + Id,
        })
    },
    // 点击报销申请进度的列表单一模块
    getIdPostUrlExpense: function (e) {
        // 点击获取当前申请的ID
        let Id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../ReiContent/ReiContent?FormName=oa_finance_expenses_info&markId=' + Id,
        })
    }
})