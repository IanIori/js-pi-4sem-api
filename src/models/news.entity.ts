import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Newsletter {
  static findOneBy(arg0: { email: any; }) {
    throw new Error('Method not implemented.');
  }
  save() {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    email!: string;
}