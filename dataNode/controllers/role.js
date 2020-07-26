const fs = require('fs');
exports.role = (req, res, next) => {
    let body = req.body;
    let write = (data) => {
        let datas = JSON.stringify(data);
        fs.writeFile('./data/requestList.json', datas, (err, data) => {
            if (err) {
                return res.send('404')
            }
        })
    }
    let role = (body, callback) => {
        fs.readFile('./data/requestList.json', 'utf8', (err, data) => {
            if (err) {
                return res.send('500')
            }
            data = JSON.parse(data);
            let username = data.info.find(item => item.username === body.username);
            let ind;
            if (username !== undefined) {
                for (var index in data.info) {
                    if (data.info[index].id === username.id) {
                        ind = index;
                    }
                }
                data.info[ind].info = {};

                data.info[ind].info.playname = body.playname;
                data.info[ind].info.sex = body.sex;
                data.info[ind].info.family = body.family;
                let attribute = {};

                // 1等级 = 10属性点 
                attribute.grade = {
                    value: 1,
                    title: '等级'
                };
                // 1力量 = 10攻击力
                attribute.power = {
                    value: 6*attribute.grade.value,
                    title: '力量'
                };
                // 1敏捷 = 1攻击速度 2闪避
                attribute.agile = {
                    value: 5*attribute.grade.value,
                    title: '敏捷'
                };
                // 1体质 = 30 生命 2物理防御 1魔法防御
                attribute.constitution = {
                    value: 5*attribute.grade.value,
                    title: '体质'
                };
                // 1魔法 = 20法力 2魔法防御 7魔攻
                attribute.magic = {
                    value: 6*attribute.grade.value,
                    title: '魔法'
                };
                // 1防御 = 5物理防御 3魔法防御
                attribute.phyiacticPower = {
                    value: 5*attribute.grade.value,
                    title: '防御'
                };
                // 男性 攻击高防御高
                if (body.sex === '男') {
                    // 1力量 = 10攻击力
                    attribute.power.value += 1
                    // 1防御 = 5物理防御 3魔法防御
                    attribute.phyiacticPower.value += 1
                }

                // 女性 敏捷高法力高
                if (body.sex === '女') {
                    // 1敏捷 = 1攻击速度 2闪避
                    attribute.agile.value += 1
                    // 1魔法 = 20法力 2魔法防御 7魔攻
                    attribute.magic.value += 1
                }

                // 仙 魔攻高
                if (body.family === '仙') {
                    // 1魔法 = 20法力 2魔法防御 7魔攻
                    attribute.magic.value += 1
                }

                // 妖 法力高
                if (body.family === '妖') {
                    // 1魔法 = 20法力 2魔法防御 7魔攻
                    attribute.magic.value += 1
                }

                // 魔 生命高
                if (body.family === '魔') {
                    // 1体质 = 30 生命 2物理防御 1魔法防御
                    attribute.constitution.value += 1
                }

                // 人 敏捷
                if (body.family === '人') {
                    // 1敏捷 = 1攻击速度 2闪避
                    attribute.agile.value += 1
                }

                // 佛 防御高
                if (body.family === '佛') {
                    // 1防御 = 5物理防御 3魔法防御
                    attribute.phyiacticPower.value += 1
                }

                // 鬼 敏捷高
                if (body.family === '鬼') {
                    // 1敏捷 = 1攻击速度 2闪避
                    attribute.agile.value += 1
                }

                // 属性
                // 攻击力
                attribute.magicPower = {
                    value: attribute.power.value * 10,
                    title: '攻击力'
                }
                // 魔攻
                attribute.magicAttack = {
                    value: attribute.magic.value * 7 + attribute.magic.value * 7,
                    title: '魔攻'
                }
                // 生命
                attribute.vitality = {
                    value:  attribute.constitution.value * 30,
                    title: '生命'
                }
                // 法力
                attribute.mana = {
                    value: attribute.magic.value * 20,
                    title: '法力'
                }
                // 物防
                attribute.physicalDefense = {
                    value: attribute.phyiacticPower.value * 5 + attribute.constitution.value * 20,
                    title: '物防'
                }
                // 魔防
                attribute.spellDefense = {
                    value: attribute.phyiacticPower.value * 3 + attribute.constitution.value + attribute.magic.value * 2,
                    title: '魔防'
                }
                // 攻击速度
                attribute.attacks = {
                    value: attribute.agile.value,
                    title: '攻击速度'
                }
                // 闪避
                attribute.dodge = {
                    value: attribute.agile.value * 2,
                    title: '闪避'
                }
                // 1经验 
                attribute.experience = {
                    value:10,
                    title: '1经验'
                }
                // 获得经验
                attribute.gainExperience = {
                    value: 0,
                    title: '获得经验'
                }

                data.info[ind].info.attribute = attribute;
                write(data);
                res.json({
                    code: 1,
                    msg: '创建角色成功'
                })
            }
        })
    }
    role(body, err => {
        if (err) {
            res.send('500')
        }
    })
};