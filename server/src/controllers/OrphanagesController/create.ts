import { Request, Response } from 'express';
import { getRepository } from 'typeorm'; // O typeorm utiliza uma arquitetura
// um pattern chamado repository pattern que é basicamente toda a operação
// que queremos fazer no banco de dados(criar, listar, deletar ...) passa
// por um repositorio, o repositorio é quem detem a regra de como que um
// dado pode ser criado, como que ele pode ser deletado ou qualquer coisa
// assim
import Orphanage from '../../models/Orphanage';

import * as Yup from 'yup';

export default {
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;
  
    const orphanagesRepository = getRepository(Orphanage);

    // request.files = dentro dele estão as imagens que eu estou fazendo
    // upload
    const requestImages = request.files as Express.Multer.File[];
    // Se tentarmos utilizar o request.files como array ele vai dar erro
    // por isso que falamos manualmente utilizando as para falar que o 
    // request.files é um array de arquivos(Express.Multer.File[])

    const images = requestImages.map(image => {
      return { path: image.filename }; // path é a única informação que eu
      // tenho na tabela de imagens no banco de dados que eu preciso
      // preencher, o resto vai ser preenchido automaticamente
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      // fazendo uma condição, porque o open_on_weekends está vindo do 
      // Front como string
      open_on_weekends: open_on_weekends === 'true',
      images
    };

    const schema = Yup.object().shape({
      // quais campos eu tenho na hora de inserir um orfanato
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(400),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ) // array de objetos, shape é para falar o formato desse objeto
    }); // schema de validação do orfanato

    await schema.validate(data, { // validação dos dados 
      abortEarly: false, // se ele encontrar um campo que não está valido,
      // vai retornar todos os campos que não estão validos, ou seja,
      // todos os erros ao mesmo tempo
    });
  
    const orphanage = orphanagesRepository.create(data); // deixa o orfanato pré-criado
  
    await orphanagesRepository.save(orphanage); // salvar no banco
  
    return response.status(201).json(orphanage);
  }
};