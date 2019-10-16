const app = getApp()

Page({
  data: {
    list: [],
    dateShow: '',
  },
  onLoad({listKey}){
    this.listKey = listKey
    this.getData()
  },
  onShow(){
    if(!this.firstShow){
      this.getData()
      this.firstShow = false
    }
  },
  getData(){
    let data = wx.getStorageSync('data') || {}
    let { date, list } = data[this.listKey]
    this.setData({
      list,
      dateShow: `${date[0]}至${date[1]}`
    })
  },
  edit(){
    wx.navigateTo({
      url: `/pages/new/new?listKey=${this.listKey}&from=view`,
    })
  }
})
