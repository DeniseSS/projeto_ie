import { Publication } from 'src/publication/entities/publication.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 10, nullable: true })
  cep: string;

  @Column({ length: 255, nullable: true })
  image: string;

  @Column({ length: 255 })
  password: string;

  
  @Column({ length: 255 })
  email: string;

  @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

  @OneToMany(() => Publication, (publication) => publication.users)
  publications: Publication[];
}
