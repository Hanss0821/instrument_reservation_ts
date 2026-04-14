import loginService from "../server/deviceServer.js";
import { Request, Response } from 'express'
// 获取设备列表
const getDeviceList= async (req: Request,res: Response):Promise<void> =>{
    try{
        const list = await loginService.getDeviceList();
        res.status(200).send({
            status: 200,
            success: true,
            data: list,
          })
    }catch(err){
      const status = (err as any)?.status || 500;
      const message = (err as any)?.message || 'Internal Server Error';
        res.status(status).send({
            status,
            success: false,
            data: {
              error:  { message }
            },
          });
    }
}

export default {
    getDeviceList
};