import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import User from './user.entity'
import Cargo from './cargo.entity'

@Entity()
export default class Checklist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  driverName!: string

  @Column()
  factory!: string

  @Column()
  departureDate!: Date

  @Column()
  arrivalDate!: Date

  @Column()
  truckPlate!: string

  @Column()
  transportCompany!: string

  @ManyToOne(() => Cargo, carga => carga.checklists)
  carga!: Cargo

  @Column()
  painting!: string

  @Column()
  glasses!: string

  @Column()
  obervations!: string

  @ManyToOne(() => User, user => user.cargos)
  driver!: User
  observations: any
}