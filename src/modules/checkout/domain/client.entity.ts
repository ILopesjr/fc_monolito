import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import { Id } from "../../@shared/domain/value-object/id.value-object";

type ClientProps = {
  id?: Id;
  name: string;
  document?: string;
  email: string;
  address: string;
};

export class Client extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _address: string;
  private _document: string;

  constructor(props: ClientProps) {
    super(props.id);
    this._name = props.name;
    this._email = props.email;
    this._address = props.address;
    this._document = props.document;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get address() {
    return this._address;
  }

  get document() {
    return this._document;
  }
}
