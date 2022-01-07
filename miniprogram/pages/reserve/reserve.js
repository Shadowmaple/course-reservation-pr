// pages/reserve/reserve.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    list_record:[
      {
        course_name:"高等数学",
        has_reserved:true,
        course_id:233,
        teacher_name:"李明",
        current_num:20,
        total:50,
        start_time:"2022.1.1",
        end_time:"2022.2.2",
        status:0,
      },{
        course_name:"高等数学",
        has_reserved:true,
        course_id:233,
        teacher_name:"李明",
        current_num:20,
        total:50,
        start_time:"2022.1.1",
        end_time:"2022.2.2",
        status:1,
      },{
        course_name:"高等数学",
        has_reserved:true,
        course_id:233,
        teacher_name:"李明",
        current_num:20,
        total:50,
        start_time:"2022.1.1",
        end_time:"2022.2.2",
        status:2,
      },{
        course_name:"高等数学",
        has_reserved:true,
        course_id:233,
        teacher_name:"李明",
        current_num:20,
        total:50,
        start_time:"2022.1.1",
        end_time:"2022.2.2",
        status:0,
      }
    ]
  },


  click:function(event){
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.reserveinfoPath,
      method: "get",
      data:{
        type:event.currentTarget.dataset.type,
        size:20,
        page:0
      },
      header:{
        token:app.globalData.token
      },
      success: res => {
        this.setData({
          list_record:res.data.data.list,
          type:event.currentTarget.dataset.type
        })
      },
      fail: res => {
        console.log(event.currentTarget.dataset.type)
        this.setData({
          type:1
        })
      },
    })
  },

  requestReserve:function(event){
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.reservePath,
      method: "post",
      data:{
        course_id:event.currentTarget.dataset.record.course_id,
        has_reserved:!(event.currentTarget.dataset.record.hasReserved),
      },
      header:{
        token:app.globalData.token
      },
      success: res => {
        var index=event.currentTarget.dataset.index
        this.data.list_record[index].has_reserved = !res.data.has_reserved;
        this.setData({
        })
      },
      fail: res => {
        var index=event.currentTarget.dataset.index
        this.data.list_record[index].has_reserved = false;// = !res.data.has_reserved
        console.log(this.data.list_record[index].has_reserved)
        this.setData({
        })
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.reserveinfoPath,
      method: "get",
      data:{
        type:0,
        size:20,
        page:0
      },
      header:{
        token:app.globalData.token
      },
      success: res => {
        this.setData({
          list_record:res.data.data.list
        })
      },
      fail: res => {
        console.log()
      },
    })
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