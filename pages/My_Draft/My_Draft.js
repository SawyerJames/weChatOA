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
                state: 0
            },
            {
                time: '2018-01-18',
                name: '高诗敏',
                goType: '事假申请',
                goname: '请假原因',
                gocontent: '世界那么大，我想去看看。。。',
                // 审批状态：公出申请
                state: 1
            },
            {
                time: '2018-01-18',
                name: '高诗敏',
                goType: '事假申请',
                goname: '请假原因',
                gocontent: '世界那么大，我想去看看。。。',
                // 审批状态：公出申请
                state: 1
            }

        ]
    },
    click_content: function (event) {
        //获取当前item的下标id  通过currentTarget.id
        var id = event.currentTarget.id;
        console.log(id);
    },
    modalcnt: function () {
        wx.showModal({
            title: '',
            content: '请问确定删除吗？',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')

                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })