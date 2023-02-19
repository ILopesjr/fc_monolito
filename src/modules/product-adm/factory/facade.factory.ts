import { ProductAdmFacade } from "../facade/product-adm.facade";
import { ProductRepository } from "../repository/product.repository";
import { AddProductUsecase } from "../usecase/add-product/add-product.usecase";
import { CheckInventoryUsecase } from "../usecase/check-inventory/check-inventory.usecase";

export class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const addProductUsecase = new AddProductUsecase(productRepository);
    const checkInventoryUsecase = new CheckInventoryUsecase(productRepository);
    const productFacade = new ProductAdmFacade({
      addProductUsecase: addProductUsecase,
      checkInventoryUsecase: checkInventoryUsecase,
    });

    return productFacade;
  }
}
