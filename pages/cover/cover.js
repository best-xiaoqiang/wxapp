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
    drawOption: {
      img: '',
      imgX: 0,
      imgY: 0,
      canvasW: 0,
      canvasH: 0,
    },
    joinCount: 3,
  },

  onReady: function () {
    this.initCanvas()
  },
  onShareAppMessage: function () {

  },
  getRowCount(){
    return Math.ceil(this.data.joinCount/columnCount)
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
    this.setData({
      ['drawOption.img']: path,
      [`drawOption.canvasW`]: canvasW,
      [`drawOption.canvasH`]: canvasH,
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
    const {img, imgX, imgY, canvasW, canvasH} = this.data.drawOption
    ctx.drawImage(
      img,
      imgX,
      imgY,
      canvasW,
      canvasH
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
    const {joinCount, perWidth, perHeight, drawOption} = this.data
    const {imgX, imgY} = drawOption
    for (let i = 0; i < joinCount; i++) {
      const params = {
        x: imgX + perWidth * (i % columnCount),
        y: imgY + perHeight * parseInt(i / columnCount),
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
  }
})