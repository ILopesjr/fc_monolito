import Id from '../../../@shared/domain/value-object/id.value-object';
import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import Address from '../../domain/address';
import Invoice from '../../domain/invoice';
import Product from '../../domain/product';
import InvoiceGateway from '../../gateway/invoice.gateway';
import {
  GenaerateInvoiceUseCaseInputDTO,
  GenerateInvoiceUseCaseOutputDTO,
} from './generate.invoice.dto';

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: GenaerateInvoiceUseCaseInputDTO
  ): Promise<GenerateInvoiceUseCaseOutputDTO> {
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
      items: input.items.map(
        (item) =>
          new Product({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
    });

    const generate = await this.invoiceRepository.generate(invoice);

    return {
      id: generate.id.id,
      name: generate.name,
      document: generate.document,
      street: generate.address.street,
      number: generate.address.number,
      complement: generate.address.complement,
      city: generate.address.city,
      state: generate.address.state,
      zipCode: generate.address.zipCode,
      items: generate.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: generate.total,
    };
  }
}
