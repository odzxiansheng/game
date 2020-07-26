const fs = require('fs');
exports.read = (req, res, next) => {
    let body = req.body;
    let ind = null;
    let read = (body, callback) => {
        fs.readFile('./data/requestList.json', 'utf8', (err, data) => {
            if (err) {
                return res.send('500')
            }
            let datas = JSON.parse(data);
            for(var index in datas.info){
                if(datas.info[index].username === body.username){
                    ind = index
                }
            }
            if(datas.info[ind].info && datas.info[ind].info.attribute){
                let attribute = datas.info[ind].info.attribute
                let grade = attribute.grade.value;
    
                // 1力量 = 10攻击力
                datas.info[ind].info.attribute.power.value = 6*grade;
                // 1敏捷 = 1攻击速度 2闪避
                datas.info[ind].info.attribute.agile.value = 5*grade;
                // 1体质 = 30 生命 2物理防御 1魔法防御
                datas.info[ind].info.attribute.constitution.value = 5*grade;
                // 1魔法 = 20法力 2魔法防御 7魔攻
                datas.info[ind].info.attribute.magic.value = 6*grade;
                // 1防御 = 5物理防御 3魔法防御
                datas.info[ind].info.attribute.phyiacticPower.value = 5*grade;
    
                // 男性 攻击高防御高
                if(datas.info[ind].info.sex === '男'){
                    // 1力量 = 10攻击力
                    datas.info[ind].info.attribute.power.value += grade;
                    // 1防御 = 5物理防御 3魔法防御
                    datas.info[ind].info.attribute.phyiacticPower.value += grade;
                }
    
                // 女性 敏捷高法力高
                if(datas.info[ind].info.sex === '女'){
                    // 1敏捷 = 1攻击速度 2闪避
                    datas.info[ind].info.attribute.agile.value += grade;
                    // 1魔法 = 20法力 2魔法防御 7魔攻
                    datas.info[ind].info.attribute.magic.value += grade;
                }
    
                // 女性 敏捷高法力高
                if(datas.info[ind].info.sex === '女'){
                    // 1敏捷 = 1攻击速度 2闪避
                    datas.info[ind].info.attribute.agile.value += grade;
                    // 1魔法 = 20法力 2魔法防御 7魔攻
                    datas.info[ind].info.attribute.magic.value += grade;
                }
    
                // 仙 魔攻高
                if(datas.info[ind].info.family === '仙'){
                    // 1魔法 = 20法力 2魔法防御 7魔攻
                    datas.info[ind].info.attribute.magic.value += grade;
                }
    
                // 妖 法力高
                if(datas.info[ind].info.family === '妖'){
                    // 1魔法 = 20法力 2魔法防御 7魔攻
                    datas.info[ind].info.attribute.magic.value += grade;
                }
    
                // 魔 生命高
                if(datas.info[ind].info.family === '魔'){
                    // 1体质 = 30 生命 2物理防御 1魔法防御
                    datas.info[ind].info.attribute.constitution.value += grade;
                }
    
                // 人 敏捷
                if(datas.info[ind].info.family === '人'){
                    // 1敏捷 = 1攻击速度 2闪避
                    datas.info[ind].info.attribute.agile.value += grade;
                }
    
                // 佛 防御高
                if(datas.info[ind].info.family === '佛'){
                    // 1防御 = 5物理防御 3魔法防御
                    datas.info[ind].info.attribute.phyiacticPower.value += grade;
                }
    
                // 鬼 敏捷高
                if(datas.info[ind].info.family === '鬼'){
                    // 1防御 = 5物理防御 3魔法防御
                    datas.info[ind].info.attribute.agile.value += grade;
                }
    
                // 属性
                // 攻击力
                let a = datas.info[ind].info.attribute;
                datas.info[ind].info.attribute.magicPower.value = a.magicPower.value* 10;
                // 魔攻
                datas.info[ind].info.attribute.magicAttack.value = a.magic.value* 7 +  a.magic.value* 7;
                // 生命
                datas.info[ind].info.attribute.vitality.value = a.constitution.value* 30 ;
                // 法力
                datas.info[ind].info.attribute.mana.value = a.magic.value* 20 ;
                // 物防
                datas.info[ind].info.attribute.physicalDefense.value = a.phyiacticPower.value* 5 + a.constitution.value* 5 ;
                // 魔防
                datas.info[ind].info.attribute.spellDefense.value = a.phyiacticPower.value* 3 + a.constitution.value + a.magic.value* 5 ;
                // 攻击速度
                datas.info[ind].info.attribute.attacks.value = a.agile.value;
                // 闪避
                datas.info[ind].info.attribute.dodge.value = a.agile.value * 2;
                
                let userInfo =  datas.info[ind].info;
                res.json(userInfo)
            }else{
                datas.info[ind].info.attribute = {
                    grade:{
                        value:1,
                        title:'等级'
                    },
                    power:{
                        value:1,
                        title:'力量'
                    },
                    constitution:{
                        value:1,
                        title:'体质'
                    },
                    magic:{
                        value:1,
                        title:'魔法'
                    },
                    phyiacticPower:{
                        value:1,
                        title:'防御'
                    },
                    magicPower:{
                        value:1,
                        title:'攻击力'
                    },
                    magicAttack:{
                        value:1,
                        title:'魔攻'
                    },
                    vitality:{
                        value:1,
                        title:'生命'
                    },
                    mana:{
                        value:1,
                        title:'法力'
                    },
                    physicalDefense:{
                        value:1,
                        title:'物防'
                    },
                    spellDefense:{
                        value:1,
                        title:'魔防'
                    },
                    attacks:{
                        value:1,
                        title:'攻击速度'
                    },
                    dodge:{
                        value:1,
                        title:'闪避'
                    },
                }
                let attribute = datas.info[ind].info.attribute
                let grade = attribute.grade.value;
    
                // 1力量 = 10攻击力
                datas.info[ind].info.attribute.power.value = 6*grade;
                // 1敏捷 = 1攻击速度 2闪避
                datas.info[ind].info.attribute.agile.value = 5*grade;
                // 1体质 = 30 生命 2物理防御 1魔法防御
                datas.info[ind].info.attribute.constitution.value = 5*grade;
                // 1魔法 = 20法力 2魔法防御 7魔攻
                datas.info[ind].info.attribute.magic.value = 6*grade;
                // 1防御 = 5物理防御 3魔法防御
                datas.info[ind].info.attribute.phyiacticPower.value = 5*grade;
    
                // 男性 攻击高防御高
                if(datas.info[ind].info.sex === '男'){
                    // 1力量 = 10攻击力
                    datas.info[ind].info.attribute.power.value += grade;
                    // 1防御 = 5物理防御 3魔法防御
                    datas.info[ind].info.attribute.phyiacticPower.value += grade;
                }
    
                // 女性 敏捷高法力高
                if(datas.info[ind].info.sex === '女'){
                    // 1敏捷 = 1攻击速度 2闪避
                    datas.info[ind].info.attribute.agile.value += grade;
                    // 1魔法 = 20法力 2魔法防御 7魔攻
                    datas.info[ind].info.attribute.magic.value += grade;
                }
    
                // 女性 敏捷高法力高
                if(datas.info[ind].info.sex === '女'){
                    // 1敏捷 = 1攻击速度 2闪避
                    datas.info[ind].info.attribute.agile.value += grade;
                    // 1魔法 = 20法力 2魔法防御 7魔攻
                    datas.info[ind].info.attribute.magic.value += grade;
                }
    
                // 仙 魔攻高
                if(datas.info[ind].info.family === '仙'){
                    // 1魔法 = 20法力 2魔法防御 7魔攻
                    datas.info[ind].info.attribute.magic.value += grade;
                }
    
                // 妖 法力高
                if(datas.info[ind].info.family === '妖'){
                    // 1魔法 = 20法力 2魔法防御 7魔攻
                    datas.info[ind].info.attribute.magic.value += grade;
                }
    
                // 魔 生命高
                if(datas.info[ind].info.family === '魔'){
                    // 1体质 = 30 生命 2物理防御 1魔法防御
                    datas.info[ind].info.attribute.constitution.value += grade;
                }
    
                // 人 敏捷
                if(datas.info[ind].info.family === '人'){
                    // 1敏捷 = 1攻击速度 2闪避
                    datas.info[ind].info.attribute.agile.value += grade;
                }
    
                // 佛 防御高
                if(datas.info[ind].info.family === '佛'){
                    // 1防御 = 5物理防御 3魔法防御
                    datas.info[ind].info.attribute.phyiacticPower.value += grade;
                }
    
                // 鬼 敏捷高
                if(datas.info[ind].info.family === '鬼'){
                    // 1防御 = 5物理防御 3魔法防御
                    datas.info[ind].info.attribute.agile.value += grade;
                }
    
                // 属性
                // 攻击力
                let a = datas.info[ind].info.attribute;
                datas.info[ind].info.attribute.magicPower.value = a.magicPower.value* 10;
                // 魔攻
                datas.info[ind].info.attribute.magicAttack.value = a.magic.value* 7 +  a.magic.value* 7;
                // 生命
                datas.info[ind].info.attribute.vitality.value = a.constitution.value* 30 ;
                // 法力
                datas.info[ind].info.attribute.mana.value = a.magic.value* 20 ;
                // 物防
                datas.info[ind].info.attribute.physicalDefense.value = a.phyiacticPower.value* 5 + a.constitution.value* 5 ;
                // 魔防
                datas.info[ind].info.attribute.spellDefense.value = a.phyiacticPower.value* 3 + a.constitution.value + a.magic.value* 5 ;
                // 攻击速度
                datas.info[ind].info.attribute.attacks.value = a.agile.value;
                // 闪避
                datas.info[ind].info.attribute.dodge.value = a.agile.value * 2;
                
                let userInfo =  datas.info[ind].info;
                res.json(userInfo)
            }
        })
    }
    read(body, err => {
        if (err) {
            res.send('500')
        }
    })
};