import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { ClientGateway } from "../../gateway/client.gateway";
import { Client } from "../../domain/client.entity";
import {
  AddClientInputDto,
  AddClientOutputDto,
} from "./add-client.usecase.dto";

export class AddClientUsecase {
  constructor(private readonly _clientRepository: ClientGateway) {}

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      address: input.address,
      document: input.document,
    };

    const client = new Client(props);

    await this._clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
