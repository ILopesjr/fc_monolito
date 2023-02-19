import { Invoice } from "../domain/entity/invoice";

export interface InvoiceGateway {
  find(id: string): Promise<Invoice>;
  create(invoice: Invoice): Promise<Invoice>;
}
