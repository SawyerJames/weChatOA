Page({
    data: {
        // 报销类型
        reiArray: ['编号1', '病假', '年假', '婚假'],
        // 请假列表
        oa_attendance_leave_info: [
            {
                Description: "123123",
                EndTime: "2018-03-09 00:00:00",
                Id: 197,
                StartTime: "2018-03-06 00:00:00",
                Status: 0,
                Time: "1.0",
                Type: "婚假",
                User: "张添",
                 "Img": []
            }
        ],
        // 报销列表
        oa_finance_expenses_info: [
            {
                "Id": 23,
                "UserName": "张添",
                "Status": 0,
                "CreateTime": "2018-03-05 11:22:35",
                "Type": 2,
                "Remark": '我要报销',
                "Money": 100,
                "Img": []
            }
        ]
    },
    // 页面加载
    onLoad: function () {
        // 调用获取待办事项详细列表
        this.getDetailList()
    },
    //图片点击事件
    imgYu: function (event) {
        var src = event.currentTarget.dataset.src;//获取data-src
        var imgList = event.currentTarget.dataset.list;//获取data-list
        //图片预览
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: imgList // 需要预览的图片http链接列表
        })

    },
    // 获取待办事项详细列表
    getDetailList() {
        var that = this;
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/TodoList',
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
                // 获取数据列表存入data中
                that.setData({
                    // oa_attendance_leave_info: res.data.oa_attendance_leave_info,
                    // oa_finance_expenses_info: res.data.oa_finance_expenses_info
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

    // 同意
    pass(e) {
        let that = this;
        // 获取自定义数据
        let Id = e.currentTarget.dataset.id;
        let FormName = e.currentTarget.dataset.formname;
        // 发起同意请求
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/ChangeStatus',
            data: {
                Uid: wx.getStorageSync('user'),
                Id: Id,
                Stutas: 0,
                FormName: FormName
            },
            header: {
                'content-type': 'application/json',
                'Cookie': 'PHPSESSID=' + wx.getStorageSync('session_id'),
                'Flag': 'MiniApp'
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) {
                // 调用获取待办事项详细列表
                that.getDetailList()
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

    // 拒绝
    refuse() {
        let that = this;
        // 获取自定义数据
        let Id = e.currentTarget.dataset.id;
        let FormName = e.currentTarget.dataset.formname;
        // 发起拒绝请求
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/ChangeStatus',
            data: {
                Uid: wx.getStorageSync('user'),
                Id: Id,
                Stutas: 0,
                FormName: FormName
            },
            header: {
                'content-type': 'application/json',
                'Cookie': 'PHPSESSID=' + wx.getStorageSync('session_id'),
                'Flag': 'MiniApp'
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) {
                // 调用获取待办事项详细列表
                that.getDetailList()
            },
            fail: function (res) {
                wx.showToast({
                    title: '网络异常',
                    mask: true,
                    icon: 'loading'
                })
            },
        })
    }
})