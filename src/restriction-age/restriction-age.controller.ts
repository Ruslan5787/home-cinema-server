import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestrictionAgeService } from './restriction-age.service';
import { CreateRestrictionAgeDto } from './dto/create-restriction-age.dto';
import { UpdateRestrictionAgeDto } from './dto/update-restriction-age.dto';

@Controller('restriction-age')
export class RestrictionAgeController {
  constructor(private readonly restrictionAgeService: RestrictionAgeService) {}

  @Post()
  create(@Body() createRestrictionAgeDto: CreateRestrictionAgeDto) {
    return this.restrictionAgeService.create(createRestrictionAgeDto);
  }

  @Get()
  findAll() {
    return this.restrictionAgeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restrictionAgeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestrictionAgeDto: UpdateRestrictionAgeDto,
  ) {
    return this.restrictionAgeService.update(+id, updateRestrictionAgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restrictionAgeService.remove(+id);
  }
}
