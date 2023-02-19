import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { CheckInventoryUsecase } from "./check-inventory.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Description 1",
  purchasePrice: 100,
  inventory: 10,
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe("Check Inventory usecase unit test", () => {
  it("should get inventory of a product", async () => {
    const productRepository = MockRepository();
    const usecase = new CheckInventoryUsecase(productRepository);
    const input = {
      productId: "1",
    };

    const result = await usecase.execute(input);
    expect(productRepository.find).toHaveBeenCalled();
    expect(result.productId).toBe("1");
    expect(result.inventory).toBe(10);
  });
});
