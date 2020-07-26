const fs = require('fs');
exports.request = (req, res, next) => {
    let body = req.body;
    let write = (data) => {
        let datas = JSON.stringify(data);
        fs.writeFile('./data/requestList.json', datas, (err, data) => {
            if (err) {
                return res.send('404')
            }
        })
        res.json({
            code: 1,
            msg: '注册成功'
        })
    }
    let request = (body, callback) => {
        fs.readFile('./data/requestList.json', 'utf8', (err, data) => {
            console.log(data,'data');
            if (err) {
                return res.send('500')
            }         
            console.log(data);   
            if (data) {
                console.log(data,'data');
                
                data = JSON.parse(data);
                let username = data.info.find(item => item.username === body.username);
                if (username) {
                    res.json({
                        code: 0,
                        msg: '您所填写的用户名已经被注册过了'
                    })
                } else {
                    let id = data.info.length + 1;
                    body = {
                        id :id,
                        ...body,
                        login:false
                    }
                    data.info.push(body);
                    write(data);
                }
            } else {
                data = {
                    info: [
                        {
                            id: 1,
                            username: body.username,
                            password: body.password,
                            login:false
                        }
                    ]
                };
                write(data);
            }
        })
    }
    request(body, err => {
        console.log(err,'err');
        if (err) {
            res.send('500')
        }
    })
};