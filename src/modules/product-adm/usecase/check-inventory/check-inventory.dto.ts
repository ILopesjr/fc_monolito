export interface CheckInventoryInputDto {
  productId: string;
}

export interface CheckInventoryOutputDto {
  productId: string;
  inventory: number;
}
