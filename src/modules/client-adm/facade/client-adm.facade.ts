import { UsecaseInterface } from "../../@shared/usecase/usecase.interface";
import {
  AddClientFacadeInputDto,
  ClientAdmFacadeInterface,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from "./client-adm.facade.interface";

export interface UsecaseProps {
  findClientUsecase: UsecaseInterface;
  addClientUsecase: UsecaseInterface;
}

export class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addClientUsecase: UsecaseInterface;
  private _findClientUsecase: UsecaseInterface;

  constructor(props: UsecaseProps) {
    this._addClientUsecase = props.addClientUsecase;
    this._findClientUsecase = props.findClientUsecase;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addClientUsecase.execute(input);
  }

  async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto> {
    return await this._findClientUsecase.execute(input);
  }
}
