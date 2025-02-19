import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PeriodService } from './period.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';

@Controller('period')
export class PeriodController {
  constructor(private readonly periodService: PeriodService) {}

  @Post()
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodService.createPeriod(createPeriodDto);
  }

  @Get()
  findAll() {
    return this.periodService.findAllPeriods();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodService.findPeriodById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdatePeriodDto) {
    return this.periodService.updatePeriod(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodService.deletePeriod(id);
  }
}
