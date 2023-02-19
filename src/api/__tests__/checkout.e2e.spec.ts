import { app, sequelize } from "../express";
import request from "supertest";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";

describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should do the checkout", async () => {
    try {
      await ClientModel.create({
        id: "1",
        name: "Client 1",
        email: "client@example.com",
        address: "Address 1",
        document: "0000",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await ProductModel.create({
        id: "1",
        name: "My Product",
        description: "Product description",
        purchasePrice: 10,
        salesPrice: 100,
        inventory: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await ProductModel.create({
        id: "2",
        name: "My Product 2",
        description: "Product description",
        purchasePrice: 10,
        salesPrice: 25,
        inventory: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await request(app)
        .post("/checkout")
        .send({
          clientId: "1",
          products: [{ productId: "1" }, { productId: "2" }],
        });

      expect(response.status).toEqual(200);
      expect(response.body.id).toBeDefined();
      expect(response.body.invoiceId).toBeDefined();
      expect(response.body.total).toEqual(125);
      expect(response.body.status).toEqual("approved");
    } catch (error: any) {
      throw new Error(error);
    }
  });
});
