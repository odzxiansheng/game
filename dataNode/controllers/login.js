const fs = require('fs');
exports.login = (req, res, next) => {
    let body = req.body;
    let write = (data) => {
        let datas = JSON.stringify(data);
        fs.writeFile('./data/requestList.json', datas, (err, data) => {
            if (err) {
                return res.send('404')
            }
        })
    }
    let login = (body, callback) => {
        fs.readFile('./data/requestList.json', 'utf8', (err, data) => {
            if (err) {
                return res.json({
                    msg:'内部异常'
                }).render(500)
            }
            data = JSON.parse(data);
            if(data){
                console.log(data,'data');
                if (data !== null && data !== undefined) {
                    let username = data.info.find(item => item.username === body.username);
                    console.log(username, 'username');
    
                    if (username !== undefined) {
                        if (username.username === body.username && username.password === body.password) {
                            for (var key in data.info) {
                                if (data.info[key].id === username.id) {
                                    data.info[key].login = true;
                                    write(data);
                                }
                            }
                            if (username.info && username.info.playname && username.info.playname.length !== 0) {
                                res.json({
                                    code: 1,
                                    msg: '登陆成功,已经创建角色,即将进入游戏',
                                })
                            } else {
                                res.json({
                                    code: 2,
                                    msg: '登陆成功,开始创建角色',
                                })
                            }
                        } else {
                            res.json({
                                code: 0,
                                msg: '账号或密码不对，请重新输入'
                            })
                        }
                    } else {
                        res.json({
                            code: 0,
                            msg: '账号或密码不对，请重新输入'
                        })
                    }
                } else {
                    res.json({
                        code: 0,
                        msg: '账号或密码不对，请重新输入'
                    })
                }
            }
        })
    }
    login(body, err => {
        console.log(err,'err');
        if (err) {
            res.send('500')
        }
    })
};