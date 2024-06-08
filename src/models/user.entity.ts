import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm'
import Token from './token.entity'
import Cargo from './cargo.entity'

@Entity()
@Unique(["email"])
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  nome!: string

  @Column()
  cpf!: string

  @Column()
  email!: string

  @Column()
  senha!: string

  @OneToMany(() => Token, token => token.user)
  tokens!: Token[]  

  @OneToMany(() => Cargo, cargo => cargo.driver)
  cargos!: Cargo[]  
}