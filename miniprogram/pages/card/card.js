// pages/card/card.js

const app = getApp()

Page({
  data: {
    hasData: true,
    balance: 40,
    records: [{
        id: 2,
        type: 1, // 0->新增积分，1->减少积分
        value: 20, // 增减积分数
        event: "预约课程 计算机网络 成功", // 发生事件
        time: "2022-01-01 12:00"
      }, {
        id: 3,
        type: 0, // 0->新增积分，1->减少积分
        value: 30, // 增减积分数
        event: "取消预约课程 操作系统 成功", // 发生事件
        time: "2022-01-01 12:00"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestCardData()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.requestCardData()
  },

  requestCardData: function () {
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.cardInfoPath,
      method: 'get',
      header: {
        'token': app.globalData.token,
      },
      success: res => {
        // todo
        this.setData({
          hasData: true,
          balance: res.data.data.balance,
          records: res.data.data.records,
        })
      },
      fail: res => {
        console.log('request cardInfo failed: ', res)
      }
    })
  }
})