// pages/message/message.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    list_message:[
      {
        type:0,
        course_name:"高等数学",
        time:"2022-1-1 12:30",
        useravatar:"../../images/user-unlogin.png",
        user_name:"vvv",
        comment_content:"这课太棒了！！！",
      },
      {
        type:1,
        course_name:"高等数学",
        time:"2022-1-1 12:30",
        useravatar:"../../images/user-unlogin.png",
        user_name:"vvv",
        comment_content:"这课太棒了！！！",
      },
      {
        type:0,
        course_name:"高等数学",
        time:"2022-1-1 12:30",
        useravatar:"../../images/user-unlogin.png",
        user_name:"vvv",
        comment_content:"这课太棒了！！！",
      },
      {
        type:2,
        course_name:"高等数学",
        time:"2022-1-1 12:30",
        useravatar:"../../images/user-unlogin.png",
        user_name:"vvv",
        comment_content:"这课太棒了！！！萨库的工卡速干的卡上给大家阿斯顿吉萨买点卡圣诞节阿斯顿ksagdkasdkaskd刷卡股东卡三个德国卡仕达卡仕达",
      },
    ]
  },

  requestMessageList:function(page)
  {
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.messagePath,
      method: "get",
      data:{
        size:20,
        page:page
      },
      header:{
        token:app.globalData.token
      },
      success: res => {
        var list =  res.data.list
        if(page == 0)
        {
          this.setData({
            list_message:res.data.list
          })
        }else{
          for (let i in list)
          {
            this.list_message.push(list[i])
          }
          this.setData({
            list_message:this.list_message
          })
        }
      },
      fail: res => {
        console.log('request login url failed: ', res)
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestMessageList(0)
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
    this.requestMessageList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: "加载中"
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    this.setData({
      page:this.page+1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})