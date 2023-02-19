import { ProductRepository } from "../repository/product.repository";
import { FindProductUsecase } from "../usecase/find-product/find-product.usecase";
import { FindAllProductsUsecase } from "../usecase/find-all-products/find-all-products.usecase";
import { StoreCatalogFacade } from "../facade/store-catalog.facade";

export class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findProductUsecase = new FindProductUsecase(productRepository);
    const findAllProductsUsecase = new FindAllProductsUsecase(
      productRepository
    );

    const facade = new StoreCatalogFacade({
      findProductUsecase,
      findAllProductsUsecase,
    });

    return facade;
  }
}
