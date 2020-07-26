const fs = require('fs');
exports.gainExperience = (req, res, next) => {
    let body = req.body;
    let write = (data,str) => {
        let datas = JSON.stringify(data);
        fs.writeFile('./data/requestList.json', datas, (err, data) => {
            if (err) {
                return res.send('404')
            }
        })
        res.json({
            code: 1,
            msg: str
        })
    }
    let gainExperience = (body, callback) => {
        fs.readFile('./data/requestList.json', 'utf8', (err, data) => {
            if (err) {
                return res.send('500')
            }
            if (data) {
                data = JSON.parse(data);
                for (var index in data.info) {
                    if (data.info[index].username === body.username) {
                        data.info[index].info.attribute.gainExperience.value += body.gainExperience
                        let grade = data.info[index].info.attribute.grade.value;
                        let experience = data.info[index].info.attribute.experience.value;
                        let gainExperience = data.info[index].info.attribute.gainExperience.value;
                        let str ='获得经验';
                        function upgrade() {
                            if (experience <= gainExperience) {
                                gainExperience -= experience;
                                grade++;
                                experience *=2;
                                data.info[index].info.attribute.power.value += 1;
                                data.info[index].info.attribute.grade.value = grade;
                                data.info[index].info.attribute.experience.value = experience;
                                data.info[index].info.attribute.gainExperience.value = gainExperience;
                                str = '等级提升'
                                upgrade(grade, experience, gainExperience)
                            }
                        }
                        upgrade(grade, experience, gainExperience)
                        write(data,str);
                    }
                }
            }
        })
    }
    gainExperience(body, err => {
        if (err) {
            res.send('500')
        }
    })
};