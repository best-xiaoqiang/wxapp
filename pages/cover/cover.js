const { default: wxPromise } = require("../../utils/wx-promise")

// pages/cover/cover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    // this.drawImage()
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

  onShareAppMessage: function () {

  },

  uploadTap(){
    wxPromise.chooseImage({count: 1}).then(res => {
      const tempFilePath = res.tempFilePaths[0]
      this.drawImage(tempFilePath)
    })
  },

  drawImage(imgPath){
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        ctx.fillStyle = 'red'
        ctx.fillRect(0, 0, 100, 100)

        ctx.fillStyle = 'blue'
        ctx.font="40px Arial";
        ctx.textAign = 'center'
        ctx.fillText('点点滴滴', 0, 40)
        console.log('canvasss', ctx)
        // imgPath = 'https://dl.weshineapp.com/gif/20200831/1598847091_5f4c78737f80c.png'
        ctx.drawImage(imgPath, 10, 10)
      })
      
  }
})