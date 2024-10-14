import request from 'supertest';
import app from '../app';

describe('Expense API', () => {
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

  it('should add a new expense', async () => {
    const response = await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        budget_id: 'some-budget-id',
        category: 'Food',
        amount: 50,
        description: 'Groceries',
        date: '2024-01-05',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should list all expenses', async () => {
    const response = await request(app)
      .get('/api/expenses')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Add more tests for updating and deleting expenses
});
