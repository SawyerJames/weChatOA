// pages/Reimbursement/Reimbursement.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        array: ['demo1', 'demo1', 'demo1', 'demo1'],
        objectArray: [
            {
                id: 0,
                name: 'demo1'
            },
            {
                id: 1,
                name: 'demo1'
            },
            {
                id: 2,
                name: 'demo1'
            },
            {
                id: 3,
                name: 'demo1'
            }
        ],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },
    //当前选择
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    //保存草稿
   Save:function(){
       wx.request({
           // 后台给的地址
           url: '',
           // 抛给后台的数据
           data: { 
           },
           header: {},
           method: 'POST',
           dataType: 'json',
           success: function (res) { },
           fail: function (err) {
               wx.redirectTo({
                   url: '/pages/turn_page/turn_page'
               })
           }
       }) 
   }
})