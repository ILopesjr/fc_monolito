import express from 'express';
import { productsRoute } from "./routes/product.route";
// import { clientsRoute } from "./routes/client.route";
// import { checkoutRoute } from "./routes/checkout.route";
// import { invoicesRoute } from "./routes/invoice.route";
import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../modules/client-adm/repository/client.model';
import InvoiceModel from '../modules/invoice/repository/invoice.model';
import TransactionModel from '../modules/payment/repository/transaction.model';
import { ProductModel } from '../modules/product-adm/repository/product.model';
import StoreCatalogProductModel from '../modules/store-catalog/repository/product.model';
import { OrderModel } from '../modules/checkout/repository/order.model';

const app = express();
app.use(express.json());

let sequelize: Sequelize;

app.use("/products", productsRoute);
// app.use("/clients", clientsRoute);
// app.use("/checkout", checkoutRoute);
// app.use("/invoice", invoicesRoute);

async function initDB() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });

  sequelize.addModels([
    // OrderModel,
    // ClientModel,
    // InvoiceModel,
    // TransactionModel,
    // StoreCatalogProductModel,
    ProductModel,
  ]);

  await sequelize.sync();
}

initDB();

export { app, sequelize };
