Page({
    data: {
        // 请假相关信息
        LeaveType: '',
        TextValue: '',
        EndTime: '',
        StartTime: '',
        LeaveStatus: null,
        Time: '',
        // 审批相关列表
        InfoList: [],
        // 请假标志
        markId: null,
        // 上传的图片
        ReiImg: [],
        FormName: 'oa_attendance_leave_info'
    },

    // 页面加载前
    onLoad: function (option) {
        var that = this;
        // 获取上一页传来的请假标志markId保存在data中
        this.setData({
            markId: option.markId
        })
        // 通过发送markId，获取详细请假数据
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/ShowVacate',
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
                let resData = res.data;
                // 日期数据截取
                let StartTime = resData.StartTime.slice(0, 10);
                let EndTime = resData.EndTime.slice(0, 10);
                // 获取的数据赋值在data中
                that.setData({
                    LeaveType: resData.LeaveType,
                    TextValue: resData.TextValue,
                    EndTime: EndTime,
                    StartTime: StartTime,
                    LeaveStatus: resData.LeaveStatus,
                    InfoList: resData.InfoList,
                    Time: resData.Time,
                    ReiImg: res.data.reiImg,
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
            title: '',
            content: '请问确定撤消吗？',
            success: function (res) {
                // 点击确定后撤销申请，抛出markId及Uid
                if (res.confirm) {
                    wx.request({
                        url: 'https://oa.jltengfang.com/small/index/CancelVacate',
                        data: {
                            markId: that.data.markId,
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
                            if (resData == 'Success'){
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