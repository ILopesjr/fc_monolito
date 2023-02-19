import express, { Request, Response } from "express";

import { FindInvoiceFacadeInputDto } from "../../modules/invoice/facade/invoice.facade.interface";
import { InvoiceFacadeFactory } from "../../modules/invoice/factory/invoice-facade.factory";

export const invoicesRoute = express.Router();

invoicesRoute.get("/:id", async (request: Request, response: Response) => {
  const facade = InvoiceFacadeFactory.create();
  try {
    const input: FindInvoiceFacadeInputDto = { id: request.params.id };
    const invoice = await facade.findInvoice(input);
    response.status(200).json(invoice);
  } catch (error) {
    response.status(400).send(error);
  }
});
