const mongoose = require('mongoose');
// const models = require(__dirname,'./models.js');

// 连接数据库（localhost替换为0.0.0.0）
mongoose.connect('mongodb://0.0.0.0:27017/IRDB',{
    useNewUrlParser:true
});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'commection error:'));
db.once('open',function () {
    console.log('database is connect');
})

module.exports = {
    db,
    // models
}
