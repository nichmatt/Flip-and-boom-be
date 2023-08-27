const { app } = require('../app')
const { User } = require('../models')
const request = require('supertest')

const dummyUser = {
    username: 'jhon',
    email: 'jhon@mail.com',
    password: 'jhon12345',
    username2: 'jajang',
    email2: 'jajang@mail.com',
    password2: 'jajang123'
}

const listUser = require('../db/user.json')

const access_token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqaG9uIiwiZW1haWwiOiJqaG9uQG1haWwuY29tIiwiaWF0IjoxNjkzMDYzNTg4fQ.vl48zlDAtDXNv9n3HSxByBMeQFg3wTJVdqvigPZgzgI'

describe('leaderboard', () => {

    beforeAll(async () => {
        try {
            await User.create({username: dummyUser.username, email: dummyUser.email, password: dummyUser.password})
            await User.bulkCreate(listUser)
        } catch (error) {
            console.log(error);
        }
    })

    afterAll(async () => {
        await User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    })

    test('success get leaderboard', async () => {
        const result = await request(app)
            .get('/leaderboard?difficulty=easy')
            .set('access_token', access_token1)
            expect(result.status).toEqual(200)
            expect(result.body[0]).toHaveProperty("username")
            expect(result.body[0]).toHaveProperty("easyScore")
            expect(result.body[0]).toHaveProperty("createdAt")
    })

    test('fail get leaderboard', async () => {
        const result = await request(app)
            .get('/leaderboard')
            .set('access_token', access_token1)
            expect(result.status).toEqual(400)
            expect(result.body.message).toEqual('difficulty is require in query')
    })
})