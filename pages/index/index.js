Page({
    data: {
        imgSrc: '',
        nickName: '',
        // 申请进度数量
        applyNum: '',
        // 待办事项数量
        backlogNum: ''
    },
    // 页面加载前（钩子函数）
    onLoad: function (options) {
        // 获取用户信息
        var userInfo = wx.getStorageSync('userInfo')
        this.setData({
            imgSrc: userInfo.avatarUrl,
            nickName: userInfo.nickName
        })
    },
    // 页面显示时（钩子函数）
    onShow: function () {
        var that = this;
        // 获取申请进度
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/ApplicationProgress',
            data: {
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
                // 拼接申请进度数量，放置data中
                let applyNum = res.data.oa_attendance_leave_info.length + res.data.oa_finance_expenses_info.length;
                that.setData({
                    applyNum: applyNum
                })
            },
            fail: function (err) {
                wx.showToast({
                    title: '网络异常',
                    mask: true,
                    icon: 'loading'
                })
            }
        });
        // 待办事项数量获取
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/TodoList',
            data: {
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
                // 拼接待办事项数量，放置data中
                let backlogNum =
                    res.data.oa_attendance_leave_info.length + res.data.oa_finance_expenses_info.length;
                that.setData({
                    backlogNum: backlogNum
                })
            }
        });
    },
    // 申请进度
    Application: function () {
        wx.navigateTo({
            url: '/pages/Application/Application'
        })
    },
    // 待办事项
    GoTodoList: function () {
        wx.navigateTo({
            url: '/pages/TodoList/TodoList'
        })
    },
    // 请假申请
    Leave: function () {
        wx.navigateTo({
            url: '/pages/LeavePage/LeavePage'
        })
    },
    // 外勤申请
    Field: function () {
        wx.navigateTo({
            url: '/pages/SignIn/SignIn'
        })
    },
    // 报销申请
    Rei: function () {
        wx.navigateTo({
            url: '/pages/Reimbursement/Reimbursement'
        })
    },
    // 草稿箱
    Draft: function () {
        wx.navigateTo({
            url: '/pages/MyDraft/MyDraft'
        })
    },
})