const request = require("supertest");
const { app } = require("../app");
const { Item } = require("../models");

const dummyUser = {
  username: "jhon",
  email: "jhon@mail.com",
  password: "jhon12345",
};

const access_token1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqaG9uIiwiZW1haWwiOiJqaG9uQG1haWwuY29tIiwiaWF0IjoxNjkzMDYzNTg4fQ.vl48zlDAtDXNv9n3HSxByBMeQFg3wTJVdqvigPZgzgI";

describe("Item", () => {
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
  test("if status 200, show item", async () => {
    const res = await request(app)
      .get("/items")
      .set("access_token", access_token1);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("item");
  });
  test("if item status 401, not logged in", async () => {
    const res = await request(app).get("/items");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("msg", "Login First");
  });
});
