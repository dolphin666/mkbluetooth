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
    // ballTop:0,
    // ballLeft:0,
    screenHeight: 0,
    screenWidth: 0,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    r1: 0,
    r2: 0,
    posx: 0,
    posy: 0,
    outOFBounds: true,//超出是否可移动
    inertia: true,//惯性
    friction: 2,//摩擦系数
    damping: 20,//阻尼系数
    direction: "all",//移动方向

    colorBlack1: '#ccc',
    colorBlack2: '#ccc',
    colorBlack3: '#ccc',
    colorBlack4: '#ccc',
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
          x1: res.windowWidth / 2,
          y1: 20 + res.windowWidth / 2,
          r1: res.windowWidth / 4,
          r2: res.windowWidth / 10,
          posx: res.windowWidth / 7.45,
          posy: res.windowWidth / 7.45
        });
        console.log(_this.data.posx, _this.data.posy)
      }
    });
  },
  bindMoveEvent: function (e) {
    var that = this;
    console.log('我被拖动了....')
    var touchs = e.touches[0];
    var pageX = touchs.pageX;
    var pageY = touchs.pageY;
    // console.log(that.data.posx)
    // console.log(that.data.posy)

    //防止坐标越界,view宽高的一般 
    // if (pageX > that.data.screenWidth * 3 / 4) return;
    // if (pageX < that.data.screenWidth / 4) return;
    // if (pageY > 20 + that.data.screenWidth / 2) return;
    // if (pageY < 20) return;
    // if (((that.data.x1 - pageX) * (that.data.x1 - pageX) + (that.data.y1 - pageY) * (that.data.y1 - pageY)) > (that.data.r1) * (that.data.r1)) return;
    console.log('pageX: ' + pageX)
    console.log('pageY: ' + pageY)

    //这里用left和top.所以需要将pageX pageY转换 
    // var x = that.data.screenWidth - pageX - 30;
    // var y = that.data.screenHeight - pageY - 30;

    //   var y = that.data.screenWidth - pageY - 30;
    // var x = that.data.screenHeight - pageX - 30;
    // pageX=pageX;
    // pageY=pageY


    // console.log('x: ' + x)
    // console.log('y: ' + y)
    // if (((that.data.x1 - pageX) * (that.data.x1 - pageX) + (that.data.y1 - pageY) * (that.data.y1 - pageY)) > (that.data.r1) * (that.data.r1)) {
    //   that.setData({
    //     ballTop: pageY - 20 - that.data.areaWidth / 2 - that.data.r2,
    //     ballLeft: pageX - that.data.areaWidth / 2 - that.data.r2
    //   })
    // }
      that.setData({
        // ballTop: pageY - 20 - that.data.areaWidth / 2 - that.data.r2,
        // ballLeft: pageX - that.data.areaWidth / 2 - that.data.r2
      })

  },
  bindMoveEnd: function () {
    var that = this
    that.setData({
      posx: that.data.screenWidth / 7.45,
      posy: that.data.screenWidth / 7.45
    })
  },
  changeColor1: function () {
    var that = this;
    that.setData({
      colorBlack1: "lightGreen"
    })
  },
  changeColor2: function () {
    var that = this;
    that.setData({
      colorBlack1: "#ccc"
    })
  },
  changeColor3: function () {
    var that = this;
    that.setData({
      colorBlack2: "lightGreen"
    })
  },
  changeColor4: function () {
    var that = this;
    that.setData({
      colorBlack2: "#ccc"
    })
  },
  changeColor5: function () {
    var that = this;
    that.setData({
      colorBlack3: "lightGreen"
    })
  },
  changeColor6: function () {
    var that = this;
    that.setData({
      colorBlack3: "#ccc"
    })
  },
  changeColor7: function () {
    var that = this;
    that.setData({
      colorBlack4: "lightGreen"
    })
  },
  changeColor8: function () {
    var that = this;
    that.setData({
      colorBlack4: "#ccc"
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