Page({
    data: {
        imgSrc: '',
        nickName: '',
        TODO_COUNT: null
    },

    onLoad: function (options) {
        let that = this;
        // 获取缓存中用户头像、名称、id
        let userInfo = wx.getStorageSync('userInfo');
        let Uid = wx.getStorageSync('user');
        this.setData({
            imgSrc: userInfo.avatarUrl
        })
        // 获取待办事项及申请进度数量
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/Todo',
            data: {
                Uid: Uid
            },
            header: {
                'content-type': 'application/json',
                'Cookie': 'PHPSESSID=' + this.data.session_id,
                'Flag': 'MiniApp'
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) {
                // 获取姓名, 两个数量
                that.setData({
                    nickName: res.data.Name,
                    TODO_COUNT: res.data.TODO_COUNT
                })
            },
            fail: function (err) { }
        })
    },

    //申请进度
    Application: function () {
        wx.navigateTo({
            url: '/pages/Application/Application'
        })
    },

    //请假申请
    Leave: function () {
        wx.navigateTo({
            url: '/pages/Leave_page/Leave_page'
        })
    },

    //外勤申请
    Field: function () {
        wx.navigateTo({
            url: '/pages/Sign_in/Sign_in'
        })
    },

    //报销申请
    Rei: function () {
        wx.navigateTo({
            url: '/pages/Reimbursement/Reimbursement'
        })
    },
    Draft: function () {
        wx.navigateTo({
            url: '/pages/My_Draft/My_Draft'
        })
    },
})