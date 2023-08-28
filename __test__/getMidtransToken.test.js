const request = require("supertest");
const { app } = require("../app");
const { User } = require("../models");

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

describe("midtrans tes", () => {
  beforeAll(async () => {
    try {
      await User.create({
        username: dummyUser.username,
        email: dummyUser.email,
        password: dummyUser.password,
      });
      await User.create({
        username: dummyUser.username2,
        email: dummyUser.email2,
        password: dummyUser.password2,
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
      await User.destroy(
        { where: { email: dummyUser.email2 } },
        { truncate: true, cascade: true, restartIdentity: true }
      );
    } catch (error) {
      console.log(error);
    }
  });

  test("success generate token", async () => {
    const result = await request(app)
      .post("/user/token-midtrans")
      .set("access_token", access_token1)
      .send({ amount: 2000 });
    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty("token");
    expect(result.body).toHaveProperty("redirect_url");
  });

  test("failed generate token, require amount", async () => {
    const result = await request(app)
      .post("/user/token-midtrans")
      .set("access_token", access_token1);
    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual("failed, amount is require");
  });

  test("failed generate token, invalid access token", async () => {
    const result = await request(app)
      .post("/user/token-midtrans")
      .send({ amount: 2000 })
      .set("access_token", "jasbdasbdhas");
    expect(result.status).toEqual(401);
    expect(result.body.message).toEqual("invalid token");
  });

  test("failed generate token, invalid access token", async () => {
    const result = await request(app)
      .post("/user/token-midtrans")
      .send({ amount: 2000 });
    expect(result.status).toEqual(401);
    expect(result.body.message).toEqual("Login First");
  });
});
