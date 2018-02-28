//show.js  
//获取应用实例    
var app = getApp()
Page({
    data: {
        List: [
            {
                time: '2018-01-18',
                name: '高诗敏',
                goType: '事假申请',
                goname: '请假原因',
                gocontent: '世界那么大，我想去看看。。。',
                // 审批状态：0请假申请
                state: 0,
                id: 1
            },
            {
                time: '2018-01-18',
                name: '高诗敏',
                goType: '事假申请',
                goname: '请假原因',
                gocontent: '世界那么大，我想去看看。。。',
                // 审批状态：公出申请
                state: 1,
                id: 2
            },
            {
                time: '2018-01-18',
                name: '高诗敏',
                goType: '事假申请',
                goname: '请假原因',
                gocontent: '世界那么大，我想去看看。。。',
                // 审批状态：公出申请
                state: 1,
                id: 3
            }
        ]
    },
    onLoad: function () {
        var that = this;
        wx.request({
            url: '',
            //向后台传的数据
            data: {},
            header: {},
            method: GET,
            dataType: json,
            success: function (res) {
                that.setData({
                    List: res
                })
            },
            fail: function (err) { },
        })
    },
    click_content: function (event) {
        //获取当前item的下标id  通过currentTarget.id
        var id = event.currentTarget.id;
        console.log(id);
        wx.navigateTo({
            url: '/pages/Leave_page/Leave_page',
        })
    },
    modalcnt: function (e) {
        var id = e.target.dataset.id
        wx.showModal({
            title: '',
            content: '请问确定删除吗？',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.request({
                        url: '',
                        data: {
                            id: id
                        },
                        header: {},
                        method: POST,
                        dataType: json,
                        success: function (res) {
                            var that = this;
                            wx.request({
                                url: '',
                                //向后台传的数据
                                data: {},
                                header: {},
                                method: GET,
                                dataType: json,
                                success: function (res) {
                                    that.setData({
                                        List: res
                                    })
                                },
                                fail: function (res) { },
                            })
                        },
                        fail: function (res) { },
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})
