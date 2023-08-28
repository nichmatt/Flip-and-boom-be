const { app } = require('../app')
const request = require('supertest')
const { User } = require('../models')

const dummyUser = {
    username: "jhon",
    email: "jhon@mail.com",
    password: "jhon12345",
};

const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqaG9uIiwiZW1haWwiOiJqaG9uQG1haWwuY29tIiwiaWF0IjoxNjkzMDYzNTg4fQ.vl48zlDAtDXNv9n3HSxByBMeQFg3wTJVdqvigPZgzgI";

describe('tes topup', () => {

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
            await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
        } catch (error) {
            console.log(error);
        }
    });

    test('success topup', async () => {
        const result = await request(app)
            .post('/user/topup')
            .send({ amount: '16000', topupBalance: 16, status: 'success', orderId: 'Ordre-793-1693204789308' })
            .set('access_token', access_token)
        expect(result.status).toEqual(201)
        expect(result.body.message).toEqual("topup success")
    })

    test('check balance user', async () => {
        const result = await request(app)
            .get('/profile')
            .set('access_token', access_token)
        expect(result.status).toEqual(200)
        expect(result.body.username).toEqual(dummyUser.username)
        expect(result.body.balance).toEqual(26)
    })
    test('fail topup, status cancel', async () => {
        const result = await request(app)
            .post('/user/topup')
            .send({ amount: '16000', topupBalance: 16, status: 'cancel', orderId: 'Ordre-793-1693204789308' })
            .set('access_token', access_token)
        expect(result.status).toEqual(201)
        console.log(result.body);
        expect(result.body.message).toEqual("topup cancel")
    })

    test('fail topup, status error', async () => {
        const result = await request(app)
            .post('/user/topup')
            .send({ amount: '16000', topupBalance: 16, status: 'error', orderId: 'Ordre-793-1693204789308' })
            .set('access_token', access_token)
        expect(result.status).toEqual(400)
        expect(result.body.message).toEqual("transaction failed")
    })

    test('fail topup, invalid orderid ', async () => {
        const result = await request(app)
            .post('/user/topup')
            .send({ amount: '16000', topupBalance: 16, status: 'error', orderId: '' })
            .set('access_token', access_token)
        expect(result.status).toEqual(400)
        expect(result.body.message).toEqual('not valid transaction')
    })

    test('fail topup, status cancel', async () => {
        const result = await request(app)
            .post('/user/topup')
            .send({ amount: '16000', topupBalance: 16, status: 'cancel', orderId: 'Ordre-793-1693204789308' })
            .set('access_token', '')
        expect(result.status).toEqual(401)
        expect(result.body.message).toEqual("Login First")
    })


})