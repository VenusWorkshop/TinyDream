// pages/notice/notice.js

//获取应用实例
const app = getApp()
var C = app.lib
Page({

    /**
     * 页面的初始数据
     */
    data: {
      msgs:[]
    },
    seek:0,
    size:20,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var page = this;
      C.TDRequest(
        'no','ng',
        {uid:app.globalData.openid,seek:this.seek,count:this.size},
        function(code,data){
          var tMsgs = []
          console.log(data.msgs)
          for(var msg in data.msgs){
            data.msgs[msg].timeStr = C.GetLocalTime(data.msgs[msg].ptime)
            //tMsgs[data.msgs[msg].nid] = data.msgs[msg]
            tMsgs.push(data.msgs[msg]);
          }
          page.setData({
              msgs: tMsgs
          })

          if (page.data.msgs.length == 0) {
            wx.showToast({
              title: '暂无通知',
              icon: 'none'
            })
          }
            console.log(data)
        },
        function(code,data){

        }
      )
    },
    viewDetials:function(res){
      var page = this
        console.log(res.currentTarget.id);
        for(var key in this.data.msgs){
          if(this.data.msgs[key].nid == res.currentTarget.id){
            var msg = this.data.msgs[key];
            wx.showModal({
              title: '详情',
              content: msg.content,
              showCancel:false,
              confirmText:"知道了",
              success(res){
                C.TDRequest('no', 'nr', {nid: msg.nid},
                function(code,data){
                  page.onLoad()
                  }, function (code, data) {
                    page.onLoad()
                })
              }
            })
            break;
          }
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})