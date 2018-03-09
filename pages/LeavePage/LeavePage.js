Page({
    data: {
        // 请假类型
        array: ['事假', '病假', '年假', '婚假'],
        index: 0,
        date_start: new Date().toLocaleDateString().replace(/\//g, '-'),
        time_start: '00:00',
        date_end: new Date().toLocaleDateString().replace(/\//g, '-'),
        time_end: '00:00',
        // 加减
        num: 0,
        // 请假内容
        textValue: '',
        //  false的时候是可以点击， ture是不可以点击
        disabled: false,
        // Uid & session_id
        Uid: null,
        session_id: '',
        tempFilePaths: []
    },

    // 页面加载前
    onLoad: function (options) {
        var that = this;
        // 通用数据缓存放入data中
        this.setData({
            Uid: wx.getStorageSync('user'),
            session_id: wx.getStorageSync('session_id')
        })
        // 如果草稿箱传过来markId，则通过markId加载草稿箱数据
        if (options.markId) {
            wx.request({
                url: 'https://oa.jltengfang.com/small/index/BackupInfo',
                data: {
                    Uid: wx.getStorageSync('user'),
                    markId: options.markId,
                    FormName: 'oa_attendance_leave_info_backup'
                },
                header: {
                    'content-type': 'application/json',
                    'Cookie': 'PHPSESSID=' + wx.getStorageSync('session_id'),
                    'Flag': 'MiniApp'
                },
                method: 'POST',
                dataType: 'json',
                success: function(res) {
                    console.log(res)
                    // 成功获取草稿箱数据放置在data中
                    that.setData({
                        textValue: res.data.Description,
                        num: parseFloat(res.data.Time),
                        date_start: res.data.StartTime.slice(0, 10),
                        date_end: res.data.EndTime.slice(0, 10),
                        time_start: res.data.StartTime.slice(11, 16),
                        time_end: res.data.EndTime.slice(11, 16),
                        index: res.data.Leave_type,
                        tempFilePaths: res.data.tempFilePaths
                    })
                },
                fail: function(err) {
                    wx.showToast({
                        title: '网络异常',
                        mask: true,
                        icon: 'loading'
                    })
                }
            })
        }
    },

    // 选择请假类型的索引值
    bindPickerChange: function (e) {
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
        this.setData({
            date_start: e.detail.value
        })
    },

    //结束日期
    bindDateChange_end: function (e) {
        this.setData({
            date_end: e.detail.value
        })
    },

    //开始时间
    bindTimeChange: function (e) {
        this.setData({
            time_start: e.detail.value
        })
    },

    // 结束时间
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
            tempFilePaths: '',
            file1: ""
        });
    },

    //保存草稿
    Save: function () {
        // 图片未上传
        if (this.data.tempFilePaths == '') {
            wx.showToast({
                title: '图片未上传',
                mask: true,
                icon: 'loading'
            })
        }
        // 表单校验
        if (this.data.textValue == '') {
            wx.showToast({
                title: '请填写请假内容',
                icon: 'loading',
                mask: true,
            })
        }
        if (this.data.num <= 0) {
            wx.showToast({
                title: '请选择申请时长',
                icon: 'loading',
                mask: true,
            })
        }
        if (this.data.num > 0 && this.data.textValue != ''&& this.data.tempFilePaths != '') {
            var that = this;
            // 拼接起始日期
            var startTime = this.data.date_start + ' ' + this.data.time_start;
            var endTime = this.data.date_end + ' ' + this.data.time_end;
            // 保存草稿时发送请求
            wx.request({
                // 后台给的地址
                url: 'https://oa.jltengfang.com/small/index/VacateBackup',
                // 抛给后台的数据
                data: {
                    leaveType: this.data.index,
                    endTime: endTime,
                    startTime: startTime,
                    applyTime: this.data.num,
                    textValue: this.data.textValue,
                    img: this.data.tempFilePaths,
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
                    // 草稿箱通过，返回首页
                    if (res.data.status == 'OK') {
                        wx.showToast({
                            title: '正在保存',
                            mask: true,
                            icon: 'loading',
                            success: function () {
                                setTimeout(function (){
                                    // 返回首页
                                    wx.navigateBack({
                                        delta: 2
                                    })
                                },1500);
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
    },

    // 立即提交
    Lay: function () {
        // 图片未上传
        if (this.data.tempFilePaths == '') {
            wx.showToast({
                title: '图片未上传',
                mask: true,
                icon: 'loading'
            })
        }
        // 表单校验
        if (this.data.textValue == '') {
            wx.showToast({
                title: '请填写请假内容',
                icon: 'loading',
                mask: true,
            })
        }
        if (this.data.num <= 0) {
            wx.showToast({
                title: '请选择申请时长',
                icon: 'loading',
                mask: true,
            })
        }
        if (this.data.num > 0 && this.data.textValue != '' && this.data.tempFilePaths != '') {
            var that = this;
            // 拼接起始日期
            var startTime = this.data.date_start + ' ' + this.data.time_start;
            var endTime = this.data.date_end + ' ' + this.data.time_end;
            // 验证表单信息
            // 验证通过：发送立即提交时请求
            wx.request({
                url: 'https://oa.jltengfang.com/small/index/Vacate',
                data: {
                    leaveType: this.data.index,
                    endTime: endTime,
                    startTime: startTime,
                    applyTime: this.data.num,
                    textValue: this.data.textValue,
                    img: this.data.tempFilePaths,
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
                    // 如果请假通过，则接受一个标志id，传递给下一页用来获取详细请假信息
                    if (res.data.status == 'OK') {
                        var markId = res.data.markId;
                        wx.showToast({
                            title: '正在提交',
                            mask: true,
                            icon: 'loading',
                            success: function () {
                                setTimeout(function () {
                                    wx.redirectTo({
                                        url: '../RepealLeave/RepealLeave?markId=' + markId,
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