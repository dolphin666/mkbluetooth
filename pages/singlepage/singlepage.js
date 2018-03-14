//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    status: "",
    sousuo: "",
    connectedDeviceId: "", //已连接设备uuid  
    services: "", // 连接设备的服务  
    characteristics: "",   // 连接设备的状态值  
    writeServicweId: "", // 可写服务uuid  
    writeCharacteristicsId: "",//可写特征值uuid  
    readServicweId: "", // 可读服务uuid  
    readCharacteristicsId: "",//可读特征值uuid  
    notifyServicweId: "", //通知服务UUid  
    notifyCharacteristicsId: "", //通知特征值UUID  
    inputValue: "",
    characteristics1: "", // 连接设备的状态值 
  },
  getGlobalVar: function () {
    var that = this;
    that.setData({
      connectedDeviceId: getApp().globalData.connDeviceId,
      writeServicweId: getApp().globalData.wrtServicweId,
      writeCharacteristicsId: getApp().globalData.wrtCharacteristicsId,
      readServicweId: getApp().globalData.reaServicweId,
      readCharacteristicsId: getApp().globalData.reaCharacteristicsId,
      notifyServicweId: getApp().globalData.notiServicweId,
      notifyCharacteristicsId: getApp().globalData.notiCharacteristicsId,
    })
  },
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      // connectedDeviceId: options.connectedDeviceId,
      // readServicweId: options.readServicweId,
      // readCharacteristicsId: options.readCharacteristicsId
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true,
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  //发送  
  lanya8: function () {
    var that = this;
    that.getGlobalVar();
    console.log(that.data.connectedDeviceId, that.data.writeServicweId, that.data.writeCharacteristicsId)
    // 这里的回调可以获取到 write 导致的特征值改变  
    wx.onBLECharacteristicValueChange(function (characteristic) {
      console.log('characteristic value changed:1', characteristic)      
    })
    var buf = new ArrayBuffer(16)
    var dataView = new DataView(buf)
    wx.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
      deviceId: that.data.connectedDeviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
      serviceId: that.data.writeServicweId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
      characteristicId: that.data.writeCharacteristicsId,
      // 这里的value是ArrayBuffer类型  
      value: buf,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
        that.lanya9()
      }
    })
    // wx.request({
    //   url: '**/getEncrypt',  
    //         success: function (data) {
    //     var arr = data.data.data.split(",");
    //     console.log(arr);
    //     for (var i = 0; i < arr.length; i++) {
    //       dataView.setInt8(i, arr[i]);
    //     }
    //     console.log('str', buf);
    //     console.log("writeServicweId", that.data.writeServicweId);
    //     console.log("writeCharacteristicsId", that.data.writeCharacteristicsId);
    //    
    //   }
    // })

  },
  //启用低功耗蓝牙设备特征值变化时的 notify 功能  
  lanya9: function () {
    var that = this;
    that.getGlobalVar();
    console.log(that.data.connectedDeviceId,that.data.notifyServicweId, that.data.notifyCharacteristicsId)
    //var notifyServicweId = that.data.notifyServicweId.toUpperCase();  
    //var notifyCharacteristicsId = that.data.notifyCharacteristicsId.toUpperCase();  
    // console.log("11111111", notifyServicweId);  
    // console.log("22222222222222222", notifyCharacteristicsId);  
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能  
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
      deviceId: that.data.connectedDeviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
      serviceId: that.data.notifyServicweId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
      characteristicId: that.data.notifyCharacteristicsId,
      success: function (res) {
        console.log('notifyBLECharacteristicValueChange success', res.errMsg)
      },
      fail: function () {
        console.log('shibai');
        console.log(that.data.notifyServicweId);
        console.log(that.data.notifyCharacteristicsId);
      },
    })
  },
  //接收消息  
  lanya10: function () {
    var that = this;
    that.getGlobalVar();
    console.log(that.data.connectedDeviceId, that.data.readServicweId, that.data.readCharacteristicsId)
    // 必须在这里的回调才能获取  
    wx.onBLECharacteristicValueChange(function (characteristic) {
      let hex = Array.prototype.map.call(new Uint8Array(characteristic.value), x => ('00' + x.toString(16)).slice(-2)).join('');
      console.log(hex)
      // wx.request({
      //   url: '***/getDecrypt',
      //   data: { hexString: hex },
      //   method: "POST",
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded'
      //   },
      //   success: function (data) {
      //     //console.log(data)  
      //     var res = data.data.data;
      //     that.setData({
      //       jieshou: res,
      //     })
      //   }
      // })
    })
    console.log(that.data.readServicweId);
    console.log(that.data.readCharacteristicsId);
    wx.readBLECharacteristicValue({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
      deviceId: that.data.connectedDeviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
      serviceId: that.data.readServicweId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
      characteristicId: that.data.readCharacteristicsId,
      success: function (res) {
        console.log(that.data.connectedDeviceId, that.data.writeServicweId, that.data.writeCharacteristicsId)
        console.log('readBLECharacteristicValue:', res.errMsg);
      }
    })
  },
  // lanya10: function () {
  //   var that = this;
  //   that.getGlobalVar();
  //   console.log(that.data.connectedDeviceId, that.data.readServicweId, that.data.readCharacteristicsId)
  //   // 必须在这里的回调才能获取  
  //   wx.onBLECharacteristicValueChange(function (characteristic) {
  //     let hex = Array.prototype.map.call(new Uint8Array(characteristic.value), x => ('00' + x.toString(16)).slice(-2)).join('');
  //     // console.log(hex)
  //     // wx.request({
  //     //   url: '***/getDecrypt',
  //     //   data: { hexString: hex },
  //     //   method: "POST",
  //     //   header: {
  //     //     'content-type': 'application/x-www-form-urlencoded'
  //     //   },
  //     //   success: function (data) {
  //     //     //console.log(data)  
  //     //     var res = data.data.data;
  //     //     that.setData({
  //     //       jieshou: res,
  //     //     })
  //     //   }
  //     // })
  //   })
  //   console.log(that.data.readServicweId);
  //   console.log(that.data.readCharacteristicsId);
  //   wx.readBLECharacteristicValue({
  //     // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
  //     deviceId: that.data.connectedDeviceId,
  //     // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
  //     serviceId: that.data.readServicweId,
  //     // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
  //     characteristicId: that.data.readCharacteristicsId,
  //     success: function (res) {
  //       console.log(that.data.connectedDeviceId, that.data.writeServicweId, that.data.writeCharacteristicsId)
  //       console.log('readBLECharacteristicValue:', res.errMsg);
  //     }
  //   })
  // }
})
