const fs = require('fs');
exports.gai = (req, res, next) => {
    let body = req.body;
    let id = body.id;
    let count = 0;
    if (id.length !== 0) {
        for (var key in body) {
            if (body[key].length === 0) {
                count++;
            }
        }
        if (count <= 2) {
            let save = (body, callback) => {
                fs.readFile('./controllers/data.json', 'utf8', (err, data) => {
                    if (err) {
                        return res.send('500')
                    }
                    data = JSON.parse(data);
                    for (var index in data.peo) {
                        if (data.peo[index].id === body.id) {
                            for (var key in data.peo[index]) {
                                if (body[key].length !== 0) {
                                    data.peo[index][key] = body[key]
                                }
                            }
                        }
                    }
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
        } else {
            res.status(500).render('500')
        }
    } else {
        res.status(500).render('500')
    }
};