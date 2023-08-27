const request = require('supertest')
const { app } = require('../app')
const { User } = require('../models')

const dummyUser = {
    username: 'jhon',
    email: 'jhon@mail.com',
    password: 'jhon12345'
}

describe('register', () => {

    afterAll(async () => {
        try {
            await User.destroy({ where: { email: dummyUser.email } }, { truncate: true, cascade: true, restartIdentity: true })
        } catch (error) {
            console.log(error);
        }
    })

    test('success register', async () => {
        const result = await request(app)
            .post('/register')
            .send({ username: dummyUser.username, email: dummyUser.email, password: dummyUser.password })
        expect(result.status).toEqual(201)
        expect(result.body.msg).toEqual("User Created")
    })

    test('failed register, not uniq email', async () => {
        const result = await request(app)
            .post('/register')
            .send({ username: dummyUser.username, email: dummyUser.email, password: dummyUser.password })
            console.log(result.body);
            expect(result.status).toEqual(400)
        expect(result.body.message).toEqual('email must be unique')
    })

    test('failed register, empty email', async () => {
        const result = await request(app)
            .post('/register')
            .send({ username: dummyUser.username, email: "", password: dummyUser.password })
        expect(result.status).toEqual(400)
        expect(result.body.message).toEqual('Email is required')
    })

    test('failed register, empty email', async () => {
        const result = await request(app)
            .post('/register')
            .send({ username: dummyUser.username, password: dummyUser.password })
        expect(result.status).toEqual(400)
        expect(result.body.message).toEqual('Email is required')
    })

    test('failed register, empty password', async () => {
        const result = await request(app)
            .post('/register')
            .send({ username: dummyUser.username, email: dummyUser.email, password: "" })
        expect(result.status).toEqual(400)
        expect(result.body.message).toEqual('Password is required')
    })

    test('failed register, empty password', async () => {
        const result = await request(app)
            .post('/register')
            .send({ username: dummyUser.username, email: dummyUser.email, })
        expect(result.status).toEqual(400)
        expect(result.body.message).toEqual('Password is required')
    })

    test('failed register, empty password', async () => {
        const result = await request(app)
            .post('/register')
            .send({ username: dummyUser.username, email: dummyUser.email, password: '123' })
        expect(result.status).toEqual(400)
        expect(result.body.message).toEqual('Password length minimal 5 characters')
    })
})