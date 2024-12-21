export enum WorkType {
    TABLE_ORDER = "Masa Siparişi",
    PACKET_ORDER = "Paket Siparişi",
    COME_AND_TAKE_ORDER = "Gel Al Siparişi"
}

export interface Company {
    name: string,
    dayStart: string,
    dayEnd: string,
    notificationSound: string
    workType: WorkType,
    socketAddress: string,
    screenLockTime: number,
    changeTableTime: number,
    country: string,
    city: string,
    district: string,
    neighborhood: string,
    street: string,
    no: string,
    address: string,
    zipCode: string
}