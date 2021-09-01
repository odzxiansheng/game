const setTime = (startDate = null, endDate = null) => {
  let startTime = 0, endTime = 0, dateText = '';
  if (startDate && endDate) {
    startTime = startDate;
    endTime = endDate;
    // 1天 = 24年
    dateText = (endTime - startTime) / 1000 / 60 / 60
  }
  return {
    startTime,
    dateText
  }
}
const localDate = (name, data = null) => {
  let returnData = {};
  if (!name) {
    throw new Error('请设置缓存名称')
  }
  if (data) {
    if(typeof data == 'object'){
      data = JSON.stringify(data)
    }
    localStorage.setItem(name, data)
    return
  }
  let getData = localStorage.getItem(name) || '';
  if(!getData){
    localStorage.setItem(name, null)
  }
  returnData = getData.includes('{'||'[') ? JSON.parse(getData) : localStorage.getItem(name)
  return returnData
}
/**
 * 生成随机id
 * @param {*} data -列表数据
 * @returns -id
 */
const setID = (data = []) => {
  let id = Math.random().toFixed(10).slice(2, 12);
  if (typeof data === 'object' && data.length) {
    let obj = data.find(v => v.id == id) || null;
    if (obj) {
      setID(data);
    }
  }
  return id
};
const setJSON = (data) => {
  let listOrObj = null;
  if (typeof data == 'object') {
    listOrObj = JSON.parse(JSON.stringify(data))
  }
  return listOrObj
}
const addFood = (data = []) => {
  let food = [], foodData = {};
  if (data.length) {
    data.map((v, k) => {
      if (["materialScience"].includes(v.type)) {
        if (!foodData.id) {
          foodData = setJSON(v)
        }
        if (!foodData.num) {
          foodData.num = 0
        }
        foodData.num++;
      } else {
        v.num = 1;
        food.push(v)
      }
    })
    food.push(foodData);
  }
  return food
}

export default {
  setTime,
  localDate,
  setID,
  setJSON,
  addFood,
}
