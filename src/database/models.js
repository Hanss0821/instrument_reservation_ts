const mongoose = require('mongoose');
// 用户表模型
/**
 * 注释密码加密
 * set(val){
        return require('bcrypt').hashSync(val,10); // 加密用户密码
    }
 * 
 */
const uesrModel = {
    username:{type:String,unique:true}, // 唯一键
    password:{type:String},
    name:{type:String}
};

// 创建设备模型
const deviceModel = {
    devicename:{type:String,unique:true},
}

// 创建时间表
const DateModel = {
    deviceId:{type:String},
    userId:{type:String},
    username:{type:String},
    date:{type:String},
    startTime:{type:String},
    endTime:{type:String},
    name:{type:String}
}

// 创建模型
const User = mongoose.model("User",new mongoose.Schema(uesrModel));
const Device = mongoose.model("Device",new mongoose.Schema(deviceModel));
const Date = mongoose.model('Date',new mongoose.Schema(DateModel));
module.exports = {
    User,
    Device,
    Date
}
