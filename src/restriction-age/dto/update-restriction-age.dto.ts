import { PartialType } from '@nestjs/mapped-types';
import { CreateRestrictionAgeDto } from './create-restriction-age.dto';

export class UpdateRestrictionAgeDto extends PartialType(CreateRestrictionAgeDto) {}
