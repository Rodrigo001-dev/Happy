// as Views servem para determinar como que os dados vão estar visíveis,
// como que os dados vão estar disponíveis para o Front-end, ou seja, para
// quem consumir a minha API

import Image from '../models/Image';

export default {
  // o método render vai pegar um imagem e vai retornar aquela imagem
  // da maneira que ela precissa ser exibido para o Front-end, da maneira
  // que eu quero retornar ele
  render(image: Image) {
    return {
      id: image.id,
      url: `http://192.168.0.107:3333/uploads/${image.path}`
    }
  },

  // o método renderMany vai pegar todos as imagens e vai retornar todos
  // as imagens da maneira que elas precisam ser exibidos para
  // o Front-end
  renderMany(images: Image[]) {
    // estou percorrendo todas as imagens e para cada uma delas eu estou 
    // chamando o método render
    return images.map(image => this.render(image));
  }
};