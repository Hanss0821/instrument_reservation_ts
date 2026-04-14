const path = require("path");
const Models = require(path.resolve(__dirname, "../database/models.js"));
const { Date } = Models;
// 处理添加预约记录
const addReserveRecord = async (params) => {
  const { deviceId, userId, name, date, startTime, endTime } = params;
  try {
   const dateInfo =  await Date.create({
      deviceId,
      userId,
      name,
      date,
      startTime,
      endTime,
    });
    return dateInfo;
  } catch (err) {
    console.log(err);
    throw {
        status: 500,
        success: false,
        message: "预约失败，请稍后再试",
      };
    }
};

// 获取该用户预约当前设备记录
const getUserReserveRecord = async (params)=>{
    const {userId,deviceId} = params;
    try{
        const result = await Date.find({userId,deviceId});
        return result;
    }catch(err){
        throw {
            status: 500,
            success: false,
            message: "获取个人预约记录失败,请稍后再试",
          };
    }
}

// 处理删除单条记录
const deleteReserveRecordByOne = async (id)=>{
    try{
        const result = await Date.findByIdAndRemove(id);
        return result;
    }catch(err){
        console.log('删除记录失败',err);
        throw {
            status: 500,
            success: false,
            message: "删除记录失败",
          };
    }
}
// 修改单条预约记录
const modifyReserveRecord = async(id,params)=>{
    try{
        const result = await Date.findByIdAndUpdate(id,params,{ new: true });
        console.log('res',result);
        return result;
    }catch(err){
        console.log('修改记录失败',err);
        throw {
            status: 500,
            success: false,
            message: "修改记录失败",
          };
    }
}

// 获取设备预约时间表
const getDeviceTimeList  = async(id) =>{
    try{
        const result = await Date.find({deviceId:id});
        // { title: '翟宇', start: '2023-09-27 08:00:00',end: '2023-09-27 12:00:00'}
        if(Array.isArray(result)&&result.length){
           return result.map(item=>{
                const startTime = `${item.date} ${item.startTime}:00`;
                const endTime = `${item.date} ${item.endTime}:00`;
                return {
                    title:item.name,
                    start:startTime,
                    end:endTime
                };
            })
        }
        return [];
    }catch(err){
        console.log('修改记录失败',err);
        throw {
            status: 500,
            success: false,
            message: "获取预约时间表失败",
          };
    }
}
module.exports = {
    addReserveRecord,
    getUserReserveRecord,
    deleteReserveRecordByOne,
    modifyReserveRecord,
    getDeviceTimeList
}
