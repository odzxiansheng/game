const fs = require('fs');
exports.checkpoint = (req, res, next) => {
    let body = req.body;
    let ind = 0;
    let write = (checkpointData) => {
        // console.log(checkpointData,'checkpointData');
        let datas = JSON.stringify(checkpointData);
        // console.log(datas,'datas');
        fs.writeFile('./data/requestList.json', datas, (err, data) => {
            if (err) {
                return res.send('404')
            }
            // console.log(checkpointData.info.checkpoint,'data');
            res.json({
                code:1,
                data:checkpointData.info[ind].checkpoint
             })
        })
    }
    let checkpoint = (body, callback) => {
        fs.readFile('./data/requestList.json', 'utf8', (err, data) => {
            if (err) {
                return res.send('500')
            }
           let info = JSON.parse(data);
           for(var index in info){
                if(body.username === info[index].username){
                    return ind = index;
                }
           }
           if(!info.info[ind].checkpoint && body.save == 0){
                info.info[ind].checkpoint = ['关卡1'];
                write(info)
           }else if(body.save == 0){
               console.log(info.info[ind].checkpoint,'info.info[ind].checkpoint');
            res.json({
                code:1,
                data:info.info[ind].checkpoint
             })
           }
           if(body.save && body.save == 1){
               info.info[ind].checkpoint.push(`关卡${info.info[ind].checkpoint.length+1}`);
               write(info)
           }
        })
    }
    checkpoint(body, err => {
        if (err) {
            res.send('500')
        }
    })
};