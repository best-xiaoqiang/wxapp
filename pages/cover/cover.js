const { default: wxPromise } = require("../../utils/wx-promise")
const device = wx.getSystemInfoSync() // 获取设备信息
console.log(device)
const devicePixelRatio = device.devicePixelRatio
    const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
    const height = width
// pages/cover/cover.js
const columnCount = 3
const app =  getApp();
Page({
  data: {
    perRatio: 720/1280, // 单个图片比例
    perWidth: 0,
    perHeight: 0,
    img: '',
    imgX: 0,
    imgY: 0,
    imgW: 0,
    imgH: 0,
    canvasW: 1,
    canvasH: 1,
    joinCount: 3,
    canvasUiW: 650 // 650rpx
  },

  onReady: function () {
    this.initCanvas()
  },
  onShareAppMessage: function () {

  },
  getRowCount(){
    return Math.ceil(this.data.joinCount/columnCount)
  },
  refreshCanvas({imgW, imgH, canvasW, canvasH}){
    const {imgW, imgH, canvasW, canvasH} = this.data
    this.setData({
      img: path,
      imgW,
      imgH,
      canvasW,
      canvasH
    })
  },
  onImgChange({path, imgW, imgH}){
    const {perRatio} = this.data
    const targetRatio = perRatio * columnCount / this.getRowCount()
    const imgRatio = imgW/imgH
    let canvasW, canvasH
    if(imgRatio>targetRatio){
      canvasH = imgH
      canvasW = canvasH*targetRatio
    }else{
      canvasW = imgW
      canvasH = canvasW/targetRatio
    }
    console.log('>>>>>', imgW, imgH, canvasW, canvasH)
    this.setData({
      img: path,
      imgW,
      imgH,
      imgX: (canvasW - imgW)/2,
      imgY: (canvasH - imgH)/2,
      canvasW,
      canvasH,
      perWidth: canvasW/columnCount,
      perHeight: canvasH/this.getRowCount()
    })
  },
  uploadTap(){
    wxPromise.chooseImage({
      count: 1,
      sizeType: ['original']
    })
    .then(res => {
      var pic = res.tempFilePaths[0]
      wxPromise.getImageInfo(pic).then(res => {
        const {width, height, path} = res
        this.onImgChange({path, imgW: width, imgH: height})
      })
    })
  },
  initCanvas(){
    this.ctx = wx.createCanvasContext("myCanvas");
  },
  drawImage(){
    const ctx = this.ctx
    const {img, imgW, imgH, imgX, imgY} = this.data
    console.log('xxxx', imgW, imgH, imgX, imgY)
    ctx.drawImage(
      img,
      imgX,
      imgY,
      imgW,
      imgH
    )
  },
  drawText(){

  },
  drawAndSave(){
    this.drawImage()
    this.drawText()
    this.ctx.draw(false, ()=>{
      this.save()
    })
  },
  save(){
    let pArr = []
    const {joinCount, perWidth, perHeight} = this.data
    for (let i = 0; i < joinCount; i++) {
      const params = {
        x: perWidth * (i % columnCount),
        y: perHeight * parseInt(i / columnCount),
        width: perWidth,
        height: perHeight
      }
      pArr.push(this.saveP(params))
    }
    Promise.all(pArr).then(res => {
      wx.showModal({
        content: '保存成功'
      });
    })
  },
  saveP({x, y, width, height}){
    return wxPromise.canvasToTempFilePath({
      x,
      y,
      width,
      height,
      destWidth: width,
      destHeight: height,
      canvasId: 'myCanvas',
    }, this).then(res => {
      const pathToSave = res.tempFilePath
      return wxPromise.saveImage({
        filePath: pathToSave
      })
    })
  },
  onMove(e){
    console.log('onMove', e)
  }
})