import { Injectable } from '@nestjs/common';
import { CreateRestrictionAgeDto } from './dto/create-restriction-age.dto';
import { UpdateRestrictionAgeDto } from './dto/update-restriction-age.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RestrictionAge } from './entities/restriction-age.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestrictionAgeService {
  constructor(
    @InjectRepository(RestrictionAge)
    private restrictionAgeRepository: Repository<RestrictionAge>,
  ) {}
  create(createRestrictionAgeDto: CreateRestrictionAgeDto) {
    return 'This action adds a new restrictionAge';
  }

  findAll() {
    return this.restrictionAgeRepository.find({
      order: {
        restrictionAge: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} restrictionAge`;
  }

  update(id: number, updateRestrictionAgeDto: UpdateRestrictionAgeDto) {
    return `This action updates a #${id} restrictionAge`;
  }

  remove(id: number) {
    return `This action removes a #${id} restrictionAge`;
  }
}
