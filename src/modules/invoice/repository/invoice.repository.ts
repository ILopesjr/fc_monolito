import { Invoice } from "../domain/entity/invoice";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
export class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findByPk(id);

    return invoice.parseToInvoiceDomainEntity();
  }

  async create(invoice: Invoice): Promise<Invoice> {
    const { id, name, document, createdAt, updatedAt, items, address } =
      invoice;

    const { street, number, complement, city, state, zipCode } = address;

    const invoiceCreated = await InvoiceModel.create({
      id: id.id,
      name,
      document,
      createdAt,
      updatedAt,
      items,
      addressStreet: street,
      addressNumber: number,
      addressComplement: complement,
      addressCity: city,
      addressState: state,
      addressZipCode: zipCode,
    });

    return invoiceCreated.parseToInvoiceDomainEntity();
  }
}
