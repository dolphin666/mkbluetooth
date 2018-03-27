// pages/pitman/pitman.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,//触点X值
    y: 0,//触点Y值
    hidden: true,
    josize: 0,//外摇杆大小
    jisize: 0,//内摇杆大小
    centerX: 0,//摇杆中心X坐标
    centerY: 0,//摇杆中心Y坐标
    touchX: 0,//相对于其父元素的位置X
    touchY: 0,//相对于其父元素的位置Y
    jx: 0,//摇杆应该移动到的X位置
    jy: 0,//摇杆应该移动到的Y位置
    ctx: {},//
    effectiveFinger: -1,//当前有效手指

    colorBlack1: '#ccc',
    colorBlack2: '#ccc',
    colorBlack3: '#ccc',
    colorBlack4: '#ccc',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.windowWidth,//获取屏幕宽
          clientHeight: res.windowHeight,//获取屏幕高
          josize: res.windowWidth / 1.6,
          jisize: 0.5 * res.windowWidth / 2,
          centerX: res.windowWidth / 3.2,
          centerY: res.windowWidth / 3.2,
          // touchX: (res.windowWidth - res.windowWidth / 1.6)/2,
          // touchY: 20,
          overflow:"hidden"
        })
      }
    })

    var that = this
    let ctx1 = wx.createCanvasContext("pitman");
    that.setData({
      ctx: ctx1
    })
    ctx1.drawImage("../../img/joystickout.png", that.data.centerX - that.data.josize / 2, that.data.centerY - that.data.josize / 2, that.data.josize, that.data.josize)
    ctx1.drawImage("../../img/joystickin.png", that.data.centerX - that.data.jisize / 2, that.data.centerY - that.data.jisize / 2, that.data.jisize, that.data.jisize)
    ctx1.draw()
    // console.log(that.data.ctx)
  },

  // 绘制函数
  move: function () {
    var that = this;
    that.data.ctx.clearRect(that.data.centerX - that.data.josize / 2, that.data.centerY - that.data.josize / 2, that.data.josize, that.data.josize);//清空画板
    that.data.ctx.drawImage("../../img/joystickout.png", that.data.centerX - that.data.josize / 2, that.data.centerY - that.data.josize / 2, that.data.josize, that.data.josize)
    that.data.ctx.drawImage("../../img/joystickin.png", that.data.centerX - that.data.jisize / 2 + that.data.jx, that.data.centerY - that.data.jisize / 2 + that.data.jy, that.data.jisize, that.data.jisize)
    that.data.ctx.draw()
    // setTimeout(that.move(), 17);
  },

  touchstart: function (event) {
    var that = this;
    //判断是否击中摇杆头
    // console.log(event.touches)
    for (var i = 0; i < event.touches.length; i = i + 1) {
      if (Math.sqrt(Math.pow(event.touches[i].x - that.data.centerX - that.data.touchX, 2) +
        Math.pow(event.touches[i].y - that.data.centerY - that.data.touchY, 2)) <
        that.data.josize / 2 - that.data.jisize / 2) {
        that.data.effectiveFinger = i;
        // console.log("finger No." + i + " is effectiveFinger now.");
      }
    }
    that.setData({
      hidden: false,
      x: event.touches[0].x,
      y: event.touches[0].y
    })
    // that.move()
  },
  touchend: function (event) {//手指离开的时候
    var that = this;
    //若有效手指离开,那就把内摇杆放中间
    // console.log(event.changedTouches[0])
    // console.log(event.changedTouches[that.data.effectiveFinger])
    if (event.touches[that.data.effectiveFinger] == null) {
      if (event.touches[0] == null) {
        that.setData({
          jx: 0,
          jy: 0,
          hidden: true
        })
      }
      that.data.effectiveFinger =0;//-=1
    }
    that.setData({
      colorBlack1: "#ccc",
      colorBlack2: "#ccc",
      colorBlack3: "#ccc",
      colorBlack4: "#ccc"
    })
    that.move()
  },
  touchmove: function (event) {//手指移动的时候
    var that = this
    //是否触摸点在摇杆上
    if (that.data.effectiveFinger != -1)
      if (Math.sqrt(Math.pow(event.touches[that.data.effectiveFinger].x - that.data.centerX - that.data.touchX, 2) +
        Math.pow(event.touches[that.data.effectiveFinger].y - that.data.centerY - that.data.touchY, 2)) <
        that.data.josize / 2 - that.data.jisize / 2) {
        that.data.jx = event.touches[that.data.effectiveFinger].x - that.data.centerX - that.data.touchX;
        that.data.jy = event.touches[that.data.effectiveFinger].y - that.data.centerY - that.data.touchY;
      } else
      //否则计算摇杆最接近的位置
      {
        var x = event.touches[that.data.effectiveFinger].x - that.data.touchX,
          y = event.touches[that.data.effectiveFinger].y - that.data.touchY,
          r = that.data.josize / 2 - that.data.jisize / 2;
        var ans = that.GetPoint(that.data.centerX, that.data.centerY, r, that.data.centerX, that.data.centerY, x, y);
        // console.log(ans)
        //圆与直线有两个交点，计算出离手指最近的交点
        if (Math.sqrt((ans[0] - x) * (ans[0] - x) + (ans[1] - y) * (ans[1] - y)) < Math.sqrt((ans[2] - x) * (ans[2] - x) + (ans[3] - y) * (ans[3] - y))) {
          that.data.jx = ans[0] - that.data.centerX;
          that.data.jy = ans[1] - that.data.centerY;
        } else {
          that.data.jx = ans[2] - that.data.centerX;
          that.data.jy = ans[3] - that.data.centerY;
          // that.touchend()
        }
      }
    // event.preventDefault(); //防止页面滑动，取消掉默认的事件
    that.setData({
      x: event.touches[0].x,
      y: event.touches[0].y
    })
    that.move()
  },

  //计算圆于直线的交点（这一块好难啊）
  //圆的坐标为cx，cy 半径为r
  //直线上两点的坐标分别为(stx,sty)、(edx,edy)
  GetPoint: function (cx, cy, r, stx, sty, edx, edy) {
    //(x-cx)^2+(y-cy)^2=r^2
    //y=k*x+b
    var k = (edy - sty) / (edx - stx);
    var b = edy - k * edx;
    //(1 + k^2)*x^2 - x*(2*cx -2*k*(b -cy) ) + cx*cx + ( b - cy)*(b - cy) - r*r = 0
    var x1, y1, x2, y2;
    var c = cx * cx + (b - cy) * (b - cy) - r * r;
    var a = (1 + k * k);
    var b1 = (2 * cx - 2 * k * (b - cy));

    var tmp = Math.sqrt(b1 * b1 - 4 * a * c);

    x1 = (b1 + tmp) / (2 * a);
    y1 = k * x1 + b;

    x2 = (b1 - tmp) / (2 * a);
    y2 = k * x2 + b;
    return [x1, y1, x2, y2];
  },


  //手柄控制

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
  touchend2:function(){
    var that = this;
    that.setData({
      colorBlack1: "#ccc",
      colorBlack2: "#ccc",
      colorBlack3: "#ccc",
      colorBlack4: "#ccc"
    })
  }
  ,
  touchesmove:function(event){
    var that=this
    for (var i = 0; i < event.touches.length; i = i + 1) {
      // if (Math.sqrt(Math.pow(event.touches[i].x - that.data.centerX - that.data.touchX, 2) +
      //   Math.pow(event.touches[i].y - that.data.centerY - that.data.touchY, 2)) <
      //   that.data.josize / 2 - that.data.jisize / 2) {
      //   that.data.effectiveFinger = i;
      //   console.log("finger No." + i + " is effectiveFinger now.");
      // }
      console.log(event.touches[i])
    }
  }
})