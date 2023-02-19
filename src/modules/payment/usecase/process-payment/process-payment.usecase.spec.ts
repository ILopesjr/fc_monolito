import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../../domain/transaction";
import { ProcessPaymentUsecase } from "./process-payment.usecase";

const transactionApprovedMock = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved",
});

const transactionDeclinedMock = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
  status: "declined",
});

const MockRepositoryApproved = () => {
  return {
    save: jest.fn().mockResolvedValue(transactionApprovedMock),
  };
};

const MockRepositoryDeclined = () => {
  return {
    save: jest.fn().mockResolvedValue(transactionDeclinedMock),
  };
};

describe("Process Payment Usecase unit test", () => {
  it("should process payment", async () => {
    const paymentRepository = MockRepositoryApproved();
    const usecase = new ProcessPaymentUsecase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toBeDefined();
    expect(result.status).toBe("approved");
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.transactionId).toBe(transactionApprovedMock.id.id);
    expect(result.orderId).toBe(input.orderId);
    expect(result.amount).toBe(input.amount);
  });

  it("should decline a transaction", async () => {
    const paymentRepository = MockRepositoryDeclined();
    const usecase = new ProcessPaymentUsecase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 50,
    };

    const result = await usecase.execute(input);

    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toBe("declined");
    expect(result.amount).toBe(50);
  });
});
