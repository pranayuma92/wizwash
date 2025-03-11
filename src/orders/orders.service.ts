import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderModel } from '../db/models/order.model';
import { OrderDetailModel } from '../db/models/order-detail.model';

@Injectable()
export class OrdersService {
  async create(createOrderDto: CreateOrderDto): Promise<string> {
    const newOrder = await OrderModel.query().insert(createOrderDto);
    if(!newOrder) throw new BadRequestException('Error while creating order');
    const newOrderDetail = new CreateOrderDetailDto;
    newOrderDetail.orderId = newOrder.id;
    newOrderDetail.qty = createOrderDto.qty;
    newOrderDetail.desc = createOrderDto.desc;
    newOrderDetail.productId = createOrderDto.productId;
    await OrderDetailModel.query().insert(newOrderDetail);
    return 'Order created';
  }

  async findAll(tenantId: number): Promise<OrderModel[]> {
    return OrderModel
      .query()
      .select(
        'order.*',
        'member.fullname',
        'member.phone',
        'product.code',
        'product.name',
        'order_detail.qty',
        'order_detail.desc'
      )
      .join('member', 'order.member_id', '=', 'member.id')
      .join('order_detail', 'order_detail.order_id', '=', 'order.id' )
      .join('product', 'order_detail.product_id', '=', 'product.id')
      .where('order.tenant_id', tenantId);
  }

  async findOne(
    tenantId: number,
    id: number
  ): Promise<OrderModel[]> {
     return OrderModel
      .query()
      .select(
        'order.*',
        'member.fullname',
        'member.phone',
        'product.code',
        'product.name',
        'order_detail.qty',
        'order_detail.desc'
      )
      .join('member', 'order.member_id', '=', 'member.id')
      .join('order_detail', 'order_detail.order_id', '=', 'order.id' )
      .join('product', 'order_detail.product_id', '=', 'product.id')
      .where('order.tenant_id', tenantId)
      .where('order.id', id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderModel> {
    const order = await OrderModel.query().findOne({ id });
    if(!order) throw new BadRequestException('Member not found');
    return await OrderModel.query().patchAndFetchById(id, updateOrderDto);
  }

  async remove(id: number): Promise<string> {
    const deletedRows = await OrderModel.query().deleteById(id);
    if (!deletedRows) throw new BadRequestException(`Order with ID ${id} not found`);
    const orderDetailDeleted = await OrderDetailModel.query().delete().where('order_id', id);
    return 'Order deleted';
  }
}
