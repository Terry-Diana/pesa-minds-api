import request from 'supertest';
import app from '../app';

describe('Income API', () => {
  let token: string;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Password123',
      });
    token = response.body.token;
  });

  it('should add new income', async () => {
    const response = await request(app)
      .post('/api/income')
      .set('Authorization', `Bearer ${token}`)
      .send({
        source: 'Salary',
        amount: 1500,
        date: '2024-01-05',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should list all income records', async () => {
    const response = await request(app)
      .get('/api/income')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  
  // Add more tests for updating and deleting income
});
