// pages/index/index.js

// 获取应用实例
const app = getApp();

Page({
  data: {
    list_course:[
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id:"233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id:"233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id:"233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id:"233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id:"233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id:"233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id:"233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id:"233",
      },
    ]
  },
  

  click_course: function () {
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.courseListPath,
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
          list_course:res.data.data.list
        })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})