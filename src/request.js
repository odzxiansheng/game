const request = ({
  url = '',
  data = {},
  method = 'post',
}) => {
  url ='./mock/mock.json'
  // const datas = require('./mock/mock.json')
  return new Promise((res, rej) => {
    uni.request({
      url,
      data,
      header: {
        'content-type': 'application/json'
      },
      success: (resject) => {
        // console.log(datas);
        console.log(resject);
         return res(resject)
      },
      fall: (err) => {
        console.log('--------------------------------------找不到借口--------------------------------------------------------------');
        rej(err)
      }
    });
  })
}
export default request;