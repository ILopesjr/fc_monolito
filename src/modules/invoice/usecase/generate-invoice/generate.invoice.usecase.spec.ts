import Id from '../../../@shared/domain/value-object/id.value-object';
import Address from '../../domain/address';
import Invoice from '../../domain/invoice';
import Product from '../../domain/product';
import GenerateInvoiceUseCase from './generate.invoice.usecase';

const invoice = new Invoice({
  id: new Id('1'),
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

const MockRepository = () => ({
  generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  find: jest.fn(),
});

describe('Generate invoice usecase unit test', () => {
  it('should generate invoice', async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoiceRepository);
    const input = {
      name: 'Invoice',
      document: '123456789',
      street: 'Street',
      number: '123',
      complement: 'Complement',
      city: 'City',
      state: 'State',
      zipCode: '12345678',
      items: [
        { id: '1', name: 'Product 1', price: 10 },
        { id: '2', name: 'Product 2', price: 20 },
      ],
    };

    const output = await usecase.execute(input);

    expect(invoiceRepository.generate).toHaveBeenCalled();
    expect(output.id).toBe(invoice.id.id);

    expect(output.name).toBe(invoice.name);
    expect(output.document).toBe(invoice.document);
    expect(output.street).toBe(invoice.address.street);
    expect(output.number).toBe(invoice.address.number);
    expect(output.complement).toBe(invoice.address.complement);
    expect(output.city).toBe(invoice.address.city);
    expect(output.state).toBe(invoice.address.state);
    expect(output.zipCode).toBe(invoice.address.zipCode);

    expect(output.items[0].id).toBe(invoice.items[0].id.id);
    expect(output.items[0].name).toBe(invoice.items[0].name);
    expect(output.items[1].id).toBe(invoice.items[1].id.id);
    expect(output.items[0].price).toBe(invoice.items[0].price);
    expect(output.items[1].name).toBe(invoice.items[1].name);
    expect(output.items[1].price).toBe(invoice.items[1].price);
    expect(output.total).toBe(30);
  });
});
