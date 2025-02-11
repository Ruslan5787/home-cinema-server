import { Film } from 'src/film/entities/film.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Film, (film) => film.genre, {
    onDelete: 'SET NULL',
  })
  film: Film;

  films?: Film[];
}
