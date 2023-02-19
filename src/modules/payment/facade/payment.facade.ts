import { UsecaseInterface } from "../../@shared/usecase/usecase.interface";
import {
  PaymentFacadeInputDto,
  PaymentFacadeInterface,
  PaymentFacadeOutputDto,
} from "./facade.interface";

export class PaymentFacade implements PaymentFacadeInterface {
  constructor(private readonly processPaymentUsecase: UsecaseInterface) {}

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUsecase.execute(input);
  }
}
