import request from 'supertest';
import { app } from '../server';
import { User } from '../models/User';

jest.mock('../models/User');

describe('User Controller', () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
    password: 'testpassword',
    role: 'admin',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    (User.create as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        password: 'testpassword',
        role: 'admin',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      password: expect.any(String),
      role: 'admin',
    });
  });

  it('should return a user by ID', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get('/api/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(User.findByPk).toHaveBeenCalledWith(1);
  });

  it('should update a user', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);
    (mockUser.save as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .put('/api/users/1')
      .send({ username: 'updateduser' });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('updateduser');
    expect(mockUser.username).toBe('updateduser');
  });

  it('should delete a user', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);
    (mockUser.destroy as jest.Mock).mockResolvedValue(undefined);

    const response = await request(app).delete('/api/users/1');

    expect(response.status).toBe(204);
    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(mockUser.destroy).toHaveBeenCalled();
  });

  it('should return 404 if user not found', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/api/users/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});