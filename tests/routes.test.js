const request = require('supertest')
const app = require('../server');
let cookies;

describe('Post Register Endpoint', () => {
    it('should create a new user using register endpoint', async () => {
        const res = await request(app)
            .post('/api/register')
            .send({
                firstName: process.env.TEST_FIRSTNAME_REGISTER,
                lastName: process.env.TEST_LASTNAME_REGISTER,
                login: process.env.TEST_EMAIL_REGISTER,
                password: process.env.TEST_PASSWORD_REGISTER,
            })
        expect(res.statusCode).toEqual(201)
    });
});

describe('Post Login Endpoints', () => {
    it('should login user using login endpoint', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                login: process.env.TEST_EMAIL,
                password: process.env.TEST_PASSWORD,
            })
        cookies = res.headers['set-cookie']
        expect(res.statusCode).toEqual(201)
    });
});

describe('Post delete register data entry', () => {
    it('should delete the user data that was used in Register Endpoint', async () => {
        const res = await request(app)
            .post('/api/deleteusertest')
            .send({
                login: process.env.TEST_EMAIL_REGISTER,
            })
        expect(res.statusCode).toEqual(201)
    });
});

describe('Post verifies the user email by sending a code', () => {
    it('should turn the isVerified statment in DB to be true', async () => {
        const res = await request(app)
            .post('/api/verifyemail')
            .send({
                userID: process.env.TEST_USERID,
                code: process.env.DEV_CHEATCODE,
            })
        expect(res.statusCode).toEqual(201)
    });
});

describe('Post send the email with the code to verify the user to recover the password', () => {
    it('should send email verification code for password recovery ', async () => {
        const res = await request(app)
            .post('/api/sendrecoveryemail')
            .send({
                userID: process.env.TEST_USERID,
            })
        expect(res.statusCode).toEqual(200)
    });
});

describe('Post change user password using the correct verification code', () => {
    it('should reset password if forgot using set verification code', async () => {
        const res = await request(app)
            .post('/api/resetpassword')
            .send({
                userID: process.env.TEST_USERID,
                code: process.env.DEV_CHEATCODE,
                newPassword: process.env.TEST_CHANGE_PASSWORD,
            })
        expect(res.statusCode).toEqual(201)
    });
    it('set password back to original password', async () => {
        const res = await request(app)
            .post('/api/resetpassword')
            .send({
                userID: process.env.TEST_USERID,
                code: process.env.DEV_CHEATCODE,
                newPassword: process.env.TEST_PASSWORD,
            })
        expect(res.statusCode).toEqual(201)
    });
});

describe('Post change user password back to ', () => {
    it('should reset password if forgot using set verification code', async () => {
        const res = await request(app)
            .patch('/api/changepassword')
            .set('Cookie', cookies)
            .send({
                userID: process.env.TEST_USERID,
                oldPassword: process.env.TEST_PASSWORD,
                newPassword: process.env.TEST_CHANGE_PASSWORD,
            })
        expect(res.statusCode).toEqual(201)
    });
    it('set password back to original password', async () => {
        const res = await request(app)
            .patch('/api/changepassword')
            .set('Cookie', cookies)
            .send({
                userID: process.env.TEST_USERID,
                oldPassword: process.env.TEST_CHANGE_PASSWORD,
                newPassword: process.env.TEST_PASSWORD,
            })
        expect(res.statusCode).toEqual(201)
    });
});

describe('Get disable the user access token', () => {
    it('should remove the token created when login or registed', async () => {
        const res = await request(app)
            .get('/api/disabletoken')
        expect(res.statusCode).toEqual(201)
    });
});

describe('Post get a users info, such as firstname, email', () => {
    it('should display user info', async () => {
        const res = await request(app)
            .post('/api/getuser')
            .set('Cookie', cookies)
            .send({
                email: process.env.TEST_EMAIL,
            })
        expect(res.statusCode).toEqual(200)
    });
});

describe('Post edit user information only for first & last name and email', () => {
    it('should change the first and last name only', async () => {
        const res = await request(app)
            .post('/api/edituser')
            .set('Cookie', cookies)
            .send({
                userID: process.env.TEST_USERID,
                firstName: process.env.TEST_FIRSTNAME_EDIT,
                lastName: process.env.TEST_LASTNAME_EDIT,
                email: process.env.TEST_EMAIL,
            })
        expect(res.statusCode).toEqual(201)
    });
    it('should change back the first and last name', async () => {
        const res = await request(app)
            .post('/api/edituser')
            .set('Cookie', cookies)
            .send({
                userID: process.env.TEST_USERID,
                firstName: process.env.TEST_FIRSTNAME,
                lastName: process.env.TEST_LASTNAME,
                email: process.env.TEST_EMAIL,
            })
        expect(res.statusCode).toEqual(201)
    });
});

describe('Post turn isVerified back to false', () => {
    it('should turn isVerified back to false', async () => {
        const res = await request(app)
            .post('/api/changefalse')
            .send({
                userID: process.env.TEST_USERID,
            })
        expect(res.statusCode).toEqual(201)
    });
});