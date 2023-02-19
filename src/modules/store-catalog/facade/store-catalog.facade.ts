import { FindProductUsecase } from "../usecase/find-product/find-product.usecase";
import { FindAllProductsUsecase } from "../usecase/find-all-products/find-all-products.usecase";
import {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
  StoreCatalogFacadeInterface,
} from "./store-catalog.facade.interface";

export interface UsecaseProps {
  findProductUsecase: FindProductUsecase;
  findAllProductsUsecase: FindAllProductsUsecase;
}

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findProductUsecase: FindProductUsecase;
  private _findAllProductsUsecase: FindAllProductsUsecase;

  constructor(props: UsecaseProps) {
    this._findAllProductsUsecase = props.findAllProductsUsecase;
    this._findProductUsecase = props.findProductUsecase;
  }

  async find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto> {
    return await this._findProductUsecase.execute(id);
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return await this._findAllProductsUsecase.execute();
  }
}
