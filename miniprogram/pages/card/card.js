// pages/card/card.js

const app = getApp()

Page({
  data: {
    hasData: true,
    balance: 0,
    records: [
      {
        type: 1, // 0->新增积分，1->减少积分
        value: 20, // 增减积分数
        event: "预约课程 计算机网络 成功" // 发生事件
      },
      {
        type: 0, // 0->新增积分，1->减少积分
        value: 30, // 增减积分数
        event: "取消预约课程 操作系统 成功" // 发生事件
      },
    ]
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