export interface AddProductInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  inventory: number;
}

export interface AddProductOutputDto {
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  inventory: number;
  createdAt: Date;
  updatedAt: Date;
}
