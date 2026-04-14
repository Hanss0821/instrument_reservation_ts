import {Response,Request,NextFunction} from "express";
import {ReserveRecordBody,DeleteRecordBody, ModifyRecordBody, DeviceTimeBody} from "../types/index"
import dateService from "../server/dateServer.js";

// 添加预约记录
const addReserveRecord = async (req:Request<{},{},ReserveRecordBody>, res:Response):Promise<void> => {
    const { deviceId, userId, name, date, startTime, endTime } = req.body || {};
    if (!deviceId || !userId || !name || !date || !startTime || !endTime) {
        res.status(400).send({
            status: 400,
            success: false,
            data: {
                error: { message: '提交信息参数不完整' }
            }
        })
    }
    try {
        const params = { deviceId, userId, name, date, startTime, endTime };
        const result = await dateService.addReserveRecord(params);
        res.status(200).send({
            status: 200,
            success: true,
            data: result
        });
    } catch (err) {
        const status = (err as any)?.status || 500;
        res.status(status).send({
            status,
            success: false,
            data: {
                error: (err as any)?.message,
            },
        });
    }
}
// 获取预约记录
export const getUserReserveRecord = async (req: Request<{}, {}, { userId: string, deviceId: string }>, res: Response): Promise<void> => {
    const { userId, deviceId } = req.body || {}
    if (!userId || !deviceId) {
        res.status(400).send({ status: 400, success: false, data: { error: { message: '参数不完整' } } })
        return
    }
    try {
        const list = await dateService.getUserReserveRecord({ userId, deviceId })
        res.status(200).send({ status: 200, success: true, data: list })
    } catch (err) {
        const status = (err as any)?.status || 500
        res.status(status).send({ status, success: false, data: { error: { message: (err as any)?.message } } })
    }
}
// 删除单条记录
export const deleteReserveRecordByOne = async (req: Request<{}, {}, DeleteRecordBody>, res: Response): Promise<void> => {
    const { id } = req.body || {}
    if (!id) {
        res.status(400).send({ status: 400, success: false, data: { error: { message: '参数不完整' } } })
        return
    }
    try {
        const result = await dateService.deleteReserveRecordByOne(id)
        if (!result) throw { message: '删除失败，查询不到记录' }
        res.status(200).send({ status: 200, success: true, data: result })
    } catch (err) {
        const status = (err as any)?.status || 500
        res.status(status).send({ status, success: false, data: { error: { message: (err as any)?.message } } })
    }
}
// 修改预约记录
export const modifyReserveRecord = async (req: Request<{}, {}, ModifyRecordBody>, res: Response): Promise<void> => {
    const { _id, deviceId, userId, name, date, startTime, endTime } = req.body || {}
    if (!_id || !deviceId || !userId || !name || !date || !startTime || !endTime) {
        res.status(400).send({ status: 400, success: false, data: { error: { message: '参数不完整' } } })
        return
    }
    try {
        const result = await dateService.modifyReserveRecord(_id, { deviceId, userId, name, date, startTime, endTime })
        res.status(200).send({ status: 200, success: true, data: result })
    } catch (err) {
        const status = (err as any)?.status || 500
        res.status(status).send({ status, success: false, data: { error: { message: (err as any)?.message } } })
    }
}
// 获取设备时间表
export const getDeviceTimeList = async (req: Request<{}, {}, DeviceTimeBody>, res: Response): Promise<void> => {
    const { deviceId } = req.body || {}
    if (!deviceId) {
        res.status(400).send({ status: 400, success: false, data: { error: { message: '参数不完整' } } })
        return
    }
    try {
        const result = await dateService.getDeviceTimeList(deviceId)
        res.status(200).send({ status: 200, success: true, data: result })
    } catch (err) {
        const status = (err as any)?.status || 500
        res.status(status).send({ status, success: false, data: { error: { message: (err as any)?.message } } })
    }
}
export default {
    addReserveRecord,
    getUserReserveRecord,
    deleteReserveRecordByOne,
    modifyReserveRecord,
    getDeviceTimeList,
}