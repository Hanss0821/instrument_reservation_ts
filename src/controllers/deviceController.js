const path = require("path");
const loginService = require(path.resolve(
  __dirname,
  "../server/deviceServer.js"
));

// 获取设备列表
const getDeviceList= async (req,res)=>{
    try{
        const list = await loginService.getDeviceList();
        res.status(200).send({
            status: 200,
            success: true,
            data: list,
          })
    }catch(err){
        res.status(err?.status || 500).send({
            status: err?.status || 500,
            success: false,
            data: {
              error: err?.message ? { message: err.message } : err,
            },
          });
    }
}

module.exports = {
    getDeviceList
  };