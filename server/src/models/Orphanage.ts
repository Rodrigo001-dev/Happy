import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany, 
  JoinColumn 
} from 'typeorm';
import Image from './Image';

// OneToMany => 1 orfanato para várias imagens

@Entity('orphanages')
export default class Orphanage {
  // campos que o orfanato vai ter dentro do banco de dados
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column() // tudo que tiver essa @Column quer dizer que é uma columna no bando
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  // esse OneToMany(é o relacionamento de 1 para muitos) recebe um primeiro
  // parâmetro que é uma função que devolve qual que é o tipo do retorno e
  // o segundo parâmetro é, dado uma imagem que eu recebi, qual que é o campo
  // dentro dessa imagem que retorna o relacionamento inverso, ou seja, que
  // me retorna o orfanato em si. No OneToMany eu consigo passar uma treceira
  // opção com algumas configurações 
  @OneToMany(() => Image, image => image.orphanage, {
    // quando eu for cadastrar um orfanato(insert) ou alterar esse orfanato
    // (update) ele vai automaticamente cadastrar ou atualizar as imagens que
    // estáo relacionadas com aquele orfanato
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'orphanage_id' }) // qual o nome da coluna que armazena o relacionamento de orfanato com imagem
  // images não existi nessa tabela no banco de dados, ela é um array[] de
  // Images dentro do model de imagens
  images: Image[]; 
}