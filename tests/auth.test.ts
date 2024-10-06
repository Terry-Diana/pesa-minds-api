import request from 'supertest';
import app from '../src/app';
import { Server } from 'http';  

describe('Auth API', () => {
  let server: Server;
  let port: number;

  beforeAll((done) => {
    server = app.listen(0, () => {
      port = (server.address() as any).port;  
      console.log(`Test server running on port ${port}`);
      done(); 
    });
  });

  afterAll((done) => {
    server.close(done);  
  });

  it('should register a user successfully', async () => {
    const res = await request(app)
      .post('/auth/register')
      .set('Host', `localhost:${port}`)  
      .send({
        email: 'sovasas187@rowplant.com',
        password: 'Password123',
      });
  
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user).toHaveProperty('email', 'sovasas187@rowplant.com');
  }, 10000);  
  

  it('should fail if email is missing', async () => {
    const res = await request(app)
      .post('/auth/register')
      .set('Host', `localhost:${port}`)  
      .send({
        password: 'Password123',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Email and password are required');
  });

  it('should fail if password is missing', async () => {
    const res = await request(app)
      .post('/auth/register')
      .set('Host', `localhost:${port}`)  
      .send({
        email: 'test2@example.com',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Email and password are required');
  });
});
