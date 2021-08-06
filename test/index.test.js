const supertest = require('supertest');
require('dotenv').config();
const app = require('../server');

const api = supertest(app);
const testValues = require('./testValues');
const { validNewEventsTest } = testValues;
const { invalidNewEventsTest } = testValues;
const { invalidLoginTest } = testValues;
const { validLoginTest } = testValues

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

test('events are returned as json', async () => {
    await api
        .get('/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

test('events featured are returned as json', async () => {
    await api
        .get('/featured')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

test('events detail by Id with an INVALID Id', async () => {
    await api
        .get('/event/8907123h123')
        .expect(404)
        .expect('Content-Type', /application\/json/)
})

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

test('events detail by Id with a VALID Id', async () => {
    await api
        .get('/event/610c743e71d15d2de0f50be2')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


test('events detail by Id WITHOUT Id', async () => {
    await api
        .get('/event/')
        .expect(404)
        .expect('Content-Type', /text\/html/)
})

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

test('event SHARED with a INVALID id', async () => {
    await api
        .get('/shared/123123123')
        .expect(404)
        .expect('Content-Type', /application\/json/)
})

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

test('event SHARED with a VALID id', async () => {
    await api
        .get('/shared/610c6ba89ef77313583b6c82')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

describe('POST /events', () => {
    test.each(validNewEventsTest)('Add a new event on DB', async (newEvent) => {
        const response = await api
            .post('/events')
            .send(newEvent)
            .expect(200);
        expect(response.body.title).not.toBe(null);
    });

    test.each(invalidNewEventsTest)('Add a new envent with null or invalid data', async (newEvent) => {
        const response = await api.post('/events')
            .send(newEvent)
            .expect(400);
        expect(response.body.errors).not.toBe(null);
    });
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

describe('POST /login', () => {
    test.each(validLoginTest)('Login', async (login) => {
        const response = await api
            .post('/login')
            .send(login)
            .expect(200);
        expect(response.body.token).not.toBe(null);
    });

    test.each(invalidLoginTest)('try to login with null or invalid data', async (login) => {
        const response = await api
            .post('/login')
            .send(login)
            .expect(400);
        expect(response.body.errors).not.toBe(null);
    });
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

describe('POST /login try to GET A LIST of EVENTS WITH AUTHORIZATION token', () => {
    test.each(validLoginTest)('try to GET A LIST of EVENTS WITH AUTHORIZATION token', async (login) => {
        let token = null;

        const response = await api
            .post('/login')
            .send(login)
            .set({ 'Content-Type': 'application/json' })

        token = `${response.body.token}`;
        console.log(token)
        await api
            .get('/events')
            .set({ 'Content-Type': 'application/json', 'authorization': token })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


describe('POST /login', () => {

    test.each(invalidLoginTest)('try to login with null or invalid data', async (login) => {
        let token = null;

        const response = await api
            .post('/login')
            .send(login)
            .set({ 'Content-Type': 'application/json' })

        token = `Bearer ${response.body.token}`;

        await api
            .get('/events')
            .set({ 'Content-Type': 'application/json', 'Authorization': token })
            .expect(400)
            .expect('Content-Type', /application\/json/)
    });
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////