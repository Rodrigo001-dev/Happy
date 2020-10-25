import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import Orphanage from './Orphanage';

// ManyToOne => várias imagens que pertencem a um unico orfanato

@Entity('images')
export default class Images {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Orphanage, orphanage => orphanage.images)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanage; // não é um array[] porque é um só um orfanato
}