const request = require("supertest");
const { app } = require("../app");
const { Item, User } = require("../models");
const items = require("../db/item.json");

const dummyUser = {
  username: "jhon",
  email: "jhon@mail.com",
  password: "jhon12345",
  username2: "jajang",
  email2: "jajang@mail.com",
  password2: "jajang123",
};

const access_token1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqaG9uIiwiZW1haWwiOiJqaG9uQG1haWwuY29tIiwiaWF0IjoxNjkzMDYzNTg4fQ.vl48zlDAtDXNv9n3HSxByBMeQFg3wTJVdqvigPZgzgI";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJqYWphbmciLCJlbWFpbCI6ImphamFuZ0BtYWlsLmNvbSIsImlhdCI6MTY5MzEwMDkyNH0.5qJv9Tq31zZbRTBx9brPBfabyVX6jaDavt3TYq8Xq_0";

describe("BuyItem", () => {
  beforeAll(async () => {
    try {
      await Item.bulkCreate(items);
      await User.create({
        username: dummyUser.username,
        email: dummyUser.email,
        password: dummyUser.password,
        balance: 300,
      });
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    await User.destroy({
      truncate: true,
      force: true,
      restartIdentity: true,
      cascade: true,
    });
    await Item.destroy({
      truncate: true,
      force: true,
      restartIdentity: true,
      cascade: true,
    });
  });

  test("success item buyed", async () => {
    const result = await request(app)
      .post("/buyItem")
      .send({ ItemId: 1 })
      .set("access_token", access_token1);
    expect(result.status).toBe(201);
    expect(result.body.message).toEqual("Success Buy Item");
  });

  test("failed item buyed, balance not enough", async () => {
    const result = await request(app)
      .post("/buyItem")
      .send({ ItemId: 3 })
      .set("access_token", access_token1);
    expect(result.status).toBe(400);
    expect(result.body.message).toEqual("Not enough balance");
  });
});
