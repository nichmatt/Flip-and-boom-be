const { app } = require("../app");
const request = require("supertest");
const { News, User } = require("../models");
const news = require("../db/news.json");

const dummyUser = {
  username: "jhon",
  email: "jhon@mail.com",
  password: "jhon12345",
};

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqaG9uIiwiZW1haWwiOiJqaG9uQG1haWwuY29tIiwiaWF0IjoxNjkzMDYzNTg4fQ.vl48zlDAtDXNv9n3HSxByBMeQFg3wTJVdqvigPZgzgI";

describe("news testing", () => {
  beforeAll(async () => {
    try {
      await User.create({
        username: dummyUser.username,
        email: dummyUser.email,
        password: dummyUser.password,
      });
      await News.bulkCreate(news);
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
      await News.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    } catch (error) {
      console.log(error);
    }
  });

  test("success get news", async () => {
    const result = await request(app)
      .get("/news")
      .set("access_token", access_token);
    console.log(result.body);
    console.log(result.body[0]);
    expect(result.status).toEqual(200);
    expect(result.body[0]).toHaveProperty("title");
    expect(result.body[0]).toHaveProperty("author", "Admin");
    expect(result.body[0]).toHaveProperty("text");
  });
});
