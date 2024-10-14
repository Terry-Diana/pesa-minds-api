import request from 'supertest';
import app from '../app';

describe('Authentication API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'sovasas187@rowplant.com',
        password: 'PasswordPassword123',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Password123',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
  
  // Add more tests for password recovery, check session, etc.
});
