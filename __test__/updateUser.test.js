const { User } = require('../models')
const request = require('supertest')
const { app } = require('../app')

const dummyUser = {
    username: 'jhon',
    email: 'jhon@mail.com',
    password: 'jhon12345',
}

const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqaG9uIiwiZW1haWwiOiJqaG9uQG1haWwuY29tIiwiaWF0IjoxNjkzMDYzNTg4fQ.vl48zlDAtDXNv9n3HSxByBMeQFg3wTJVdqvigPZgzgI'

describe('updatte user', () => {
    
    beforeAll(async () => {
        try {
            await User.create({ username: dummyUser.username, email: dummyUser.email, password: dummyUser.password })

        } catch (error) {
            console.log(error);
        }
    })

    afterAll(async () => {
        try {
            await User.destroy({ where: { email: dummyUser.email } }, { truncate: true, cascade: true, restartIdentity: true })
        } catch (error) {
            console.log(error);
        }
    })
    

    test('success update selected skin user', async () => {
        const result = await request(app)
            .put('/update')
            .send({skin: 'classic'})
            .set('access_token', access_token)
            expect(result.status).toEqual(200)
            expect(result.body).toHaveProperty("message", "Success Updated")
    })

    test('success update selected char user', async () => {
        const result = await request(app)
            .put('/update')
            .send({char: 'king'})
            .set('access_token', access_token)
            expect(result.status).toEqual(200)
            expect(result.body).toHaveProperty("message", "Success Updated")
    })

    test('success update selected char and skin', async () => {
        const result = await request(app)
            .put('/update')
            .send({char: 'king', skin: 'legend'})
            .set('access_token', access_token)
            expect(result.status).toEqual(200)
            expect(result.body).toHaveProperty("message", "Success Updated")
    })

    
})