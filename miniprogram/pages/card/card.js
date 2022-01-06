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
    }, ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestCardData(true)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() // 在标题栏中显示加载

    this.requestCardData(true)

    wx.hideNavigationBarLoading() // 完成停止加载
    wx.stopPullDownRefresh() // 停止下拉刷新
  },

  // 请求储值卡信息API
  requestCardData: function (refresh = Boolean) {
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.cardInfoPath,
      method: 'GET',
      header: {
        token: app.globalData.token,
      },
      success: res => {
        var resp = res.data
        if (resp.code != 0) {
          console.warn('request cardInfo failed failed:', resp)
          return
        }

        var list = this.data.records
        var balance = this.data.balance
        if (refresh) {
          list = resp.data.records
          balance = resp.data.balance
        } else {
          list.concat(resp.data.records)
        }

        this.setData({
          hasData: true,
          balance: balance,
          records: list,
        })
      },
      fail: res => {
        console.log('request cardInfo failed: ', res)
      }
    })
  }
})