import { Transaction } from "../domain/transaction";

export interface PaymentGateway {
  save(transaction: Transaction): Promise<Transaction>;
}
