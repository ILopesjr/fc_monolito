import { UsecaseInterface } from "../../../@shared/usecase/usecase.interface";
import { Product } from "../../domain/product.entity";
import { ProductGateway } from "../../gateway/product.gateway";

export class FindAllProductsUsecase implements UsecaseInterface {
  constructor(private readonly productRepository: ProductGateway) {}

  public async execute(): Promise<any> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product: Product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
