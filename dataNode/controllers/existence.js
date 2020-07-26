const fs = require('fs');
exports.existence = (req, res, next) => {
    let body = req.body;
    let existence = (body, callback) => {
        fs.readFile('./data/requestList.json', 'utf8', (err, data) => {
            if (err) {
                return res.send('500')
            }
            data = JSON.parse(data);
            let info = data.info.find(item => item.username === body.username);
            console.log(info,'info');
            
            if(info.username !==undefined && info.username !== null){
                res.json({
                    code:1,
                    msg:'已经创建角色'
                })
            }else{
                res.json({
                    code:0,
                    msg:'还没有创建角色'
                })
            }
        })
    }
    existence(body, err => {
        if (err) {
            res.send('500')
        }
    })
};