// pages/scan/scan.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const ctx = wx.createCanvasContext("myCanvas")
    // 绘制一个灰色园
    ctx.arc(100, 75, 50, 0, 2 * Math.PI)
    ctx.setFillStyle("#eee")
    ctx.fill()

    //绘制一个坐标系
    ctx.beginPath()
    ctx.moveTo(40, 75)
    ctx.lineTo(160, 75)
    ctx.moveTo(100, 15)
    ctx.lineTo(100, 135)
    ctx.setStrokeStyle("aaa")
    ctx.stroke()

    //坐标系4个点的数字
    ctx.setFontSize(12)
    ctx.setFillStyle("black")
    ctx.fillText("0", 165, 78)
    ctx.fillText("0.5 * PI", 83, 145)
    ctx.fillText("1 * PI", 15, 78)
    ctx.fillText("1.5 * PI", 83, 10)

    // 绘制圆心那个点
    ctx.beginPath()
    ctx.arc(100, 75, 2, 0, 2 * Math.PI)
    ctx.setFillStyle("lightgreen")
    ctx.fill()

    //绘制1.5*PI的那个点
    ctx.beginPath()
    ctx.arc(100, 25, 2, 0, 2 * Math.PI)
    ctx.setFillStyle("blue")
    ctx.fill()

    //绘制0的那个点
    ctx.beginPath()
    ctx.arc(150, 75, 2, 0, 2 * Math.PI)
    ctx.setFillStyle("red")
    ctx.fill()

    // 绘制黑线的弧度
    ctx.beginPath()
    ctx.arc(100, 75, 50, 0, 1.5 * Math.PI)
    ctx.setStrokeStyle("#333333")
    ctx.stroke()

    ctx.draw()
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})