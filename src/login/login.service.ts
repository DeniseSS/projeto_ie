import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  private async comparePasswords(
    userPassword: string,
    currentPassword: string,
  ) {
    return await bcrypt.compare(currentPassword, userPassword);
  }

  async findOneByEmail(email: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateCredentials({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Users> {
    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await this.comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async create({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Users> {
    const userInDb = await this.findOneByEmail(email);
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: Users = this.userRepository.create({
      email,
      password,
    });

    await this.userRepository.save(user);

    return user;
  }
}
