import express from 'express';
import { productsRoute } from './routes/product.route';
import { clientRoute } from './routes/client.route';
// import { checkoutRoute } from "./routes/checkout.route";
import { invoicesRoute } from './routes/invoice.route';
import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../modules/client-adm/repository/client.model';
import TransactionModel from '../modules/payment/repository/transaction.model';
import { ProductModel } from '../modules/product-adm/repository/product.model';
import StoreCatalogProductModel from '../modules/store-catalog/repository/product.model';
import { OrderModel } from '../modules/checkout/repository/order.model';
import InvoiceModel from '../modules/invoice/repository/invoice.model';
import InvoiceAddressModel from '../modules/invoice/repository/invoice.address.model';
import InvoiceProductModel from '../modules/invoice/repository/invoice.product.model';

const app = express();
app.use(express.json());

let sequelize: Sequelize;

app.use('/products', productsRoute);
app.use('/clients', clientRoute);
// app.use("/checkout", checkoutRoute);
app.use('/invoice', invoicesRoute);

async function initDB() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });

  sequelize.addModels([
    OrderModel,
    ClientModel,
    InvoiceModel,
    InvoiceAddressModel,
    InvoiceProductModel,
    TransactionModel,
    StoreCatalogProductModel,
    ProductModel,
  ]);

  await sequelize.sync();
}

initDB();

export { app, sequelize };
