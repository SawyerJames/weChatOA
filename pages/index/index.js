Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {




    },
    //申请进度
    Application:function() {
        wx.navigateTo({
            url: '/pages/Application/Application'
        })
    },
    //请假申请
    Leave:function(){
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
    }
})