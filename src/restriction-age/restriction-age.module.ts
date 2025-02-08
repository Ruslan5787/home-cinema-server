import { Module } from '@nestjs/common';
import { RestrictionAgeService } from './restriction-age.service';
import { RestrictionAgeController } from './restriction-age.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestrictionAge } from './entities/restriction-age.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestrictionAge])],
  controllers: [RestrictionAgeController],
  providers: [RestrictionAgeService],
})
export class RestrictionAgeModule {}
