import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderModel } from './order.model';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/createOrder.dto';
import { ItemDto } from './dto/item.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { PaymentType } from './interface/order.interface';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>
    ) { }

    async createOrder(order: CreateOrderDto): Promise<OrderModel> {
        const newOrder = await new this.orderModel(order).save();

        return newOrder;
    }

    async getOrders(): Promise<OrderModel[]> {
        const orders = await this.orderModel.find().exec();

        return orders
    }

    async getOrderById(orderId: string): Promise<OrderModel> {
        const order = await this.orderModel.findById(orderId).exec()

        if (!order) {
            throw new HttpException('Order not found!', HttpStatus.NOT_FOUND)
        }

        return order
    }

    async getOrderByTableId(tableId: string): Promise<OrderModel> {
        const order = await this.orderModel.findOne({ tableId: tableId }).exec()

        return order
    }

    async getOrdersByRegionId(regionId: string): Promise<OrderModel[]> {
        const orders = await this.orderModel.find({ regionId: regionId }).exec();

        return orders;
    }

    async updateOrder(orderId: string, items: ItemDto[]): Promise<OrderModel> {
        const order = await this.orderModel.findById(orderId).exec();

        if (!order) {
            throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);
        }

        order.items = items.filter(item => item.quantity > 0);

        await order.save();
        return order;
    }

    async deleteOrderItem(orderId: string, productId: string): Promise<OrderModel> {
        const order = await this.orderModel.findById(orderId).exec()

        if (!order) {
            throw new HttpException('Order not found!', HttpStatus.NOT_FOUND)
        }

        const initialLength = order.items.length;

        order.items = order.items.filter(
            (item) => item.productId.toString() !== productId.toString()
        );

        if (order.items.length === initialLength) {
            throw new HttpException('Product not found in order!', HttpStatus.NOT_FOUND);
        }

        await order.save();
        return order;
    }

    async deleteOrder(orderId: string): Promise<any> {
        const order = await this.orderModel.findByIdAndDelete(orderId);

        if (!order) {
            throw new HttpException('Order not found!', HttpStatus.NOT_FOUND)
        }

        return { message: 'Order deleted successfully' }
    }
}
