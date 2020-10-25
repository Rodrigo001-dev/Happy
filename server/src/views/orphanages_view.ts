// as Views servem para determinar como que os dados vão estar visíveis,
// como que os dados vão estar disponíveis para o Front-end, ou seja, para
// quem consumir a minha API

import Orphanage from '../models/Orphanage';

import imagesView from './images_view';

export default {
  // o método render vai pegar um orfanato e vai retornar aquele orfanato
  // da maneira que ele precissa ser exibido para o Front-end, da maneira
  // que eu quero retornar ele
  render(orphanage: Orphanage) {
    return {
      // vou retornar cada um dos dados do orfanato que eu quero retornar 
      // para o Front-end
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images),
    };
  },
  // o método renderMany vai pegar todos os orfanatos e vai retornar todos
  // os orfanatos da maneira que eles precisam ser exibidos para
  // o Front-end
  renderMany(orphanages: Orphanage[]) {
    // estou percorrendo todos o orfanatos e para cada um deles eu estou 
    // chamando o método render
    return orphanages.map(orphanage => this.render(orphanage));
  }
};