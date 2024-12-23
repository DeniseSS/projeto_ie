import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(Users) private readonly repository: Repository<Users>,
  ) {}
  create(createUsersDto: CreateUsersDto) {
    const users = this.repository.create(createUsersDto);
    return this.repository.save(users);
  }

  findAll(): Promise<Users[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Users> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateUsersDto: UpdateUsersDto): Promise<Users> {
    const users = await this.repository.preload({
      id: id,
      ...updateUsersDto,
    });
    if (!users) {
      throw new NotFoundException(`Users ${id} not found`);
    }
    return this.repository.save(users);
  }

  async remove(id: number) {
    const users = await this.findOne(id);
    return this.repository.remove(users);
  }

  async getUserWithPublications(userId: number): Promise<Users> {
    return this.repository.findOne({
      where: { id: userId },
      relations: ['publications'],
    });
  }
  
  async findByEmail(email: string): Promise<Users | undefined> {
    return this.repository.findOne({ where: { email } });
  }
}
