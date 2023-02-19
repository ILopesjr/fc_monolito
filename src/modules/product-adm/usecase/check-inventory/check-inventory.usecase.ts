import { ProductGateway } from "../../gateway/product.gateway";
import {
  CheckInventoryOutputDto,
  CheckInventoryInputDto,
} from "./check-inventory.dto";

export class CheckInventoryUsecase {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(
    input: CheckInventoryInputDto
  ): Promise<CheckInventoryOutputDto> {
    const product = await this.productRepository.find(input.productId);

    return {
      productId: product.id.id,
      inventory: product.inventory,
    };
  }
}
