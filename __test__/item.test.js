const request = require("supertest");
const { app } = require("../app");
const { Item, User } = require("../models");
const item = require('../db/item.json')

const dummyUser = {
  username: 'jhon',
  email: 'jhon@mail.com',
  password: 'jhon12345',
};

const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJqaG9uIiwiZW1haWwiOiJqaG9uQG1haWwuY29tIiwiaWF0IjoxNjkzMTQ2MjUxfQ.QRZw_eXO2TOg4lYzzDEugeqH3xBBtcY6e55djwZPooM'

describe("Item", () => {

  beforeAll(async () => {
    try {
      await User.create({ username: dummyUser.username, email: dummyUser.email, password: dummyUser.password, });
      await Item.bulkCreate(item)
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    try {
      await User.destroy({ truncate: true, cascade: true, restartIdentity: true })
      await Item.destroy({ truncate: true, cascade: true, restartIdentity: true })
    } catch (error) {
      console.log(error);
    }
  });

  test("success get item", async () => {
    const res = await request(app)
      .get("/items")
      .set('access_token', access_token)
    console.log(res.body);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(13);
  });

  test("if item status 401, not logged in", async () => {
    const res = await request(app)
      .get("/items");
    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Login First");
  });

});
