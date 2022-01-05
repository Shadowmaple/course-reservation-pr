// pages/index/index.js

// 获取应用实例
const app = getApp();

Page({
  data: {
    course: "高等数学",
    teacher: "李永乐",
    date: "2022-1-1 ~ 2022-2-2",
    course_id:"233",
    url:"../course/info?course_id=122"
  },

  click_course: function () {
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.courseListPath,
      method: "post",
      success: res => {
        for (i = 0; i < res.data.data.toal; i++)
        this.setData({
          course:res.data.data.list.course_name,
          teacher:res.data.data.list.teacher_name,
          date:res.data.data.list.start_time + "~" + res.data.data.list.end_time,
          course_id:res.data.data.list[i].course,
          url:"../course/info?course_id=" + course_id
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