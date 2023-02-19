import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import { Id } from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?: Id;
  name: string;
  description: string;
  purchasePrice: number;
  inventory: number;
};

export class Product extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _description: string;
  private _purchasePrice: number;
  private _inventory: number;

  constructor(props: ProductProps) {
    super(props.id);
    this._name = props.name;
    this._description = props.description;
    this._purchasePrice = props.purchasePrice;
    this._inventory = props.inventory;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get purchasePrice(): number {
    return this._purchasePrice;
  }

  get inventory(): number {
    return this._inventory;
  }

  public updateName(name: string): void {
    this._name = name;
  }

  public updateDescription(description: string): void {
    this._description = description;
  }

  public updatePurchasePrice(purchasePrice: number): void {
    this._purchasePrice = purchasePrice;
  }

  public increaseInventory(inventory: number): void {
    this._inventory += inventory;
  }

  public decreaseInventory(inventory: number): void {
    this._inventory -= inventory;
  }
}
