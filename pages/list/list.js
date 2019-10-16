// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let data = wx.getStorageSync('data');
    this.getList(data)
  },
  
  getList(data){
    data = JSON.parse(JSON.stringify(data))
    let list = []
    for(var key in data){
      let item = data[key]
      list.push({
        listKey: key,
        dateShow: item.date[0] + '至' + item.date[1],
        ...item
      })
    }
    this.setData({
      list
    })
  },
  itemTap(e){
    let { item } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/view/view?listKey=${item.listKey}`,
    });
  },
  itemLongTap(e){
    let { item } = e.currentTarget.dataset
    wx.showModal({
      content: '是否要删除',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          let data = wx.getStorageSync('data')
          delete data[`${item.listKey}`]
          wx.setStorageSync('data', data);
          this.getList(data)
        }
      },
    });
  }
})