//index.js
const app = getApp()
const UnloginAvatar = '../../images/user-unlogin.png'

Page({
  data: {
    avatarUrl: UnloginAvatar,
    hasUserInfo: false,
    nickName: '未登录',
  },

  onLoad: function () {
    console.log('golbalData: ', app.globalData)
    if (!this.data.hasUserInfo && app.globalData.hasUserInfo) {
      var userInfo = app.globalData.userInfo
      var nickName = userInfo.nickName || this.data.nickName
      var avatar = userInfo.avatar || this.data.avatarUrl
      console.log('test: ', userInfo, nickName, avatar)
      this.setData({
        avatarUrl: avatar,
        hasUserInfo: true,
        nickName: nickName,
      })
    }
  },

  clickJumpUserInfo: function () {
    var jumpUrl = '../user-info/user-info?nickName=' +
      this.data.nickName + '&avatar=' + this.data.avatarUrl
    wx.navigateTo({
      url: jumpUrl,
    })
  },

  onShow: function () {
    console.log('user-page on show')
  }
})