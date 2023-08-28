const { User } = require("../models");
const { app } = require("../app");
const request = require("supertest");
const assert = require("assert");

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


describe("profile tes", () => {
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


    test('successs get profile', () => {
        request(app)
            .get('/profile')
            .set('access_token', access_token1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                assert(res.body.username, dummyUser.username)
                assert(res.body.email, dummyUser.email)
            })
    })

    test('successs get profile user 2', () => {
        request(app)
            .get('/profile')
            .set('access_token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                assert(res.body.username, dummyUser.username2)
                assert(res.body.email, dummyUser.email2)
            })
    })

    test('failed get user, invalid access token', async () => {
        const result = await request(app)
            .get('/profile')
            .set('access_token', 'adadasdsdad')
        expect(result.status).toEqual(401)
        expect(result.body.message).toEqual('invalid token')
    })
})
