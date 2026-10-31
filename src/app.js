const express = require('express');
const pedidosRoutes = require('./routes/pedidos.routes');
const { tratarErro } = require('./middlewares/erro.middleware');

const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/pedidos', pedidosRoutes);
app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada.' }));
app.use(tratarErro);
module.exports = app;
