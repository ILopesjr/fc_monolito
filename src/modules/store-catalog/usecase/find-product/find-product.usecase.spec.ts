import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { FindProductUsecase } from "./find-product.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  salesPrice: 100,
});

const mockRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn().mockResolvedValue(product),
  };
};

describe("Find a product usecase unit test", () => {
  it("should find a product", async () => {
    const productRepository = mockRepository();
    const usecase = new FindProductUsecase(productRepository);

    const result = await usecase.execute({ id: "1" });

    expect(productRepository.find).toHaveBeenCalled();
    expect(result.id).toBe(product.id.id);
    expect(result.name).toBe(product.name);
    expect(result.description).toBe(product.description);
    expect(result.salesPrice).toBe(product.salesPrice);
  });
});
