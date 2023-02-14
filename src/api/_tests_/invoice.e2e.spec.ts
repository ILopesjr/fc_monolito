import request from 'supertest';
import Id from '../../modules/@shared/domain/value-object/id.value-object';
import Address from '../../modules/invoice/domain/address';
import Invoice from '../../modules/invoice/domain/invoice';
import Product from '../../modules/invoice/domain/product';
import InvoiceRepository from '../../modules/invoice/repository/invoice.repository';
import { app, sequelize } from '../express';

describe('InvoiceController (e2e)', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new invoice', async () => {
    const address = new Address({
      street: 'Rua 1',
      number: '1',
      complement: 'Casa 1',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '12345678',
    });

    const product1 = new Product({
      id: new Id('1'),
      name: 'Product 1',
      price: 10,
    });

    const product2 = new Product({
      id: new Id('2'),
      name: 'Product 2',
      price: 20,
    });

    const invoice = new Invoice({
      id: new Id('1'),
      name: 'Invoice 1',
      document: '12345678901',
      address,
      items: [product1, product2],
    });

    const repository =  new InvoiceRepository();

    await repository.generate(invoice);

    const response = await request(app).get(`/invoice/${1}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Invoice 1");
  });
});
