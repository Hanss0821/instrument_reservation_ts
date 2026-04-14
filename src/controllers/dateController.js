const path = require("path");
const dateService = require(path.resolve(
    __dirname,
    "../server/dateServer.js"
));


// 添加预约记录
const addReserveRecord = async (req, res) => {
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
        res.status(err?.status || 500).send({
            status: err?.status || 500,
            success: false,
            data: {
                error: err?.message ? { message: err.message } : err,
            },
        });
    }
}
// 修改单条记录
const modifyReserveRecord = async (req, res) => {
    const { deviceId, userId, name, date, startTime, endTime, _id } = req.body || {};
    if (!_id || !deviceId || !userId || !name || !date || !startTime || !endTime) {
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
        const result = await dateService.modifyReserveRecord(_id,params);
        res.status(200).send({
            status: 200,
            success: true,
            data: result
        });
    } catch (err) {
        res.status(err?.status || 500).send({
            status: err?.status || 500,
            success: false,
            data: {
                error: err?.message ? { message: err.message } : err,
            },
        });
    }
}
// 删除单条记录
const deleteReserveRecordByOne = async (req, res) => {
    const { id } = req.body || {};
    if (!id) {
        res.status(400).send({
            status: 400,
            success: false,
            data: {
                error: { message: '提交信息参数不完整' }
            }
        })
    }
    try {
        const result = await dateService.deleteReserveRecordByOne(id);
        if (!result) {
            throw {
                message: '删除失败，查询不到记录'
            }
        }
        res.status(200).send({
            status: 200,
            success: true,
            data: result
        });
    } catch (err) {
        res.status(err?.status || 500).send({
            status: err?.status || 500,
            success: false,
            data: {
                error: err?.message ? { message: err.message } : err,
            },
        });
    }
}
// 获取设备时间表
const getDeviceTimeList = async (req,res)=>{
    const {deviceId} = req.body || {};
    if (!deviceId) {
        res.status(400).send({
            status: 400,
            success: false,
            data: {
                error: { message: '提交信息参数不完整' }
            }
        })
    }
    try {
        const result = await dateService.getDeviceTimeList(deviceId);
        if (!result) {
            throw {
                message: '获取时间记录表失败'
            }
        }
        res.status(200).send({
            status: 200,
            success: true,
            data: result
        });
    } catch (err) {
        res.status(err?.status || 500).send({
            status: err?.status || 500,
            success: false,
            data: {
                error: err?.message ? { message: err.message } : err,
            },
        });
    }
}
// 获取该用户预约当前设备记录
const getUserReserveRecord = async (req, res) => {
    const { userId, deviceId } = req.body || {};
    if (!userId || !deviceId) {
        res.status(400).send({
            status: 400,
            success: false,
            data: {
                error: { message: '提交信息参数不完整' }
            }
        })
    }
    const params = { userId, deviceId };
    try {
        const list = await dateService.getUserReserveRecord(params);
        res.status(200).send({
            status: 200,
            success: true,
            data: list
        })
    } catch (err) {
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
    addReserveRecord,
    getUserReserveRecord,
    deleteReserveRecordByOne,
    modifyReserveRecord,
    getDeviceTimeList,
}