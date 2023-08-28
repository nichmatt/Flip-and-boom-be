const request = require("supertest");
const { app } = require("../app");
const { User } = require("../models");

const dummyUser = {
  username: "jhon",
  email: "jhon@mail.com",
  password: "jhon12345",
};


describe("login", () => {
  beforeAll(async () => {
    try {
      await User.create({
        username: dummyUser.username,
        email: dummyUser.email,
        password: dummyUser.password,
      });
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    try {
      await User.destroy(
        { where: { email: dummyUser.email } },
        { truncate: true, cascade: true, restartIdentity: true }
      );
    } catch (error) {
      console.log(error);
    }
  });

  test("success login", async () => {
    const result = await request(app)
      .post("/login")
      .send({ email: dummyUser.email, password: dummyUser.password });
    expect(result.status).toEqual(200);
    expect(result.body.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("access_token");
  });

  test("failed login, wrong password", async () => {
    const result = await request(app)
      .post("/login")
      .send({ email: dummyUser.email, password: "babang ganteng" });
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("Wrong password");
  });

  test("failed login, not register email", async () => {
    const result = await request(app)
      .post("/login")
      .send({ email: "babang@mail.com", password: "babang ganteng" });
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("Invalid Email/Password");
  });

  test("failed login, email empty", async () => {
    const result = await request(app)
      .post("/login")
      .send({ email: "", password: "babang ganteng" });
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("Invalid Email/Password");
  });

  test("failed login, email null", async () => {
    const result = await request(app)
      .post("/login")
      .send({ password: "babang ganteng" });
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("Invalid Email/Password");
  });

  test("failed login, passoword empty", async () => {
    const result = await request(app)
      .post("/login")
      .send({ email: "babang@mail.com", password: "" });
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("Invalid Email/Password");
  });

  test("failed login, passoword null", async () => {
    const result = await request(app)
      .post("/login")
      .send({ email: "babang@mail.com" });
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("Invalid Email/Password");
  });
});
