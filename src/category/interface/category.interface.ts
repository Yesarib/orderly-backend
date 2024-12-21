import { Types } from "mongoose"

export interface Category {
    title: string
    color: string
    company: Types.ObjectId
}