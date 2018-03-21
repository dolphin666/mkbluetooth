// pages/handle/handle.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaHeight: 0,
    areaWidth: 0,
    ballHeight: 0,
    ballWidth: 0,
    ballCenterX: 0,
    ballCenterY: 0,
    screenHeight: 0,
    screenWidth: 0,
    posx: 0,
    posy: 0,
    outOFBounds: true,//超出是否可移动
    inertia: true,//惯性
    friction: 2,//摩擦系数
    damping: 20,//阻尼系数
    direction: "all",//移动方向

    colorBlack:'black'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          screenHeight: res.windowHeight,//获取屏幕宽高
          screenWidth: res.windowWidth,
          areaHeight: res.windowWidth / 2,
          areaWidth: res.windowWidth / 2,
          posx: res.windowWidth/7.78,
          posy: res.windowWidth/7.78
        });
      }
    });
  },
  bindMoveEvent: function (e) {
    var that = this;
    console.log('我被拖动了....')
    var touchs = e.touches[0];
    var pageX = touchs.pageX;
    var pageY = touchs.pageY;
    console.log(that.data.posx)
    console.log(that.data.posy)

    //防止坐标越界,view宽高的一般 
    if (pageX < 30) return;
    if (pageX > this.data.screenWidth - 30) return;
    if (this.data.screenHeight - pageY <= 30) return;
    if (pageY <= 30) return;
    console.log('pageX: ' + pageX)
    console.log('pageY: ' + pageY)
    
    //这里用right和bottom.所以需要将pageX pageY转换 
    // var x = this.data.screenWidth - pageX - 30;
    // var y = this.data.screenHeight - pageY - 30;
    // console.log('x: ' + x)
    // console.log('y: ' + y)
    // this.setData({
    //   ballBottom: y,
    //   ballRight: x
    // });

  },
  bindMoveEnd:function(){
    var that=this
    that.setData({
      posx: that.data.screenWidth / 7.82,
      posy: that.data.screenWidth / 7.82
    })
  },
  changeColor:function(){
    var that=this;
    that.setData({
      colorBlack:"lightGreen"
    })
  },
  changeColor2:function(){
    var that=this;
    that.setData({
      colorBlack:"black"
    })
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