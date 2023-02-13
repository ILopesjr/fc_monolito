import express, { Request, Response } from 'express';
import { AddClientFacadeInputDto } from '../../modules/client-adm/facade/client-adm.facade.interface';
import ClientAdmFacadeFactory from '../../modules/client-adm/factory/client-adm.facade.factory';

export const clientRoute = express.Router();

clientRoute.post('/', async (req: Request, res: Response) => {
  const facade = ClientAdmFacadeFactory.create();

  try {
    const {
      id,
      name,
      email,
      document,
      street,
      complement,
      number,
      city,
      state,
      zipCode,
    } = req.body;

    const clientDTO: AddClientFacadeInputDto = {
      id,
      name,
      email,
      document,
      street,
      complement,
      number,
      city,
      state,
      zipCode,
    };

    await facade.add(clientDTO);

    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});
