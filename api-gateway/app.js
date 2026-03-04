import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/status', (req, res) => {
    res.json({ message: 'API Gateway está online!' });
});

app.use(createProxyMiddleware({
    pathFilter: '/clientes',
    target: process.env.CLIENTE_SERVICE_URL,
    changeOrigin: true,
}));

app.use(createProxyMiddleware({
    pathFilter: '/pedidos',
    target: process.env.PEDIDO_SERVICE_URL,
    changeOrigin: true,
}));

app.use(createProxyMiddleware({
    pathFilter: '/produtos',
    target: process.env.PRODUTO_SERVICE_URL,
    changeOrigin: true,
}));

app.listen(process.env.PORT, () => {
    console.log(`API Gateway rodando na porta ${process.env.PORT}`);
    console.log(`-> Roteando /clientes para ${process.env.CLIENTE_SERVICE_URL}`);
    console.log(`-> Roteando /pedidos para ${process.env.PEDIDO_SERVICE_URL}`);
    console.log(`-> Roteando /produtos para ${process.env.PRODUTO_SERVICE_URL}`);
});