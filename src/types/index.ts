// src/types/index.ts
import { Request, Response, NextFunction } from 'express'

// 统一响应体
export interface ApiResponse<T = unknown> {
    status: number
    success: boolean
    data: T
}

// 请求体类型
export interface RegisterBody {
    username: string
    password: string
    name: string
}

export interface LoginBody {
    username: string
    password: string
}

export interface ReserveRecordBody {
    deviceId: string
    userId: string
    name: string
    date: string
    startTime: string
    endTime: string
}

export interface ModifyRecordBody extends ReserveRecordBody {
    _id: string
}

export interface DeleteRecordBody {
    id: string
}

export interface DeviceTimeBody {
    deviceId: string
}

export interface UserInfoBody {
    userId: string
}

// 扩展 Express Request，挂载 userInfo
declare global {
    namespace Express {
        interface Request {
            userInfo?: any
        }
    }
}