import { UsecaseInterface } from "../../@shared/usecase/usecase.interface";
import {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
  InvoiceFacadeInterface,
} from "./invoice.facade.interface";

export interface UseCaseProps {
  generateUseCase: UsecaseInterface;
  findUseCase: UsecaseInterface;
}

export class InvoiceFacade implements InvoiceFacadeInterface {
  private _generateUseCase: UsecaseInterface;
  private _findUseCase: UsecaseInterface;

  constructor(useCasesProps: UseCaseProps) {
    this._generateUseCase = useCasesProps.generateUseCase;
    this._findUseCase = useCasesProps.findUseCase;
  }

  async generateInvoice(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this._generateUseCase.execute(input);
  }

  async findInvoice(
    input: FindInvoiceFacadeInputDto
  ): Promise<FindInvoiceFacadeOutputDto> {
    return await this._findUseCase.execute(input);
  }
}
