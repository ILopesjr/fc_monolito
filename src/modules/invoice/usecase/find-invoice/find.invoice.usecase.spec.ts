import Id from '../../../@shared/domain/value-object/id.value-object';
import Address from '../../domain/address';
import Invoice from '../../domain/invoice';
import Product from '../../domain/product';
import FindInvoiceUseCase from './find.invoice.usecase';

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
  generate: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
});

describe('Find invoice usacase unit test', () => {
  it('should find invoice', async () => {
    const invoiceRepository = MockRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
    const input = {
      id: '1',
    };

    const result = await findInvoiceUseCase.execute(input);

    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.id).toBe(input.id);

    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);

    expect(result.items[0].id).toBe(invoice.items[0].id.id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[1].id).toBe(invoice.items[1].id.id);
    expect(result.items[1].name).toBe(invoice.items[1].name);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.total).toBe(30);
  });
});
