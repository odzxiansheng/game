var fs = require('fs');
const express = require('express');
const peos = require('../controllers/peo');
const add = require('../controllers/add');
const del = require('../controllers/del');
const find = require('../controllers/find');
const gai = require('../controllers/gai');
const request = require('../controllers/request');
const login = require('../controllers/login');
const role = require('../controllers/role');
const read = require('../controllers/read');
const master = require('../master/master');
const existence = require('../controllers/existence');
const gainExperience = require('../controllers/gainExperience');
const goodsList = require('../controllers/goodsList');
const checkpoint = require('../controllers/checkpoint')

let router = express.Router();

router.get('/peo',peos.peoArr)
      .post('/add',add.add)
      .post('/del',del.del)
      .post('/find',find.find)
      .post('/gai',gai.gai)

      .post('/request',request.request)
      .post('/login',login.login)
      .post('/existence',existence.existence)
      .post('/role',role.role)
      .post('/read',read.read)

      .post('/master',master.master)
      .post('/gainExperience',gainExperience.gainExperience)
      .post('/goodsList',goodsList.goodsList)
      .post('/checkpoint',checkpoint.checkpoint)

module.exports = router;
