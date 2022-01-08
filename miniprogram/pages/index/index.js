// pages/index/index.js

// 获取应用实例
const app = getApp();

Page({
  data: {
    url: "../course/info?course_id=",
    page: 0,
    inputContentValue:"",
    list_course: [{
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id: "233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id: "233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id: "233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id: "233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id: "233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id: "233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id: "233",
      },
      {
        course_name: "高等数学",
        teacher_name: "李永乐",
        start_time: "2022-1-1",
        end_time: "2022-2-2",
        course_id: "233",
      },
    ]
  },

  //获取输入课程名
  inputSearchContent: function(event)
  {
    this.data.inputContentValue = event.detail.value;
    console.log(this.data.inputContentValue)
  },

  requestSearch:function(){
    wx.request({
      url:app.globalData.apiHost + app.globalData.apiPath.courseSearch,
      method:"GET",
      header:{
        token:app.globalData.token
      },
      data:{
        key:this.data.inputContentValue
      },
      success:res =>{
        this.setData({
          list_course:res.data.list
        })
      },
      fail:res =>{
        console.log("request search fail")
      }
    })
  },
  requestSearchForInput:function()
  {
    this.requestSearch();
  },

  clearInput:function(){
    console.log(this.data.inputContentValue)
    this.setData({
      inputContentValue:""
    })
  },

  requestCourseList: function (page) {
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.courseListPath,
      method: "get",
      data: {
        type: 0,
        size: 20,
        page: page
      },
      header: {
        token: app.globalData.token
      },
      success: res => {
        var list = this.data.list_course
        if (page == 0) {
          this.setData({
            list_course: res.data.list
          })
        } else {   
          for (let item in list) {
            this.list_course.push(list[item]);
          }
          this.setData({
              list_course:this.list_course
          })
        }
      },
      fail: res => {
        console.log('request course url failed: ', res)
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestCourseList(0);
    this.setData({
      page: 1
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.requestCourseList(0);
    this.setData({
      page: 1
    })
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
    this.requestCourseList(this.data.page);
    this.setData({
      page: this.data.page + 1
    })
  },
})