import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import User from './user.entity'

@Entity()
export default class Cargo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  specs!: string

  @Column()
  weight!: number

  @Column()
  userId!: number

  @Column()
  status!: string

  @ManyToOne(() => User, user => user.cargos)
  driver!: User  
}