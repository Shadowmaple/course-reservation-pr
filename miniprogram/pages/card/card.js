// pages/card/card.js

const app = getApp()

Page({
  data: {
    hasData: false,
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
    }]
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
        console.log('request cardInfo res:', resp)
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
  },

  // 点击充值
  clickPayment: function () {
    wx.showModal({
      title: '积分充值',
      content: '',
      showCancel: true,
      confirmText: '确定充值',
      placeholderText: '输入充值金额',
      editable: true,
      success: res => {
        console.log(res)
        if (res.confirm) {
          let value = Number(res.content)
          wx.showModal({
            title: "确认充值？",
            showCancel: true,
            confirmText: '确认',
            success: res => {
              if (res.confirm) {
                this.requestUpdateBalance(value)
                wx.showToast({
                  title: '充值成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    })
  },

  // 请求更改积分余额
  requestUpdateBalance: function (value=Number) {
    console.log('requestUpdateBalance: ', value)
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.cardBalancePath,
      method: 'POST',
      header: {
        token: app.globalData.token,
      },
      data: {
        value: value,
        type: 1,
      },
      success: res => {
        let resp = res.data
        if (resp.code != 0) {
          console.warn('request update balance error: ', resp.code, resp.msg)
          return
        }
        this.setData({
          balance: resp.data.balance,
        })
      },
      fail: res => {
        console.error('request update balance error: ', res)
      }
    })
  },
})