const mapList = [
  {
    id: '1',
    combatEffectiveness: 0, // 需求战斗力
    name: '小竹林',
    onOff: false,
    secretTerritoryProbability: 0.1, // 寻找到秘境概率
    secretTerritoryList: [ // 秘境
      {

      }
    ],
    probability: 0.8, // 拥有属性概率
    masterList: [
      {
        name: '野猪',
        aggressivity:10, // 攻击力
        defensivePower:5, // 防御力
        lifeValue:50, // 生命值
        experience:1, // 经验
        money:1, // 金钱
        state:'练气期初期', // 境界
        combatEffectiveness: 10 * 5 +  50 / 10, // 战力
        grade:1,
        now:50,
        goods: [
          {
            id: 'materialScience-01',
            name: '野猪牙齿',
            type: 'materialScience', // 材料
            probability: 0.6,
            text:'武器材料'
          }
        ]
      }
    ],
  }
  // {
  //   id: '1',
  //   combatEffectiveness: 0, // 需求战斗力
  //   name: '小竹林',
  //   onOff: false,
  //   secretTerritoryProbability: 0.1, // 寻找到秘境概率
  //   secretTerritoryList: [ // 秘境
  //     {

  //     }
  //   ],
  //   probability: 0.8, // 拥有属性概率
  //   goods: [
  //     {
  //       id: '01',
  //       name: '短剑',
  //       type:'materialScience',
  //       probability: 1,
  //       attributeList: [
  //         {
  //           name: '攻击',
  //           max: 5,
  //           min: 1,
  //           probability: 0.8, // 拥有属性概率
  //           attribute: 1
  //         }
  //       ]
  //     }
  //   ]
  // }
]

export default mapList;