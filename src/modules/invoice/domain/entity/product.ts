import { BaseEntity } from "../../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import { Id } from "../../../@shared/domain/value-object/id.value-object";

type InvoiceProduct = {
  id?: Id;
  name: string;
  salesPrice: number;
};

export class Product extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _salesPrice: number;

  constructor(props: InvoiceProduct) {
    super(props.id);
    this._name = props.name;
    this._salesPrice = props.salesPrice;
  }

  get name(): string {
    return this._name;
  }

  get salesPrice(): number {
    return this._salesPrice;
  }
}
