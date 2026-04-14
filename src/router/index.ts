
import express from "express";
const router = express.Router();
// 导入控制层
import loginController from '../controllers/loginController.js';
import deviceController from '../controllers/deviceController.js';
import dateController from '../controllers/dateController.js';

router.get("/",(req,res)=>{
    res.send('test');
})

const {register,login,getUserInfo,getUserInfoMiddleware} = loginController;
const {getDeviceList} = deviceController;
const {addReserveRecord,getUserReserveRecord,deleteReserveRecordByOne,modifyReserveRecord,getDeviceTimeList} = dateController;
const authList = ['/getUserInfo','/addReserveRecord','/getUserReserveRecord','/deleteRecordByone','/modifyRecord','/getDeviceTimeList'];
authList.forEach(path=>{router.use(path,getUserInfoMiddleware)});
// 注册
router.post('/register',register);
// 登录
router.post('/login',login);
// 获取用户信息
router.post('/getUserInfo',getUserInfo);
// 获取设备列表
router.get('/getDeviceList',getDeviceList);
// 添加预约记录
router.post('/addReserveRecord',addReserveRecord);
// 获取用户预约记录
router.post('/getUserReserveRecord',getUserReserveRecord);
// 删除预约记录（单条）
router.post('/deleteRecordByone',deleteReserveRecordByOne);
// 修改单条预约记录
router.post('/modifyRecord',modifyReserveRecord);
// 获取预约时间表
router.post('/getDeviceTimeList',getDeviceTimeList);
export default router;