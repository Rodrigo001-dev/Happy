import express from 'express';
import path from 'path';
import cors from 'cors';

// capturar erros quando estiver utilizando métodos async nos controllers
// porque por padão o express não captura os erros 
import 'express-async-errors'; 

import './database/connection';

import routes from './routes';

import errorHandler from './errors/handler';

const app = express();

app.use(cors()); // liberar o acesso para qualquer Front-end acessar a API
app.use(express.json());
app.use(routes);

// endereço para porder acessar as imagens
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(3333);
