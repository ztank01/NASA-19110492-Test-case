const app = require('../../app');

const request = require('supertest');

describe('planets', () => {
    it('return status code 200 when successfuly get list of planets', async () => {
        const res = await request(app).get('/planets');

        expect(res.statusCode).toEqual(200);
    });
});

describe('launches', () => {
    it('return status code 200 when successfuly get list of launch', async () => {
        const res = await request(app).get('/launches');

        expect(res.statusCode).toEqual(200);
    });

    it('return status code 201 when successfuly create new launch', async () => {
        const res = await request(app).post('/launches').send({
            mission: "ZTM155",
            rocket: "ZTM Experimental IS1",
            target: "Kepler-186 f",
            launchDate: "January 17, 2030"
        });

        expect(res.statusCode).toEqual(201);
    });

    it('return status code 400 and notify missing required launch property', async () => {
        const res = await request(app).post('/launches').send({
            mission: "ZTM155",
            rocket: "ZTM Experimental IS1",
            target: "",
            launchDate: "January 17, 2030"
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            error: "Missing required launch property",
        });
    });

    it('return status code 400 and notify invalid launch date', async () => {
        const res = await request(app).post('/launches').send({
            mission: "ZTM155",
            rocket: "ZTM Experimental IS1",
            target: "Kepler-186 f",
            launchDate: "NASA-19110492"
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            error: "Invalid launch date",
        });
    });

    it('return status code 200 when successfuly delete launch from list', async () => {
        const res = await request(app).delete('/launches/100');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            flightNumber: 100,
            mission: 'Kepler Exploration X',
            rocket: 'Explorer IS1',
            launchDate: "2030-12-26T17:00:00.000Z",
            target: 'Kepler-442 b',
            customer: ['ZTM', 'NASA'],
            upcoming: false,
            success: false,
        });
    });
    
    it('return status code 404 and notify launch not found', async () => {
        const res = await request(app).delete('/launches/999');

        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({
            error: "Launch not found"
        });
    });
});