import { Sequelize } from 'sequelize-typescript';
import Id from '../../@shared/domain/value-object/id.value-object';
import Client from '../domain/client.entity';
import Order from '../domain/order.entity';
import Product from '../domain/product.entity';
import { OrderModel } from './order.model';
import { OrderRepository } from './order.repository';

const mockDate = new Date(2000, 1, 1);

describe('OrderRepository unit test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([OrderModel]);
    await sequelize.sync();

    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(async () => {
    await sequelize.close();
    jest.useRealTimers();
  });

  it('should create a new order', async () => {
    const product1 = new Product({
      name: 'Product 1',
      salesPrice: 10,
      description: 'Product 1 description',
    });

    const product2 = new Product({
      name: 'Product 2',
      salesPrice: 20,
      description: 'Product 2 description',
    });

    const orderClient = new Client({
      id: new Id('1'),
      name: 'Client 1',
      email: 'client1@email.com',
      address: 'Client 1 address',
    });

    const order = new Order({
      client: orderClient,
      products: [product1, product2],
      status: 'approved',
    });

    order.approved();

    const orderRepository = new OrderRepository();
    const result = await orderRepository.addOrder(order);
  });

  it('should get an order by id', async () => {
    const orderData = {
      id: '1',
      status: 'approved',
      client: {
        id: '1',
        name: 'Client 1',
        email: 'client1@email.com',
        address: 'Client 1 address',
      },
      products: [
        {
          id: '1',
          name: 'Product 1',
          salesPrice: 10,
          description: 'Product 1 description',
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        {
          id: '2',
          name: 'Product 2',
          salesPrice: 20,
          description: 'Product 2 description',
          createdAt: mockDate,
          updatedAt: mockDate,
        },
      ],
      createdAt: mockDate,
      updatedAt: mockDate,
    };

    await OrderModel.create(orderData);
    const orderRepository = new OrderRepository();

    const result = await orderRepository.findOrder('1');
    const clientResult = result.client;
    const productResult = result.products;

    expect(result.id.id).toEqual(orderData.id);
    expect(result.status).toEqual(orderData.status);
    expect(clientResult.id).toEqual(orderData.client.id);
    expect(clientResult.name).toEqual(orderData.client.name);
    expect(clientResult.email).toEqual(orderData.client.email);
    expect(clientResult.address).toEqual(orderData.client.address);
    expect(productResult[0].id).toEqual(orderData.products[0].id);
    expect(productResult[0].name).toEqual(orderData.products[0].name);
    expect(productResult[0].salesPrice).toEqual(
      orderData.products[0].salesPrice
    );
    expect(productResult[0].description).toEqual(
      orderData.products[0].description
    );
    expect(productResult[1].id).toEqual(orderData.products[1].id);
    expect(productResult[1].name).toEqual(orderData.products[1].name);
    expect(productResult[1].salesPrice).toEqual(
      orderData.products[1].salesPrice
    );
    expect(productResult[1].description).toEqual(
      orderData.products[1].description
    );
  });
});
