import { Sequelize } from 'sequelize-typescript';
import Id from '../../@shared/domain/value-object/id.value-object';
import Address from '../domain/address';
import Invoice from '../domain/invoice';
import Product from '../domain/product';
import InvoiceAddressModel from './invoice.address.model';
import InvoiceModel from './invoice.model';
import InvoiceProductModel from './invoice.product.model';
import InvoiceRepository from './invoice.repository';

describe('InvoiceRepository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      InvoiceModel,
      InvoiceAddressModel,
      InvoiceProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should generate a invoice', async () => {
    const invoice = new Invoice({
      name: 'Invoice',
      document: '123456789',
      address: new Address({
        street: 'Street',
        number: '123',
        complement: 'Complement',
        city: 'City',
        state: 'State',
        zipCode: '12345678',
      }),
      items: [
        new Product({ id: new Id('1'), name: 'Product 1', price: 10 }),
        new Product({ id: new Id('2'), name: 'Product 2', price: 20 }),
      ],
    });

    const repository = new InvoiceRepository();
    const result = await repository.generate(invoice);

    expect(result.id.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);

    expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[1].id.id).toBe(invoice.items[1].id.id);
    expect(result.items[1].name).toBe(invoice.items[1].name);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.items.length).toBe(invoice.items.length);
    expect(result.total).toBe(invoice.total);
  });

  it("should find a invoice", async () => {
    const invoice = new Invoice({
      name: 'Invoice',
      document: '123456789',
      address: new Address({
        street: 'Street',
        number: '123',
        complement: 'Complement',
        city: 'City',
        state: 'State',
        zipCode: '12345678',
      }),
      items: [
        new Product({ id: new Id('1'), name: 'Product 1', price: 10 }),
        new Product({ id: new Id('2'), name: 'Product 2', price: 20 }),
      ],
    });

    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const result = await repository.find(invoice.id.id);

    expect(result.id.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);

    expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[1].id.id).toBe(invoice.items[1].id.id);
    expect(result.items[1].name).toBe(invoice.items[1].name);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.items.length).toBe(invoice.items.length);
    expect(result.total).toBe(invoice.total);
  });
});
