import Id from '../../@shared/domain/value-object/id.value-object';
import Order from '../domain/order.entity';
import CheckoutGateway from '../gateway/checkout.gateway';
import { OrderModel } from './order.model';

export class OrderRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    const { id, client, products, status } = order;

    const addOrder = await OrderModel.create({
      id: id.id,
      client,
      products,
      status,
    });

    orderModel(addOrder);
  }

  async findOrder(id: string): Promise<Order> {
    const orderOnDB = await OrderModel.findByPk(id);
    const order = orderModel(orderOnDB);

    return order;
  }
}

function orderModel(orderModel: OrderModel): Order {
  const order = new Order({
    id: new Id(orderModel.id),
    status: orderModel.status,
    client: orderModel.client,
    products: orderModel.products,
  });

  return order;
}
