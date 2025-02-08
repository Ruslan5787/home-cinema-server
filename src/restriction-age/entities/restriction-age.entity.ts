import { Film } from 'src/film/entities/film.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RestrictionAge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  restrictionAge: number;

  @OneToMany(() => Film, (film) => film.restrictionAge, {
    onDelete: 'SET NULL',
  })
  film: Film;
}
