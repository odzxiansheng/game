export const mixins = {
  data() {
    return {
      userInfo: this.$Utils.localDate({ name: "userInfo" }) || null,
    }
  },
  methods: {
    setStatte(){
      let info = [];
      let experience = 100;
      let list = [
        '练气期',
        '筑基期',
        '金丹期',
        '元婴期',
        '化神期',
        '练虚期',
        '合体期',
        '渡劫期',
        '大乘期',
        '虚仙',
        '地仙',
        '天仙',
        '天仙',
        '仙王',
        '仙皇',
        '仙帝',
        '仙尊',
      ];
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < 4; j++) {
          let states = {
            0:'前期',
            1:'中期',
            2:'后期',
            3:'大圆满'
          }
          experience = i === 0 && j === 0 ? 
            experience : j === 0 ? 
            experience * 2 :  experience * 1.2
          let stateInfo = {
            stateText:list[i] + states[j],
            id:info.length + 1,
            experience: experience.toFixed(0) - 0,
            type:j
          }
          info.push(stateInfo)
        }
      }
      return info
    }
  }
}