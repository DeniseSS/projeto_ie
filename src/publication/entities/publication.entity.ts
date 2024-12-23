import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Users} from '../../users/entities/users.entity'

@Entity()
export class Publication extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (users) => users.publications)
  users: Users;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  imageUrl: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 10, nullable: true })
  cep: string;

  @Column({ length: 100, nullable: true })
  city: string;
}
