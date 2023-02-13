import express, { Request, Response } from 'express';
import { AddProductFacadeInputDto } from '../../modules/product-adm/facade/product-adm.facade.interface';
import ProductAdmFacadeFactory from '../../modules/product-adm/factory/facade.factory';

export const productsRoute = express.Router();

productsRoute.post('/', async (req: Request, res: Response) => {
  const facade = ProductAdmFacadeFactory.create();

  try {
    const { id, name, description, purchasePrice, stock } = req.body;

    const productDTO: AddProductFacadeInputDto = {
      id,
      name,
      description,
      purchasePrice,
      stock,
    };

    await facade.addProduct(productDTO);

    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});
