import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateSchoolYearDto } from './dto/create-school-year.dto';
import { SchoolYearsService } from './school-years.service';

@Controller('school-years')
export class SchoolYearsController {
  constructor(private readonly schoolYearsService: SchoolYearsService) {}

  @Post()
  create(
    @Body()
    dto: CreateSchoolYearDto,
  ) {
    return this.schoolYearsService.create(dto);
  }

  @Get()
  findAll() {
    return this.schoolYearsService.findAll();
  }

  @Get('current')
  getCurrent() {
    return this.schoolYearsService.getCurrent();
  }

  @Patch(':id/set-current')
  setCurrent(
    @Param('id')
    id: string,
  ) {
    return this.schoolYearsService.setCurrent(id);
  }
}
