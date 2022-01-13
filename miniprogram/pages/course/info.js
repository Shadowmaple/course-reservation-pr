// pages/course/info.js

const app = getApp()
const DefaultSize = 20
const DefaultUserAvatar = "../../images/user-unlogin.svg"

Page({
  data: {
    isHideLoadMore: false,
    hasData: true,
    courseID: 0,
    currentPage: 0,
    inputCommentValue: "",
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
      userAvatar: "../../images/user-unlogin.svg",
      likeNum: 5, // 点赞数量
      hasLiked: true, // 该用户是否已点赞
    }, {
      id: 2, // 评论id
      content: "这个用户很懒，什么都没评论~送到房间辣ddddddddddddddddddddddddddddddddddddddddd撒旦法",
      time: "2020-02-02 12:02",
      userNickname: "有影子的猫hey",
      userAvatar: "../../images/user-unlogin.svg",
      likeNum: 5, // 点赞数量
      hasLiked: false, // 该用户是否已点赞
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var courseID = options.course_id
    if (!courseID || courseID <= 0) {
      console.error('no course_id or is error: ', options)
      return
    }
    this.requestCourseInfo(courseID)
    this.requestCommentList(courseID, DefaultSize, 0)
    this.setData({
      courseID: courseID,
      currentPage: 1,
    })
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
        let resp = res.data
        if (resp.code != 0) {
          console.warn('request courseInfo error:', resp.code, resp.msg)
          return
        }
        let data = resp.data
        let courseInfo = {
          courseID: data.course_id,
          courseName: data.course_name,
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
  requestCommentList: function (courseID, size, page) {
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.commentListPath,
      method: 'GET',
      header: {
        token: app.globalData.token
      },
      data: {
        course_id: courseID,
        size: size,
        page: page,
      },
      success: res => {
        var resp = res.data
        console.log('requestCommentList res: ', resp)
        if (resp.code != 0) {
          console.warn('requestCommentList error: ', resp)
          return
        }
        var list = new Array
        if (this.data.page > 0) {
          list = this.data.commentList
        }
        for (let i in resp.data.list) {
          var item = resp.data.list[i]
          list.push({
            id: item.comment_id, // 评论id
            content: item.content,
            time: item.time,
            userNickname: item.user_nickname,
            userAvatar: item.user_avatar,
            likeNum: item.like_num,
            hasLiked: item.has_liked,
          })
        }
        this.setData({
          commentList: list,
        })
      },
      fail: res => {
        console.error('request commentList error: ', res)
      }
    })
  },

  // 请求预约/取消预约API
  requestReservedAPI: function (hasReserved = Boolean) {
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.reserveCoursePath,
      method: 'POST',
      header: {
        token: app.globalData.token,
      },
      data: {
        'course_id': this.data.courseID,
        'has_reserved': hasReserved, // 期望更改的状态
      },
      success: res => {
        var resp = res.data
        console.log('request reserve API ok: ', resp)
        if (resp.code != 0) {
          console.warn('request reserve API error:', resp.code, resp.msg)
          return
        }
        var courseInfo = this.data.courseInfo
        courseInfo.hasReserved = resp.data.has_reserved
        this.setData({
          courseInfo: courseInfo,
        })
      },
      fail: res => {
        console.error('request reserve API error: ', res)
      },
    })
  },

  // 请求发布/修改评论API
  // commentID=0为发布新评论，否则为修改原评论
  requestCommentPublish: function (content = String, commentID = Number) {
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.commentPublishPath,
      method: 'POST',
      header: {
        token: app.globalData.token,
      },
      data: {
        'course_id': this.data.courseID,
        'id': commentID,
        'content': content,
      },
      success: res => {
        var resp = res.data
        console.log('request comment publish API ok: ', resp)
        if (resp.code != 0) {
          console.warn('request comment publish API error:', resp.code, resp.msg)
          return
        }
        // commentID不为0需要修改评论展示内容，发布新评论暂时先不考虑
        if (commentID == 0) {
          return
        }
        var commentList = this.data.commentList
        // 查找目标评论
        var index = 0
        for (; index < commentList.length(); index++) {
          if (commentList[index].id == commentID) {
            break
          }
        }
        if (index >= commentList.length()) {
          return
        }
        commentList[index].content = content
        this.setData({
          commentList: commentList,
        })
      },
      fail: res => {
        console.error('request comment publish API error: ', res)
      },
    })
  },

  // 点击预约/取消预约
  clickReserveCourse: function (event) {
    console.log('clickReserveCourse event:', event)
    var expectRserved = !event.currentTarget.dataset.hasReserved // 期望更改的预约状态

    this.requestReservedAPI(expectRserved)
  },

  // 在评论框中输入内容触发的事件
  inputCommentContent: function (event) {
    console.log('input: ', event)
    this.data.inputCommentValue = event.detail.value
  },

  // 点击发送评论（input组件中输入键盘上确认按钮）
  clickPublishCommentForInput: function(event) {
    var content = event.detail.value
    console.log('clickPublishCommentForInput content: ', content)
    if (content === "") {
      return
    }
    // 清空输入框
    this.setData({
      inputCommentValue: "",
    })
    this.requestCommentPublish(content, 0)
  },

  // 点击发送评论（自定义发送按钮）
  clickPublishComment: function (event) {
    var content = this.data.inputCommentValue
    console.log('clickPublishComment content: ', content)
    if (content === "") {
      return
    }
    // 清空输入框
    this.setData({
      inputCommentValue: "",
    })
    this.requestCommentPublish(content, 0)
  },

  // 点击修改评论
  // todo
  clickUpdateComment: function (event) {},

  // 点击点赞/取消点赞
  clickLike: function (event) {
    var expectLiked = !event.currentTarget.dataset.hasLiked // 期望更改的点赞状态
    var id = event.currentTarget.dataset.id
    var index = event.currentTarget.dataset.index
    console.log('request params:', id, expectLiked, index)

    // 请求点赞API
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.commentLikePath,
      method: 'POST',
      header: {
        token: app.globalData.token,
      },
      data: {
        id: id,
        has_liked: expectLiked,
      },
      success: res => {
        var resp = res.data
        console.log('request commentLike res:', resp)
        if (resp.code != 0) {
          console.warn('request commentLike API error:', resp.code, resp.msg)
          return
        }
        var commentList = this.data.commentList
        if (commentList.length() <= index) {
          console.error('commentLike click error: index!=length: ', index, commentList.length())
          return
        }
        commentList[index].hasLiked = resp.has_liked
        this.setData({
          commentList: commentList,
        })
      },
      fail: res => {
        console.error('request commentLike API error: ', res)
      },
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 加载动画
    wx.showNavigationBarLoading() // 在标题栏中显示加载
    setTimeout(function() {
      wx.hideNavigationBarLoading() // 完成停止加载
      wx.stopPullDownRefresh() // 停止下拉刷新
    }, 1500)

    var courseID = this.data.courseID
    if (courseID <= 0) {
      console.log('refresh failed: courseID is empty.')
      wx.hideNavigationBarLoading() // 完成停止加载
      wx.stopPullDownRefresh() // 停止下拉刷新
      return
    }
    this.requestCourseInfo(courseID)
    this.requestCommentList(courseID, DefaultSize, 0)
    this.setData({
      currentPage: 0,
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

    if (this.data.courseID == 0) {
      console.log('refresh failed: courseID is empty.')
      return
    }
    // 下拉获取新的列表
    this.requestCommentList(this.data.courseID, DefaultSize, this.data.currentPage)
    this.setData({
      currentPage: this.data.currentPage + 1,
    })
  },
})