import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import InvoiceGateway from '../../gateway/invoice.gateway';
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from './find.invoice.dto';

export default class FindInvoiceUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      total: invoice.total,
      createdAt: invoice.createdAt,
      items: invoice.items.map((item) => {
        return { id: item.id.id, name: item.name, price: item.price };
      }),
    };
  }
}
