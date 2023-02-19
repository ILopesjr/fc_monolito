import { Id } from "../../../@shared/domain/value-object/id.value-object";

import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { UsecaseInterface } from "../../../@shared/usecase/usecase.interface";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.dto";
import { Invoice } from "../../domain/entity/invoice";
import { Product } from "../../domain/entity/product";
import { Address } from "../../domain/value-object/address.value-object";

export class GenerateInvoiceUseCase implements UsecaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const {
      name,
      document,
      street,
      number,
      complement,
      city,
      state,
      zipCode,
      items,
    } = input;

    const invoice = new Invoice({
      name,
      document,
      address: new Address({
        street,
        number,
        complement,
        city,
        state,
        zipCode,
      }),
      items: items.map(
        (item) =>
          new Product({
            id: new Id(item.id),
            name: item.name,
            salesPrice: item.salesPrice,
          })
      ),
    });

    await this.invoiceRepository.create(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((product) => ({
        id: product.id.id,
        name: product.name,
        salesPrice: product.salesPrice,
      })),
      total: invoice.total,
    };
  }
}
