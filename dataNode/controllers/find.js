const fs = require('fs');
exports.find = (req, res, next) => {
    let body = req.body.id;
    let find = (body, callback) => {
        fs.readFile('./controllers/data.json', 'utf8', (err, data) => {
            if (err) {
                return res.send('500')
            }
            data = JSON.parse(data);
            let dataObj = data.peo.find(item=> item.id === body)
            res.json({msg:dataObj})
        })
    }
    find(body, err => {
        if (err) {
            res.send('500')
        }
        res.redirect('/nodeData');
    })
};