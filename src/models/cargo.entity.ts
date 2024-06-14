import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import User from './user.entity'
import Checklist from './checklist.entity'

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
  
  @OneToMany(() => Checklist, checklist => checklist.carga)
  checklists!: Checklist[]
}