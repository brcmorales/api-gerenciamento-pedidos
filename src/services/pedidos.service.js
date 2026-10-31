// Camada de serviço: regras de negócio e armazenamento em memória.
const pedidos = [];
let proximoId = 1;
const TIPOS = ['entrega', 'retirada'];
const PRIORIDADES = ['baixa', 'normal', 'alta', 'urgente'];
const STATUS = ['recebido', 'em_preparacao', 'enviado', 'entregue', 'cancelado'];
const TRANSICOES = {
  recebido: ['em_preparacao', 'cancelado'],
  em_preparacao: ['enviado', 'cancelado'],
  enviado: ['entregue'],
  entregue: [],
  cancelado: []
};

function erro(status, mensagem) {
  const e = new Error(mensagem);
  e.status = status;
  return e;
}

function criar(dados) {
  if (!dados || typeof dados !== 'object' || Array.isArray(dados))
    throw erro(400, 'O corpo da requisição deve ser um objeto JSON.');
  const cliente = typeof dados.cliente === 'string' ? dados.cliente.trim() : '';
  if (!cliente) throw erro(400, 'O campo cliente é obrigatório e não pode ficar vazio.');
  if (typeof dados.valor !== 'number' || !Number.isFinite(dados.valor) || dados.valor <= 0)
    throw erro(400, 'O campo valor deve ser numérico e maior que zero.');
  if (!TIPOS.includes(dados.tipo))
    throw erro(400, `Tipo inválido. Valores aceitos: ${TIPOS.join(', ')}.`);
  if (!PRIORIDADES.includes(dados.prioridade))
    throw erro(400, `Prioridade inválida. Valores aceitos: ${PRIORIDADES.join(', ')}.`);
  const pedido = {
    id: proximoId++, cliente, tipo: dados.tipo, valor: Number(dados.valor.toFixed(2)),
    prioridade: dados.prioridade, status: 'recebido',
    criadoEm: new Date().toISOString()
  };
  pedidos.push(pedido);
  return pedido;
}

function listar() { return pedidos; }

function buscarPorId(id) {
  if (!/^\d+$/.test(String(id))) throw erro(400, 'O identificador deve ser um número inteiro positivo.');
  const pedido = pedidos.find(p => p.id === Number(id));
  if (!pedido) throw erro(404, 'Pedido não encontrado.');
  return pedido;
}

function atualizarStatus(id, dados) {
  const pedido = buscarPorId(id);
  if (!dados || typeof dados !== 'object' || !STATUS.includes(dados.status))
    throw erro(400, `Status inválido. Valores aceitos: ${STATUS.join(', ')}.`);
  if (!TRANSICOES[pedido.status].includes(dados.status))
    throw erro(400, `Transição não permitida: ${pedido.status} para ${dados.status}.`);
  pedido.status = dados.status;
  pedido.atualizadoEm = new Date().toISOString();
  return pedido;
}

module.exports = { criar, listar, buscarPorId, atualizarStatus };
