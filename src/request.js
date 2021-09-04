import UI from './utils/ui';
const request = ({
  url = '',
  data = {},
  method = 'post',
}) => {
  // mock数据
  // url ='./mock/mock.json'
  // let path = url.split('/').length - 1
  // const datas = require(`./mock/${path}.json`) || null;
  // return new Promise((res,rej) => {
  //   if(datas){
  //     UI.hideLoading();
  //     if(datas.code == 1){
  //       res(datas)
  //     }else{
  //       rej(datas)
  //     }
  //   }else{
  //     console.log(`找不到 ${path} 接口`);
  //     UI.hideLoading();
  //     rej()
  //   }
  // })

  // 请求
  // return new Promise((res, rej) => {
  //   uni.request({
  //     url,
  //     data,
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: (resject) => {
  //       // console.log(datas);
  //       console.log(resject);
  //        return res(resject)
  //     },
  //     fall: (err) => {
  //       console.log('--------------------------------------找不到借口--------------------------------------------------------------');
  //       rej(err)
  //     }
  //   });
  // })

  // 缓存
}
export default request;