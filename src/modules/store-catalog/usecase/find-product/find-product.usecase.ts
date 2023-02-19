import { ProductGateway } from "../../gateway/product.gateway";
import { UsecaseInterface } from "../../../@shared/usecase/usecase.interface";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export class FindProductUsecase implements UsecaseInterface {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}
