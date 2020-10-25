import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../../models/Orphanage';
import orphanagesView from '../../views/orphanages_view';

export default {
  async index(request: Request, response: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find({
      // nome da relação,  da entidade, da coluna que tem as minhas imagens
      relations: ['images'] 
    });

    return response.json(orphanagesView.renderMany(orphanages));
  }
};