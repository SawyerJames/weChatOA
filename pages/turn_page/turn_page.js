// pages/turn_page/turn_page.js
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
      setTimeout(function () {
          wx.redirectTo({
              url: '/pages/index/index'
          })
      }, 5000)
  },
  //进如草稿箱
  On: function () {
      wx.redirectTo({
          url: '/pages/My_Draft/My_Draft'
      })
  },
  

})