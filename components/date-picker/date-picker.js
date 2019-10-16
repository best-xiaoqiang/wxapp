const DATE_MIN = '2019-01-01'
const DATE_MAX = '2099-01-01'
let init = true
Component({
  properties: {
    range: {
      type: Array,
      observer: function(val){
        if(init){
          if(val && val[0] && val[1]){
            this.setData({
              dateStartValue: val[0],
              dateEndValue: val[1]
            })
          }else{
            this.setData({
              dateStartValue: DATE_MIN,
              dateEndValue: DATE_MAX
            })
          }
        }
      }
    }
  },
  data: {
    dateMin: DATE_MIN,
    dateMax: DATE_MAX,
    dateStartValue: DATE_MIN,
    dateEndValue: DATE_MIN
  },
  attached(){
    this.triggerEvent('change', [this.data.dateStartValue, this.data.dateEndValue])
  },
  methods: {
    dateStartChange(e){
      this.setData({
        dateStartValue: e.detail.value
      })
      let { dateStartValue, dateEndValue } = this.data
      this.triggerEvent('change', [dateStartValue, dateEndValue])
    },
    dateEndChange(e){
      this.setData({
        dateEndValue: e.detail.value
      })
      let { dateStartValue, dateEndValue } = this.data
      this.triggerEvent('change', [dateStartValue, dateEndValue])
    }
  }
})
