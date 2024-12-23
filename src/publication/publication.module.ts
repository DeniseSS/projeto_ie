import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { Publication } from './entities/publication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from './S3/S3Service';

@Module({
  imports: [TypeOrmModule.forFeature([Publication])],
  controllers: [PublicationController],
  providers: [PublicationService, S3Service],
})
export class PublicationModule {}
