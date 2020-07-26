const fs = require('fs');
const express = require('express');
// post请求文件
const bodyParser = require('body-parser');
const apiRouter = require('./routers/apiRouter');

// 创建服务器
let app = express();

// 指定公开目录
app.use('/public/',express.static('./public/'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
    next();
});

app.use('/api',apiRouter);

app.listen(3000,function(){
    console.log('服务器已经启动');
})


