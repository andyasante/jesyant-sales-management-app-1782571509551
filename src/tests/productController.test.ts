import request from 'supertest';
import { app } from '../server';
import { Product } from '../models/Product';

jest.mock('../models/Product');

describe('Product Controller', () => {
  const mockProduct = {
    id: 1,
    name: 'Aspirin',
    price: 5.0,
    quantity: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new product', async () => {
    (Product.create as jest.Mock).mockResolvedValue(mockProduct);

    const response = await request(app)
      .post('/api/products')
      .send(mockProduct);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockProduct);
    expect(Product.create).toHaveBeenCalledWith(mockProduct);
  });

  it('should get all products', async () => {
    (Product.findAll as jest.Mock).mockResolvedValue([mockProduct]);

    const response = await request(app).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockProduct]);
    expect(Product.findAll).toHaveBeenCalled();
  });

  it('should get a product by id', async () => {
    (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

    const response = await request(app).get(`/api/products/${mockProduct.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProduct);
    expect(Product.findByPk).toHaveBeenCalledWith(mockProduct.id);
  });

  it('should update a product', async () => {
    const updatedProduct = { ...mockProduct, price: 6.0 };
    (Product.update as jest.Mock).mockResolvedValue([1]);
    (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

    const response = await request(app)
      .put(`/api/products/${mockProduct.id}`)
      .send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedProduct);
    expect(Product.update).toHaveBeenCalledWith(updatedProduct, { where: { id: mockProduct.id } });
  });

  it('should delete a product', async () => {
    (Product.destroy as jest.Mock).mockResolvedValue(1);

    const response = await request(app).delete(`/api/products/${mockProduct.id}`);

    expect(response.status).toBe(204);
    expect(Product.destroy).toHaveBeenCalledWith({ where: { id: mockProduct.id } });
  });

  it('should return 404 if product not found', async () => {
    (Product.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(`/api/products/${mockProduct.id}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Product not found' });
  });
});