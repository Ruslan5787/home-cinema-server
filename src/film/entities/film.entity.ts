import { Expose, Type } from 'class-transformer';
import { Genre } from 'src/genre/entities/genre.entity';
import { RestrictionAge } from 'src/restriction-age/entities/restriction-age.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  production: string;

  @Column()
  yearRelease: number;

  @Column()
  duration: number;

  @Column()
  poster: string;

  @Column()
  description: string;

  @ManyToOne(() => Genre, (genre) => genre.film, {
    eager: true,
  })
  @JoinColumn({ name: 'genre' })
  genre: Genre;

  @ManyToOne(() => RestrictionAge, (restrictionAge) => restrictionAge.film, {
    eager: true,
  })
  @JoinColumn({ name: 'restrictionAge' })
  restrictionAge: RestrictionAge;

  users?: User[];

  @ManyToMany(() => Genre)
  @JoinTable({ name: 'films_genres' })
  genres: Genre[];

  @CreateDateColumn({ nullable: true, type: 'date' })
  createAt: Date;
}
