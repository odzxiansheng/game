const goodsListData = require('../data/goodsList');
exports.goodsList = (req, res, next) => {
    let body = req.body;
    if(body.pages !== 0 && body.pages && body.totol){
      let leng = goodsListData.length
      let start = body.pages*body.totol - body.totol;
      let end = body.pages*body.totol;
      if( start >leng){
        res.json({
          code:2,
          data:'没有数据了'
        })
      }else if(end > leng){
        let shopList = goodsListData.slice(start,goodsListData.length-1);
        res.json({
          code:1,
          data:shopList
        })
      }else{
        let shopList = goodsListData.slice(start,end);
        res.json({
          code:1,
          data:shopList
        })
      }
    }else{
       res.status('500').render('500')
    }
};