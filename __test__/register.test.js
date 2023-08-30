const request = require("supertest");
const { app } = require("../app");
const { User, Item } = require("../models");
const item = require("../db/item.json");

const dummyUser = {
  username: "akukeren",
  email: "akukeren@mail.com",
  password: "akukeren",
};

describe("register", () => {
  beforeAll(async () => {
    try {
      await Item.bulkCreate(item);
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    try {
      await Item.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
      await User.destroy(
        { where: { email: dummyUser.email } },
        { truncate: true, cascade: true, restartIdentity: true }
      );
    } catch (error) {
      console.log(error);
    }
  });

  test("success register", async () => {
    const result = await request(app).post("/register").send({
      username: dummyUser.username,
      email: dummyUser.email,
      password: dummyUser.password,
    });
    console.log(result, "<<<<<<<<<, 29");
    expect(result.status).toEqual(201);
    expect(result.body.message).toEqual("User Created");
  });

  test("failed register, not uniq email", async () => {
    const result = await request(app).post("/register").send({
      username: dummyUser.username,
      email: dummyUser.email,
      password: dummyUser.password,
    });
    console.log(result.body);
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("email must be unique");
  });

  test("failed register, empty email", async () => {
    const result = await request(app).post("/register").send({
      username: dummyUser.username,
      email: "",
      password: dummyUser.password,
    });
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("Email is required");
  });

  test("failed register, empty email", async () => {
    const result = await request(app)
      .post("/register")
      .send({ username: dummyUser.username, password: dummyUser.password });
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("Email is required");
  });

  test("failed register, empty password", async () => {
    const result = await request(app).post("/register").send({
      username: dummyUser.username,
      email: dummyUser.email,
      password: "",
    });
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("Password is required");
  });

  test("failed register, empty password", async () => {
    const result = await request(app)
      .post("/register")
      .send({ username: dummyUser.username, email: dummyUser.email });
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("Password is required");
  });

  test("failed register, empty password", async () => {
    const result = await request(app).post("/register").send({
      username: dummyUser.username,
      email: dummyUser.email,
      password: "123",
    });
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("Password length minimal 5 characters");
  });
});
