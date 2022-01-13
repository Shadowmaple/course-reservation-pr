// pages/user-info/user-info.js
Page({
  data: {
    avatar: "",
    nickName: "",
    inputValue: "",
    hasUpdated: false,
  },

  onLoad: function (options) {
    console.log('user-info page onLoad:', options)
    var nickName = options.nickName
    var avatar = options.avatar
    this.setData({
      avatar: avatar,
      nickName: nickName,
      inputValue: nickName,
    })
  },

  onUnload: function () {},

  // 更改输入框信息
  InputValueEvent: function (event) {
    this.data.inputValue = event.detail.value
  },

  // 点击确认修改用户信息
  clickUpdate: function (event) {
    wx.showModal({
      title: '提示',
      content: '确认保存修改？',
      success: res => {
        if (res.confirm) {
          this.setData({
            avatar: this.data.avatar,
            nickName: this.data.inputValue,
            hasUpdated: true,
          })
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500,
          })
        }
      },
    })
  },

  // 点击上传头像
  clickUpload: function (event) {
    this.doUpload()
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
})