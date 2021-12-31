// pages/index/index.js

// 获取应用实例
const app = getApp();
var flag = true;

Page({
  data: {
    msgColor: "msg-blue",
  },

  clickMsg: function() {
    console.log("click msg");
    console.log("change msg's color");
    var color = this.data.msgColor;
    console.log(color);
    if (flag) {
      color = "msg-red";
      flag = false;
    } else {
      color = "msg-blue";
      flag = true;
    }
    this.setData({msgColor: color});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('app.golbalData: ', app.gloablData);
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