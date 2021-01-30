const app = getApp()

Page({
  data: {
    optionList: [
      {
        title: '三合一封面图',
        path: '/pages/cover/cover'
      }
    ]
  },
  onShareAppMessage(){},
  optionTap(e){
    let {item} = e.detail
    wx.navigateTo({
      url: item.path
    })
  }
})
