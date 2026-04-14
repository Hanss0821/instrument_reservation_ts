const path = require("path");
const Models = require(path.resolve(__dirname,"../database/models.js"));
const {Device} = Models;

const getDeviceList = async ()=>{
   try{
    const list = await Device.find();
    return list;
    }catch(err){
        throw {
            status: 500,
            success: false,
            message: "获取仪器列表失败",
          };
    }
}

module.exports = {
    getDeviceList
}