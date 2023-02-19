import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "./transaction.model";
import { Transaction } from "../domain/transaction";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { TransactionRepository } from "./transaction.repository";
describe("Transaction Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should save a transaction", async () => {
    const transaction = new Transaction({
      id: new Id("1"),
      amount: 100,
      orderId: "1",
    });

    transaction.approve();

    const repository = new TransactionRepository();

    await repository.save(transaction);

    const transactionModel = await TransactionModel.findOne({
      where: { id: "1" },
    });

    expect(transactionModel).toBeDefined();
    expect(transactionModel?.id).toBe("1");
    expect(transactionModel?.orderId).toBe("1");
    expect(transactionModel?.amount).toBe(100);
    expect(transactionModel?.status).toBe("approved");
  });
});
