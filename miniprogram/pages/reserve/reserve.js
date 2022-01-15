// pages/reserve/reserve.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "../course/info?course_id=",
    type:0,
    page:0,
    list_record:[
      {
        course_name:"高等数学",
        has_reserved:true,
        course_id:233,
        teacher_name:"李明",
        current_num:20,
        total:50,
        start_time:"2022.1.1",
        end_time:"2022.2.2",
        status:0,
      },{
        course_name:"高等数学",
        has_reserved:true,
        course_id:233,
        teacher_name:"李明",
        current_num:20,
        total:50,
        start_time:"2022.1.1",
        end_time:"2022.2.2",
        status:1,
      },{
        course_name:"高等数学",
        has_reserved:true,
        course_id:233,
        teacher_name:"李明",
        current_num:20,
        total:50,
        start_time:"2022.1.1",
        end_time:"2022.2.2",
        status:2,
      },{
        course_name:"高等数学",
        has_reserved:true,
        course_id:233,
        teacher_name:"李明",
        current_num:20,
        total:50,
        start_time:"2022.1.1",
        end_time:"2022.2.2",
        status:0,
      }
    ]
  },


  click:function(event){
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.reserveListPath,
      method: "get",
      data:{
        type:event.currentTarget.dataset.type,
        size:20,
        page:0
      },
      header:{
        token:app.globalData.token
      },
      success: res => {
        console.log("recordlist res:",res.data)
        this.setData({
          list_record:res.data.data.list,
          type:event.currentTarget.dataset.type,
        })
      },
      fail: res => {
        console.log("(click)request recordlist failed")
      },
    })
  },
  //重新预约申请
  requestReserve:function(event){
    // 点击的课程记录
    let item = event.currentTarget.dataset.record

    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.reserveCoursePath,
      method: "post",
      data:{
        course_id: event.currentTarget.dataset.record.course_id,
        has_reserved: !(event.currentTarget.dataset.record.hasReserved),
      },
      header:{
        token:app.globalData.token
      },
      success: res => {
        console.log("reserve res:",res.data)
        var index=event.currentTarget.dataset.index
        this.data.list_record[index].has_reserved = !(this.data.list_record[index].has_reserved);
        this.setData({
        })

        // 发起修改积分请求
        this.requestUpdateBalance(item.price, 0)
      },
      fail: res => {
        console.log("requestreserve failed")
      },
    })
  },

  //请求预约列表
  requestReserveList:function(page){
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.reserveListPath,
      method: "get",
      data:{
        type:this.data.type,
        size:20,
        page:page
      },
      header:{
        token:app.globalData.token
      },
      success: res => {
        console.log("reservelist res:",res.data)
        var list = this.data.list_record
        var newlist = res.data.data.list
        if(page==0)
        {
          this.setData({
            list_record:newlist
          })
        } else{
          for (let item in newlist) {
            list.push(newlist[item]);
          }
          this.setData({
              list_record:list
          })
        }
      },
      fail: res => {
        console.log("requestreservelist failed")
      },
    })
  },

  // 请求更改积分余额
  // 0->扣分，1->加分
  requestUpdateBalance: function (value=Number, type=Number) {
    console.log('requestUpdateBalance: ', value)
    wx.request({
      url: app.globalData.apiHost + app.globalData.apiPath.cardBalancePath,
      method: 'POST',
      header: {
        token: app.globalData.token,
      },
      data: {
        value: value,
        type: type,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.requestReserveList(0)
   this.data.page = 1
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    setTimeout(function () {
      wx.hideLoading()
    }, 500)

    this.requestReserveList(0);
    this.data.page = 1
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
    this.requestReserveList(this.data.page);
   this.data.page = this.data.page+1
  },
})