import { Sequelize } from 'sequelize-typescript';
import InvoiceFacadeFactory from '../factory/invoice.facade.factory';
import InvoiceAddressModel from '../repository/invoice.address.model';
import InvoiceModel from '../repository/invoice.model';
import InvoiceProductModel from '../repository/invoice.product.model';

describe('InvoiceFacade test', () => {
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
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: 'John Doe',
      document: '12345678910',
      street: 'Street',
      number: '123',
      complement: 'Complement',
      city: 'City',
      state: 'State',
      zipCode: '12345678',
      items: [
        {
          id: '1',
          name: 'Item 1',
          price: 10,
        },
        {
          id: '2',
          name: 'Item 2',
          price: 20,
        },
      ],
    };

    const output = await facade.generate(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.street).toBe(input.street);
    expect(output.number).toBe(input.number);
    expect(output.complement).toBe(input.complement);
    expect(output.city).toBe(input.city);
    expect(output.state).toBe(input.state);
    expect(output.zipCode).toBe(input.zipCode);

    expect(output.items[0].id).toBe(input.items[0].id);
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
    expect(output.items[1].id).toBe(input.items[1].id);
    expect(output.items[1].name).toBe(input.items[1].name);
    expect(output.items[1].price).toBe(input.items[1].price);
    expect(output.total).toBe(30);
  });

  it('should find a invoice', async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      id: '1',
      name: 'John Doe',
      document: '12345678910',
      street: 'Street',
      number: '123',
      complement: 'Complement',
      city: 'City',
      state: 'State',
      zipCode: '12345678',
      items: [
        {
          id: '1',
          name: 'Item 1',
          price: 10,
        },
        {
          id: '2',
          name: 'Item 2',
          price: 20,
        },
      ],
    };

    await InvoiceModel.create(
      {
        id: input.id,
        name: input.name,
        document: input.document,
        address: {
          street: input.street,
          number: input.number,
          complement: input.complement,
          city: input.city,
          state: input.state,
          zipCode: input.zipCode,
        },
        items: input.items.map((p) => {
          return {
            id: p.id,
            name: p.name,
            price: p.price,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: [InvoiceAddressModel, InvoiceProductModel],
      }
    );

    const output = await facade.find({ id: '1' });

    expect(output.id).toBe(input.id);
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.address.street).toBe(input.street);
    expect(output.address.number).toBe(input.number);
    expect(output.address.complement).toBe(input.complement);
    expect(output.address.city).toBe(input.city);
    expect(output.address.state).toBe(input.state);
    expect(output.address.zipCode).toBe(input.zipCode);

    expect(output.items[0].id).toBe(input.items[0].id);
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
    expect(output.items[1].id).toBe(input.items[1].id);
    expect(output.items[1].name).toBe(input.items[1].name);
    expect(output.items[1].price).toBe(input.items[1].price);
    expect(output.total).toBe(30);
  });
});
