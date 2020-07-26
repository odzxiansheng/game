
const find = require('../controllers/data.json');
exports.peoArr = (req,res,next) => {
    res.json(find)
};