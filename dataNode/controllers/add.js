const fs = require('fs');
exports.add = (req, res, next) => {
    let body = req.body;
    let save = (body, callback) => {
        fs.readFile('./controllers/data.json', 'utf8', (err, data) => {
            if (err) {
                return res.send('500')
            }
            data = JSON.parse(data);
            data.peo.push(body);
            let datas = JSON.stringify(data);
            fs.writeFile('./controllers/data.json', datas, (err, data) => {
                if (err) {
                    return res.send('404')
                }
            })
            res.json(data)
        })
    }
    save(body, err => {
        if (err) {
            res.send('500')
        }
        res.redirect('/nodeData');
    })
};