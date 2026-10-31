const service = require('../services/pedidos.service');

exports.criar = (req, res, next) => {
  try {
    const pedido = service.criar(req.body);
    return res.status(201).json(pedido);
  } catch (err) { next(err); }
};

exports.listar = (req, res, next) => {
  try { return res.status(200).json(service.listar()); }
  catch (err) { next(err); }
};

exports.buscarPorId = (req, res, next) => {
  try { return res.status(200).json(service.buscarPorId(req.params.id)); }
  catch (err) { next(err); }
};

exports.atualizarStatus = (req, res, next) => {
  try {
    return res.status(200).json(service.atualizarStatus(req.params.id, req.body));
  } catch (err) { next(err); }
};
