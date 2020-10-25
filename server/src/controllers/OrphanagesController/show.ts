import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import orphanageView from '../../views/orphanages_view';
import Orphanage from '../../models/Orphanage';

export default {
  async show(request: Request, response: Response) {
    const { id } = request.params; // Route Param

    const orphanageRepository = getRepository(Orphanage);

    const orphanage = await orphanageRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(orphanageView.render(orphanage));
  }
};