const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../app'); // 导入你的 Express 应用程序实例

chai.use(chaiHttp);

describe('User Registration', () => {
    it('should register a new user', (done) => {
        chai.request(app)
            .post('/api/register')
            .send({
                firstname: 'John',
                lastname: 'Doe',
                email: 'johndoe@example.com',
                username: 'johndoe',
                password: 'password',
                passwordConfirmation: 'password',
                usertype: 'user'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('msg').equal('success');
                done();
            });
    });

    it('should return error for invalid registration data', (done) => {
        chai.request(app)
            .post('/api/register')
            .send({
                firstname: '',
                lastname: '',
                email: 'invalidemail',
                username: '',
                password: '',
                passwordConfirmation: '',
                usertype: 'user'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('errors');
                done();
            });
    });
});

describe('User Login', () => {
    it('should authenticate a user with valid credentials', (done) => {
        chai.request(app)
            .post('/api/login')
            .send({
                username: 'johndoe',
                password: 'password'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                done();
            });
    });

    it('should return error for invalid login credentials', (done) => {
        chai.request(app)
            .post('/api/login')
            .send({
                username: 'johndoe',
                password: 'wrongpassword'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('msg').equal('username and password does not');
                done();
            });
    });
});

// 还可以添加其他路由的测试...

