const fs = require('fs');

exports.save = (peo,callback)=>{
    fs.readFile('data.json','utf8',(err,data)=>{
        if(err){
            return callback(err);
        }
        let datas = JSON.parse(data).peo;
        let stu = {
            "id":2,
            "name":"李白11111",
            "age":9,
            "grade":"一年级"
        }
        datas.push(stu);
        let fileData = JSON.stringify({
            peo:datas
        })
        fs.writeFile('data.json',fileData,(err)=>{
            if(err){
               return callback(err);
            }
        })
        callback(null);
    })
}