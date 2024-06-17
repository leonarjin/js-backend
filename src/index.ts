import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import authRoutes from './controller/authController';

AppDataSource.initialize().then(async () => {
  const app = express();

  // Configuração do CORS
  app.use(cors({
    origin: 'http://localhost:3000', // Permitir requisições do frontend rodando em localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
  }));

  app.use(bodyParser.json());

  // Usando as rotas de autenticação
  app.use('/api', authRoutes);

  // Usando outras rotas
  app.use(routes);

  app.listen(process.env.PORT || 5432, () => {
    console.log(`Server running on port ${process.env.PORT || 5432}`);
  });
});
