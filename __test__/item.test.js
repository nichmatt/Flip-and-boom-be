const request = require("supertest");
const { app } = require("../app");
const { Item, User } = require("../models");
const item = require("../db/item.json");

const dummyUser = {
  username: "jhon",
  email: "jhon@mail.com",
  password: "jhon12345",
};

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiamhvbiIsImVtYWlsIjoiamhvbkBtYWlsLmNvbSIsImlhdCI6MTY5MzM3NzcwNH0._PkcC3vf7gkN80H0RzTPS1ABe0FWjo2vn-8xDW6pA90";

describe("Item", () => {
  beforeAll(async () => {
    try {
      await Item.bulkCreate(item);
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
      await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
      await Item.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    } catch (error) {
      console.log(error);
    }
  });

  test("success get item", async () => {
    const res = await request(app)
      .get("/items")
      .set("access_token", access_token);
    console.log(res.body);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(res.body.length);
  });

  test("if item status 401, not logged in", async () => {
    const res = await request(app).get("/items");
    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Login First");
  });
});
