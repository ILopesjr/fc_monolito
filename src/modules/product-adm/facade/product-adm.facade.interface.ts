export interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  inventory: number;
}

export interface CheckInventoryFacadeInputDto {
  productId: string;
}

export interface CheckInventoryFacadeOutputDto {
  productId: string;
  inventory: number;
}

export interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInputDto): Promise<void>;
  checkInventory(
    input: CheckInventoryFacadeInputDto
  ): Promise<CheckInventoryFacadeOutputDto>;
}
