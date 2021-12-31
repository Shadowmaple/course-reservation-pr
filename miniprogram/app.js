// app.js
App({
  globalData: {
    token: null,
    userInfo: null,
  },

  // 监听小程序启动
  onLaunch: function () {
    console.log('App Launch')

    // 检查是否登录
    this.checkLogin(res => {
      console.log('is_login: ', res.is_login)
      if (!res.is_login) {
        this.login()
      }
    })
  },

  // 检查是否登陆，token是否存在
  checkLogin: function (callback) {
    var token = this.globalData.token
    console.log('token: ', token)
    if (!token) {
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
          url: 'http://127.0.0.1:3000/login',
          method: 'post',
          data: {
            code: res.code
          },
          success: res => {
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
            console.log('request login url failed: ' + res)
          }
        })
      }
    })
  },

  // 获取用户信息
  getUserInfo: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
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
