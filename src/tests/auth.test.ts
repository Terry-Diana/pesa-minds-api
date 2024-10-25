import request from "supertest";
import app from "../app";
import { mockCaptcha } from "./mocks/mockCaptcha";

describe("Authentication API", () => {
  beforeAll(() => {
    // Override the app's CAPTCHA middleware for testing
    app.use("/api/auth/signup", mockCaptcha);
    app.use("/api/auth/login", mockCaptcha);
  });

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        email: "testuser@example.com",
        password: "PasswordPassword123",
        answer: "mockAnswer",
        hash: "mockHash",
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
  });

  it("should login a user", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
        password: "PasswordPassword123",
        answer: "mockAnswer",
        hash: "mockHash",
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
