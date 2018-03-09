Page({
    // 数据
    data: {
        oa_attendance_leave_info_backup: []
    },
    // 页面加载前
    onLoad: function () {
        // 获取草稿列表
        this.getList();
    },

    // 获取草稿列表函数
    getList: function (){
        var that = this;
        wx.request({
            url: 'https://oa.jltengfang.com/small/index/BackupList',
            //向后台传的数据
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
                    oa_attendance_leave_info_backup: res.data.oa_attendance_leave_info_backup,
                })
            },
            fail: function (err) {
                wx.showToast({
                    title: '网络异常',
                    mask: true,
                    icon: 'loading'
                })
            },
        })
    },

    // 点击每个列表单项，跳转到被渲染的新建请假页
    click_content: function (e) {
        // 点击获取当前申请的ID
        let Id = e.currentTarget.dataset.id;
        // 携带markId跳转到新建请假页
        wx.navigateTo({
            url: '../LeavePage/LeavePage?FormName=oa_attendance_leave_info_backup&markId=' + Id,
        })
    },

    // 关闭按钮，点击删除草稿
    modalcnt: function (e) {
        var that = this;
        var id = e.target.dataset.id
        // 唤出confirm弹窗，点击确定进行删除
        wx.showModal({
            content: '请问确定删除吗？',
            success: function (res) {
                if (res.confirm) {
                    wx.request({
                        url: 'https://oa.jltengfang.com/small/index/DeleteBackup',
                        data: {
                            Id: id,
                            FormName: 'oa_attendance_leave_info_backup'
                        },
                        header: {
                            'content-type': 'application/json',
                            'Cookie': 'PHPSESSID=' + wx.getStorageSync('session_id'),
                            'Flag': 'MiniApp'
                        },
                        method: 'POST',
                        dataType: 'json',
                        success: function (res) {
                            // 如果成功，重新获取草稿列表
                            that.getList();
                        },
                        fail: function (){
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
