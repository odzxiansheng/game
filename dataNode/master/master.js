const fs = require('fs');
exports.master = (req, res, next) => {
    let body = req.body;
    console.log(body,'body');
    
    let master = (body, callback) => {
        fs.readFile('./data/master.json', 'utf8', (err, data) => {
            if (err) {
                return res.send('500')
            }
            data = JSON.parse(data);
            console.log(data);
            
            for(var key in data){
                data[key].value *= body.grade
            }
            res.json({
                code: 1,
                isMaster: data
            })
        })
    }
    master(body, err => {
        if (err) {
            res.send('500')
        }
    })
};