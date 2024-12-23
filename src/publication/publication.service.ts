import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication } from './entities/publication.entity';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication) private readonly repository: Repository<Publication>,
  ) {}
  create(createPublicationDto: CreatePublicationDto) {
    const publication = this.repository.create(createPublicationDto);
    return this.repository.save(publication);
  }

  findAll(): Promise<Publication[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Publication> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto): Promise<Publication> {
    const publication = await this.repository.preload({
      id: id,
      ...updatePublicationDto,
    });
    if (!publication) {
      throw new NotFoundException(`Publication ${id} not found`);
    }
    return this.repository.save(publication);
  }

  async remove(id: number) {
    const publication = await this.findOne(id);
    return this.repository.remove(publication);
  }
}
