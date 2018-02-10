Page({

    /**
     * 页面的初始数据
     */
    data: {
        List: {
            Type: '事假',
            Things: '婚礼筹备',
            Day: '15天',
            date_end: '2017-09-01——2017-10-01',
            Sta: '审核中',
            
            Content: [
                {
                    time: '2018-01-18',
                    times: '8:00',
                    name: '周杰伦',
                    goType: '(已同意)',
                    imgSrc: '/images/photo1.png',
                    // 审批状态：0请假申请
                    state: 0
                },
                {
                    time: '2018-01-18',
                    times: '8:00',
                    name: '周杰伦',
                    goType: '(已同意)',
                    imgSrc: '/images/photo.png',
                    // 审批状态：0请假申请
                    state: 0
                },
                {
                    time: '2018-01-18',
                    times: '8:00',
                    name: '周杰伦',
                    goType: '(已同意)',
                    imgSrc: '/images/photo.png',
                    // 审批状态：0请假申请
                    state: 0
                },
            ]
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.request({
            url: '',
            data: {
                Uid: 111
            },
            header: {},
            method: 'POST',
            dataType: 'json',
            success: function (res) {},
            fail: function (err) {}
        })
    },
    // 撤销申请
    modalcnt: function () {
        var that = this;
        wx.showModal({
            title: '',
            content: '请问确定撤消吗？',
            success: function (res) {
                if (res.confirm) {
                    wx.request({
                        // 后台给的地址
                        url: '',
                        // 抛给后台的数据
                        data: {
                            id: that.data.id
                        },
                        // 后台的请求头
                        header: {},
                        //post往后台发数据，get从后台得到数据
                        method: 'POST',
                        dataType: 'json',
                        success: function (res) {

                        },
                        fail: function (err) {
                            wx.redirectTo({
                                url: '/pages/Leave_page/Leave_page'
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})