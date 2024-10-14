import request from 'supertest';
import app from '../app';

describe('Budget API', () => {
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

  it('should create a new budget', async () => {
    const response = await request(app)
      .post('/api/budgets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Monthly Expenses',
        amount: 500,
        start_date: '2024-01-01',
        end_date: '2024-01-31',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should list all budgets', async () => {
    const response = await request(app)
      .get('/api/budgets')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  
  // Add more tests for updating and deleting budgets
});
