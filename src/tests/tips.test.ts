import request from 'supertest';
import app from '../app';

describe('Tips API', () => {
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

  it('should fetch relevant tips', async () => {
    const response = await request(app)
      .get('/api/tips')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should add custom tips', async () => {
    const response = await request(app)
      .post('/api/tips')
      .set('Authorization', `Bearer ${token}`)
      .send({
        message: 'Try to save more this month!',
        trigger_type: 'budget_exceed',
        trigger_value: 100,
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
  
  // Add more tests for fetching and managing tips
});
