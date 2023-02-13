import Order from '../domain/order.entity';

export default interface CheckoutGateway {
  addOder(order: Order): Promise<void>;
  findOrder(id: string): Promise<Order | null>;
}
