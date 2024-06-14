import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Checklist from './checklist.entity'

@Entity()
export default class Attachment extends BaseEntity {
  @PrimaryGeneratedColumn()
  idAttachment!: number

  @Column()
  filename!: string

  @Column('bytea')
  data!: Buffer

  @ManyToOne(() => Checklist, checklist => checklist.attachments)
  checklist!: Checklist
}
