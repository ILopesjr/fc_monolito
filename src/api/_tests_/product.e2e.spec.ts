import { app, sequelize } from '../express';
import request from 'supertest';

describe('ProductController (e2e)', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new product', async () => {
    const product = {
      id: '1',
      name: 'Product 1',
      purchasePrice: 10,
      description: 'Product 1 description',
      stock: 10,
    };

    const response = await request(app)
      .post('/products')
      .send(product)
      .expect(201);
  });
});
