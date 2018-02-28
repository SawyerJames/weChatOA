Page({
    data: {
        latitude: '',
        longitude: ''
    },
    onLoad: function () {
        var that = this;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                wx.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 28,
                    name: '战争世界',
                    success: function (){

                    }
                })
            }   
        })
    }
})
