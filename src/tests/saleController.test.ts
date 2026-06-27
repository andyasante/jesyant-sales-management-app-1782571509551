import request from 'supertest';
import { app } from '../server';
import { Sale } from '../models/Sale';
import { User } from '../models/User';
import { Product } from '../models/Product';

jest.mock('../models/Sale');
jest.mock('../models/User');
jest.mock('../models/Product');

describe('Sale Controller', () => {
  let token: string;

  beforeAll(async () => {
    const user = await User.create({ username: 'testuser', password: 'password', role: 'admin' });
    token = 'Bearer ' + user.generateAuthToken();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Sale.deleteMany({});
    await Product.deleteMany({});
  });

  it('should create a sale', async () => {
    const product = await Product.create({ name: 'Aspirin', price: 10, stock: 100 });
    
    const response = await request(app)
      .post('/api/sales')
      .set('Authorization', token)
      .send({
        productId: product._id,
        quantity: 2,
        customerName: 'John Doe',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Sale created successfully');
    expect(Sale.create).toHaveBeenCalledWith(expect.objectContaining({
      productId: product._id,
      quantity: 2,
      customerName: 'John Doe',
    }));
  });

  it('should return 400 if product is out of stock', async () => {
    const product = await Product.create({ name: 'Aspirin', price: 10, stock: 0 });

    const response = await request(app)
      .post('/api/sales')
      .set('Authorization', token)
      .send({
        productId: product._id,
        quantity: 1,
        customerName: 'John Doe',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Product is out of stock');
  });

  it('should return all sales', async () => {
    const response = await request(app)
      .get('/api/sales')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return a specific sale', async () => {
    const sale = await Sale.create({ productId: 'someProductId', quantity: 1, customerName: 'Jane Doe' });

    const response = await request(app)
      .get(`/api/sales/${sale._id}`)
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('customerName', 'Jane Doe');
  });

  it('should return 404 for non-existing sale', async () => {
    const response = await request(app)
      .get('/api/sales/nonExistingId')
      .set('Authorization', token);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Sale not found');
  });
});