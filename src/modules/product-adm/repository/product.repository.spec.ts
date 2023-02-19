import { Sequelize } from "sequelize-typescript";
import { Product } from "../domain/product.entity";
import { ProductModel } from "./product.model";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ProductRepository } from "./product.repository";

describe("Product Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      inventory: 10,
    };

    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: {
        id: productProps.id.id,
      },
    });

    expect(productProps.id.id).toEqual(productDb.id);
    expect(productProps.name).toEqual(productDb.name);
    expect(productProps.description).toEqual(productDb.description);
    expect(productProps.purchasePrice).toEqual(productDb.purchasePrice);
    expect(productProps.inventory).toEqual(productDb.inventory);
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      inventory: 10,
    };

    const product = new Product(productProps);

    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      inventory: product.inventory,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });

    const productCreated = await productRepository.find("1");

    expect(productProps.id.id).toEqual(productCreated.id.id);
    expect(productProps.name).toEqual(productCreated.name);
    expect(productProps.description).toEqual(productCreated.description);
    expect(productProps.purchasePrice).toEqual(productCreated.purchasePrice);
    expect(productProps.inventory).toEqual(productCreated.inventory);
  });
});
