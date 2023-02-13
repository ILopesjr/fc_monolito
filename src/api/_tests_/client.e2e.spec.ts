import { app, sequelize } from '../express';
import request from 'supertest';

describe('Client Controller (e2e)', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new client', async () => {
    const res = await request(app).post('/clients').send({
      id: '1',
      name: 'Client 1',
      email: 'client1@email.com',
      document: '12345678910',
      street: 'Street 1',
      complement: 'Complement 1',
      number: '1',
      city: 'City 1',
      state: 'State 1',
      zipCode: '12345678',
    });

    expect(res.status).toEqual(201);
  });
});
