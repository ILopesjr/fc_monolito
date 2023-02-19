import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Client } from "./client.entity";
import { Product } from "./product.entity";
import { BaseEntity } from "../../@shared/domain/entity/base.entity";

type OrderProps = {
  id?: Id;
  client: Client;
  products: Array<Product>;
  status?: string;
  invoiceId?: string;
};

export default class Order extends BaseEntity {
  private _client: Client;
  private _products: Array<Product>;
  private _status: string;
  private _invoiceId: string;

  constructor(props: OrderProps) {
    super(props.id);
    this._client = props.client;
    this._products = props.products;
    this._status = props.status || "pending";
    this._invoiceId = props.invoiceId || null;
  }

  get client() {
    return this._client;
  }

  get products() {
    return this._products;
  }

  get status() {
    return this._status;
  }

  get invoiceId() {
    return this._invoiceId;
  }

  public approved(): void {
    this._status = "approved";
  }

  get total(): number {
    return this._products.reduce((total, product) => {
      return total + product.salesPrice;
    }, 0);
  }
}
