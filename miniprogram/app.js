// app.js
App({
  globalData: {
    token: "",
    userInfo: {},
    hasUserInfo: false,
    apiHost: "http://127.0.0.1:8080",
    apiPath : {
      loginPath: "/login",
      courseListPath: "/course/list",
      courseInfoPath: "/course/info",
      userInfoPath: "/user/info",
      cardInfoPath: "/card/info",
      messageinfoPath:"/message",
      reserveinfoPath:"/record/list",
      commentListPath: "/comment/list",
      reserveCoursePath: "/course/reserve",
      commentPublishPath: "/comment",
      commentLikePath: "/comment/like",
    }
  },

  // 监听小程序启动
  onLaunch: function () {
    console.log('App Launch')

    // 检查是否登录
    this.checkLogin(res => {
      console.log('is_login: ', res.is_login)
      if (!res.is_login) {
        this.login()
        console.log("test this1: ", this)
        wx.showModal({
          title: '授权登陆',
          content: '授权微信登陆并获取基本信息',
          showCancel: false,
          confirmText: '授权',
          placeholderText: 'test',
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定')
              console.log("test this2: ", this)
              this.getUserProfile()
            }
          }
        })
      } else {
        var userInfo = wx.getStorageSync('userInfo')
        console.log('userInfo in storage: ', userInfo)
        if (userInfo) {
          this.globalData.userInfo = userInfo
          this.globalData.hasUserInfo = true
        }
      }
    })

  },

  // 检查是否登陆，token是否存在
  checkLogin: function (callback) {
    var token = this.globalData.token
    console.log('token: ', token)
    if (token === "") {
      // 从缓存中获取 token
      token = wx.getStorageSync('token')
      console.log('get token from storage: ', token)
      // 缓存不存在token，调用回调函数，重新登陆、获取token
      if (!token || token === "") {
        callback({
          is_login: false
        })
        return
      }
      this.globalData.token = token
    }
    callback({
      is_login: true
    })
    return
  },

  // 登录，oauth2，请求后台登陆接口
  login: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("login code: " + res.code)
        if (!res.code) {
          console.log('登录失败！' + res.errMsg)
          return
        }
        wx.request({
          url: this.globalData.apiHost + this.globalData.apiPath.loginPath,
          method: 'post',
          data: {
            code: res.code
          },
          success: res => {
            console.log('res: ', res)
            console.log('token: ' + res.data.token)
            // 保存到全局数据
            this.globalData.token = res.data.token
            // 保存到缓存
            wx.setStorage({
              key: 'token',
              data: res.data.token,
            })
          },
          fail: res => {
            console.log('request login url failed: ', res)
          }
        })
      }
    })
  },

  // 获取用户信息，调用wx方法
  getUserProfile: function () {
    console.log("test this3: ", this)
    // 使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息',
      success: res => {
        console.log("getUserProfile res: ", res)
        console.log("test this4: ", this)
        this.globalData.userInfo = res.userInfo
        this.globalData.hasUserInfo = true
        wx.setStorage({
          key: 'userInfo',
          data: res.userInfo
        })
      },
      fail: res => {
        console.log('getUserProfile fail res: ', res)
      }
    })
  },

  // 监听小程序展示
  onShow: function () {
    console.log('App Show')
  },
  // 监听小程序隐藏
  onHide: function () {
    console.log('App Hide')
  }
})