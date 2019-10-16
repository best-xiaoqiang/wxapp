const app = getApp()

Page({
  goNew(){
    wx.navigateTo({
      url: '/pages/new/new',
    });
  },
  goList(){
    wx.navigateTo({
      url: '/pages/list/list',
    });
  },
  onShareAppMessage(){}
})
