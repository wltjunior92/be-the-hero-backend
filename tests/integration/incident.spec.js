const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('It should be able to create a new Incident', async () => {
    const { body: ong } = await request(app)
      .post('/ongs')
      .send({
        name: 'Teste',
        email: 'contato@email.com',
        whatsapp: '61895487547',
        city: 'Cidade Teste',
        uf: 'UF',
      });

    const response = await request(app)
      .post('/incidents')
      .set('Authorization', ong.id)
      .send({
        title: 'Incidente Teste',
        description: "Descrição Teste",
        value: 120
      })

    expect(response.body).toHaveProperty('id');
  });
});