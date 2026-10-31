const request = require('supertest');
const app = require('../src/app');

describe('API de gerenciamento de pedidos', () => {
  test('cria pedido válido com HTTP 201', async () => {
    const r = await request(app).post('/pedidos').send({
      cliente: 'Carlos Silva', tipo: 'entrega', valor: 350, prioridade: 'normal'
    });
    expect(r.status).toBe(201);
    expect(r.body).toHaveProperty('id');
    expect(r.body.status).toBe('recebido');
  });

  test('rejeita cliente vazio com HTTP 400', async () => {
    const r = await request(app).post('/pedidos').send({
      cliente: '   ', tipo: 'entrega', valor: 50, prioridade: 'normal'
    });
    expect(r.status).toBe(400);
  });

  test('lista pedidos com HTTP 200', async () => {
    const r = await request(app).get('/pedidos');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
  });

  test('retorna 404 para pedido inexistente', async () => {
    const r = await request(app).get('/pedidos/999999');
    expect(r.status).toBe(404);
  });

  test('atualiza status de pedido válido', async () => {
    const criado = await request(app).post('/pedidos').send({
      cliente: 'Ana Souza', tipo: 'retirada', valor: 42.5, prioridade: 'alta'
    });
    const r = await request(app).patch(`/pedidos/${criado.body.id}/status`).send({status:'em_preparacao'});
    expect(r.status).toBe(200);
    expect(r.body.status).toBe('em_preparacao');
  });
});
