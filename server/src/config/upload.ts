// configurações de como os uploads vão ser feitos

import multer from 'multer';
import path from 'path'; // forma de fazer caminhos relarivos na aplicação

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'), // __dirname é o diratorio atual
    filename: (request, file, cb) => { // dar um nome para o arquivo
      // vai pegar a data atual com os segundos e colocar antes do nome do
      // arquivo para não correr o risco de um arquivo sobredescrever outro
      // quando 2 pessoas ou mais fazerem o upload do arquivo do mesmo nome
      const fileName = `${Date.now()}-${file.originalname}`;

      // o callback sempre recebe um erro como primeiro parâmetro e o 
      // resultado como segundo e como eu não tive erro eu retorno nulo
      // e o nome do arquivo como segundo parâmetro
      cb(null, fileName); 
    },
  })
};