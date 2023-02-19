import { Transaction } from "../domain/transaction";
import { PaymentGateway } from "../gateway/payment.gateway";
import { TransactionModel } from "./transaction.model";

export class TransactionRepository implements PaymentGateway {
  async save(transaction: Transaction): Promise<Transaction> {
    await TransactionModel.create({
      id: transaction.id.id,
      orderId: transaction.orderId,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    });

    return transaction;
  }
}
