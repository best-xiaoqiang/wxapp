// components/cropper/cropper.js
import WeCropper from '../../utils/we-cropper'
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const rpxRatioPx = 750 / width
const canvasW = width - 40 / rpxRatioPx // 40是左右padding之和
var app = getApp();
Page({
  /**
   * 组件的初始数据
   */
  data: {
    pic: '',
    wRatioH: 1,
    canvasW,
    cropperOpt: {
      id: 'cropper',
      width: canvasW, // 画布宽
      height: canvasW, // 画布高
      scale: 2.5,
      zoom: 8,
      cut: {
        // 裁剪框的参数
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
    },
  },

  /**
   * 组件的方法列表
   */
  onLoad(o){
    const {pic, wRatioH} = o
    this.data.wRatioH = wRatioH
    this.data.pic = decodeURIComponent(pic)
    this.initCropperOpt()
    console.log('cropper onload')

  },
     touchStart(e) {
      this.wecropper.touchStart(e)
    },
  
     touchMove(e) {
      this.wecropper.touchMove(e)
    },
  
     touchEnd(e) {
      this.wecropper.touchEnd(e)
    },
  
    // 确定裁剪框的形状、大小
     initCropperOpt() {
      // wRatioH  ------  需要裁剪的宽高比
      // pic  ----------  需要裁剪的图片
      let {cropperOpt, wRatioH} = this.data
      if (wRatioH == 1) {
        cropperOpt.cut.width = (canvasW * 4) / 5
        cropperOpt.cut.x = (canvasW - cropperOpt.cut.width) / 2
        cropperOpt.cut.height = (canvasW * 4) / 5
        cropperOpt.cut.y = (canvasW - cropperOpt.cut.height) / 2
      } else if (wRatioH > 1) {
        cropperOpt.cut.width = canvasW
        cropperOpt.cut.x = 0
        cropperOpt.cut.height = canvasW / wRatioH
        cropperOpt.cut.y = (canvasW - cropperOpt.cut.height) / 2
      } else {
        cropperOpt.cut.height = canvasW
        cropperOpt.cut.y = 0
        cropperOpt.cut.width = g * wRatioH
        cropperOpt.cut.x = (canvasW - cropperOpt.cut.width) / 2
      }
      this.setData({
        cropperOpt
      })
      this.initCropper()
    },
  
     initCropper() {
       let {pic, cropperOpt} = this.data
       console.log('initCropper', this.data)
      this.wecropper = new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          console.log(`wecropper is ready for work!`)
          ctx.pushOrign(pic) // 导入被裁剪图片

        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          // console.log(`current canvas context:`, ctx)
          // uni.showToast({
          //   title: '上传中',
          //   icon: 'loading',
          //   duration: 20000
          // })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          // console.log(`current canvas context:`, ctx)
          // uni.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          console.log(`before canvas draw,i can do something`)
          // console.log(`current canvas context:`, ctx)
        })
    },
  
    // 确定裁剪
     getCropperImage() {
      this.wecropper.getCropperImage((src) => {
        if (src) {
          // this.triggerEvent('cropperImgReady', src)
          app.trimedImg = src
          wx.navigateBack({
            delta: 1
          });
        }
        
      })
    }
})
