import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { BaseEntity } from "../../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import { Address } from "../value-object/address.value-object";
import { Product } from "./product";

type TransactionProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: Product[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: Product[];

  constructor(props: TransactionProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;

    this.validate();
  }

  private validate(): void {
    if (this._items.length <= 0) {
      throw new Error("Items must be greater than 0");
    }
  }

  get name() {
    return this._name;
  }

  get document() {
    return this._document;
  }

  get address() {
    return this._address;
  }

  get items() {
    return this._items;
  }

  get total() {
    return this._items.reduce((total, item) => total + item.salesPrice, 0);
  }

  get totalItems() {
    return this._items.length;
  }
}
