// pages/course/info.js

const app = getApp()

Page({
  data: {
    hasData: true,
    courseInfo: {
      courseID: 233,
      courseName: "操作系统",
      teacher: "王富贵",
      courseDesc: "这个课程很懒，什么都没写~红红火火恍恍惚惚或或或或或或或或或或或或或或或或或或或或或或或或或或或或",
      total: 100,
      currentNum: 20,
      commentNum: 2,
      startTime: "2022-01-31",
      endTime: "2022-02-22",
      status: 0, // 课程状态：0->可预约，1->已开课, 2->已结束
      image: "http://spoc.ccnu.edu.cn/images/notimg/notimg-1.jpg",
      price: 20,
      period: 50,
      hasReserved: false,
    },
    commentList: [{
      id: 5, // 评论id
      content: "这个用户很懒，什么都没评论~",
      time: "2020-02-02 12:02",
      userNickname: "有影子的猫hey",
      userAvatar: "../../images/user-unlogin.png",
      likeNum: 5, // 点赞数量
      hasLiked: true, // 该用户是否已点赞
    },{
      id: 2, // 评论id
      content: "这个用户很懒，什么都没评论~送到房间辣ddddddddddddddddddddddddddddddddddddddddd撒旦法",
      time: "2020-02-02 12:02",
      userNickname: "有影子的猫hey",
      userAvatar: "../../images/user-unlogin.png",
      likeNum: 5, // 点赞数量
      hasLiked: false, // 该用户是否已点赞
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.course_id) {
      console.error('no course_id: ', options)
      return
    }
    var courseID = options.course_id
    this.requestCourseInfo(courseID)
    this.requestCommentList(courseID)
  },

  // 请求课程详情API
  requestCourseInfo: function (courseID) {
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.courseInfoPath,
      method: 'GET',
      header: {
        token: app.globalData.token
      },
      data: {
        id: courseID
      },
      success: res => {
        var data = res.data
        var courseInfo = {
          courseID: data.course_id,
          courseName: data.courseName,
          teacher: data.teacher_name,
          courseDesc: data.course_desc,
          total: data.total,
          currentNum: data.current_num,
          commentNum: data.comment_num,
          startTime: data.start_time,
          endTime: data.end_time,
          status: data.status, // 课程状态：0->可预约，1->已开课, 2->已结束
          image: data.image,
          price: data.price,
          period: data.period,
          hasReserved: data.has_reserved,
        }
        this.setData({
          hasData: true,
          courseInfo: courseInfo,
        })
      },
      fail: res => {
        console.error('request courseInfo failed: ', res)
      }
    })
  },

  // 请求评论API
  requestCommentList: function (courseID) {
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.commentListPath,
      method: 'GET',
      header: {
        token: app.globalData.token
      },
      data: {
        course_id: courseID,
        size: 20,
        page: 0,
      },
      success: res => {
        var list = new Array
        for (let i in res.data.list) {
          var item = res.data.list[i]
          list.push({
            id: item.id, // 评论id
            content: item.content,
            time: item.time,
            userNickname: item.user_nickname,
            userAvatar: item.user_avatar,
            likeNum: item.like_num,
            hasLiked: item.has_liked,
          })
        }
      },
      fail: res => {
        console.error('request commentList error: ', res)
      }
    })
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