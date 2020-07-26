const fs = require('fs');
exports.del = (req,res,next) => {

    // get
    // let reqs = req.query
    // console.log(reqs);

    // post
    // let reqs = req.body
    // console.log(reqs);

    let index = req.body.index
    let del = (index,callback)=>{
        fs.readFile('./controllers/data.json','utf8',(err,data)=>{
            if(err){
                return res.send(404)
            }
            data = JSON.parse(data);
            data.peo = data.peo.filter((item,num) => num !==index)
            let datas = JSON.stringify(data)
            fs.writeFile('./controllers/data.json',datas,(err,data)=>{
                if(err){
                    return res.send('500');
                }
            })
            res.json(data);
        })
    }
    del(index,err=>{
        if(err){
            res.send('500')
        }
       res.redirect('/nodeData');
    })
};