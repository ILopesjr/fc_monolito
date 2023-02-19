import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Invoice } from "../domain/entity/invoice";
import { Product } from "../domain/entity/product";
import { Address } from "../domain/value-object/address.value-object";

interface ProductData {
  id: string;
  name: string;
  salesPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: "invoices",
  timestamps: false,
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: true })
  document: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @Column({ allowNull: false, type: DataType.JSON })
  items: ProductData[];

  @Column({ allowNull: false })
  addressStreet: string;

  @Column({ allowNull: false })
  addressNumber: string;

  @Column({ allowNull: false })
  addressComplement: string;

  @Column({ allowNull: false })
  addressCity: string;

  @Column({ allowNull: false })
  addressState: string;

  @Column({ allowNull: false })
  addressZipCode: string;

  parseToInvoiceDomainEntity(): Invoice {
    return new Invoice({
      id: new Id(this.id),
      name: this.name,
      document: this.document,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      address: new Address({
        street: this.addressStreet,
        number: this.addressNumber,
        complement: this.addressComplement,
        city: this.addressCity,
        state: this.addressState,
        zipCode: this.addressZipCode,
      }),
      items: this.items.map(
        (item) =>
          new Product({
            id: new Id(item.id),
            name: item.name,
            salesPrice: item.salesPrice,
          })
      ),
    });
  }
}
