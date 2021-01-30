Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  methods: {
    optionTap(e){
      let {item} = e.currentTarget.dataset
      this.triggerEvent('optionTap', {item})
    }
  }
})
