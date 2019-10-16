Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    inputValue: '',
    checkValue: true,
    dateArr: [],
    listKey: '',
    focus: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({listKey, from}) {
    this.from = from
    if(listKey){
      let data = wx.getStorageSync('data')
      let {list, date: dateArr} = data[listKey]
      this.setData({
        listKey,
        list, 
        dateArr
      })
    }
  },
  add(){
    if(!this.data.inputValue){
      wx.showToast({
        title: '请填写清单题目',
        icon: 'none',
      });
      return
    }
    this.setData({
      list: [...this.data.list, {
        content: this.data.inputValue,
        success: this.data.checkValue
      }]
    }),
    this.setData({
      inputValue: '',
      checkValue: true,
      focus: true
    })
  },
  confirm(){
    let data = wx.getStorageSync('data') || {}
    let item = {
      date: this.data.dateArr,
      list: this.data.list
    }
    let key = this.data.listKey || new Date().getTime()
    data[`${key}`] = item
    wx.setStorageSync('data', data);
    if(this.from === 'view'){
      wx.navigateBack({
        delta: 1
      });
    }else{
      wx.redirectTo({
        url: `/pages/view/view?listKey=${key}`,
      });
    }
  },
  itemTap(e){
    let { index } = e.currentTarget.dataset
    let list = this.data.list
    list[index].success = !list[index].success
    this.setData({
      list
    })
  },
  itemLongTap(e){
    let { index } = e.currentTarget.dataset
    let list = this.data.list
    wx.showModal({
      content: '确认删除',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          list.splice(index, 1)
          this.setData({ list })
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  input(e){
    this.data.inputValue = e.detail.value
  },
  change(e){
    this.setData({
      checkValue: !this.data.checkValue
    })
  },
  dateChange(e){
    this.setData({
      dateArr: e.detail
    })
  }
})