// pages/scan/scan.js
var app=getApp()
var interval;
var varName;
var ctx2 = wx.createCanvasContext('myCanvas2');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0,
      value:""
    },
    count: 100, // 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    //读电位数
    
    //绘制色盘
    const ctxImg = wx.createCanvasContext("imgCanvas");
    ctxImg.drawImage("../../img/sehuan.png", 0, 0, 175, 175)
    ctxImg.draw()
  },
  getOrigin:function(e){
    var that=this;
    var touchs = e.touches[0];
     console.log(touchs)
    var pageX = touchs.x;
    var pageY = touchs.y;
    // console.log('pageX: ' + that.pageX)
    // console.log('pageY: ' + that.pageY)  
    wx.canvasGetImageData({
      canvasId: 'imgCanvas',
      x: pageX,
      y: pageY,
      width: 1,
      height: 1,
      success(res) {
        // console.log(res.width) // 100
        // console.log(res.height) // 100
        // console.log('pageX: ' + that.pageX)
        // console.log('pageY: ' + that.pageY)  
        // console.log(res.data instanceof Uint8ClampedArray) // true
        // console.log(res.data.length) // 100 * 100 * 4
        console.log(res.data)
      }
    })
  },
  tabFun: function (e) {
    var that=this;
    //获取触发事件组件的dataset属性  
    var _datasetId = e.target.dataset.id;
    // console.log("----" + _datasetId + "----");
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    that.setData({
      tabArr: _obj
    });
  }, 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  drawProgressbg:function(){
    const ctx = wx.createCanvasContext("myCanvas")
    // 绘制一个灰色圆
    ctx.arc(130, 85, 80, 0, 2 * Math.PI)
    ctx.setFillStyle("#eee")
    ctx.fill()
    // 绘制圆心那个点
    ctx.beginPath()
    ctx.arc(130, 85, 5, 0, 2 * Math.PI)
    ctx.setFillStyle("lightgreen")
    ctx.fill()

    //绘制黑色弧线
    ctx.beginPath()
    ctx.arc(130, 85, 60, 0.75 * Math.PI, 2.25 * Math.PI)
    ctx.setLineWidth(10);
    ctx.setLineCap('round');
    ctx.setStrokeStyle("#666")
    ctx.stroke()
    ctx.draw()
  },
  // drawCircle:function(step){
  //   // 绘制亮色线的弧度
  //   const ctx = wx.createCanvasContext("myCanvas2")
  //   ctx.beginPath()
  //   ctx.setLineWidth(6);
  //   ctx.setLineCap('round');
  //   ctx.setStrokeStyle("lightgreen")
  //   ctx.arc(130, 85, 60, 0.75 * Math.PI, (0.75 + step) * Math.PI)
  //   ctx.stroke()
  //   ctx.draw()
  // },
  drawCircle: function () {
    var that=this;
    clearInterval(varName);
    function drawArc(s, e) {
      ctx2.setFillStyle('white');
      ctx2.clearRect(0, 0, 200, 200);
      ctx2.draw();
      var x = 130, y = 85, radius = 60;
      ctx2.setLineWidth(5);
      ctx2.setStrokeStyle('#d81e06');
      ctx2.setLineCap('round');
      ctx2.beginPath();
      ctx2.arc(x, y, radius, s, e, false);
      ctx2.stroke()
      ctx2.draw()
    }
    var step = 1, startAngle = 0.75 * Math.PI, endAngle = 0, average = 1.48 * Math.PI / 100, LargeAngle = 2.23 * Math.PI;
    var animation_interval = 20, n = 100;
    console.log(that.data)
    var animation = function () {
      if (step <= n && endAngle <= that.data.count * average +0.75 * Math.PI) {
        endAngle = step * 2 * Math.PI / n + 0.75 * Math.PI;
        drawArc(startAngle, endAngle);
        step++;
      } else {
        clearInterval(varName);
      }
    };
    varName = setInterval(animation, animation_interval);
  },

  onReady: function () {
    this.drawProgressbg()
    // this.countInterval()
    // this.drawCircle(1.5)
    //读电位数
    // const ctx = wx.createCanvasContext("myCanvas")
    // // 绘制一个灰色圆
    // ctx.arc(130, 85, 80, 0, 2 * Math.PI)
    // ctx.setFillStyle("#eee")
    // ctx.fill()

    //绘制一个坐标系
    // ctx.beginPath()
    // ctx.moveTo(40, 75)
    // ctx.lineTo(160, 75)
    // ctx.moveTo(100, 15)
    // ctx.lineTo(100, 135)
    // ctx.setStrokeStyle("#aaa")
    // ctx.stroke()

    //坐标系4个点的数字
    // ctx.setFontSize(12)
    // ctx.setFillStyle("black")
    // ctx.fillText("0", 165, 78)
    // ctx.fillText("0.5 * PI", 83, 145)
    // ctx.fillText("1 * PI", 15, 78)
    // ctx.fillText("1.5 * PI", 83, 10)

    // 绘制圆心那个点
    // ctx.beginPath()
    // ctx.arc(130, 85, 5, 0, 2 * Math.PI)
    // ctx.setFillStyle("lightgreen")
    // ctx.fill()

    //绘制1.5*PI的那个点
    // ctx.beginPath()
    // ctx.arc(100, 25, 2, 0, 2 * Math.PI)
    // ctx.setFillStyle("blue")
    // ctx.fill()

    //绘制0的那个点
    // ctx.beginPath()
    // ctx.arc(150, 75, 2, 0, 2 * Math.PI)
    // ctx.setFillStyle("red")
    // ctx.fill()

    // 绘制黑线的弧度
    // ctx.beginPath()
    // ctx.arc(130, 85, 60, 0.75 * Math.PI, 2.25 * Math.PI)
    // ctx.setLineWidth(10);
    // ctx.setLineCap('round');
    // ctx.setStrokeStyle("#666")
    // ctx.stroke()

    // 绘制亮色线的弧度
    // ctx.beginPath()
    // ctx.setLineWidth(6);
    // ctx.setLineCap('round');
    // ctx.setStrokeStyle("lightgreen")
    // ctx.arc(130, 85, 60, 0.75 * Math.PI, (0.75 + 1) * Math.PI)
    // ctx.stroke()

    // ctx.draw()
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