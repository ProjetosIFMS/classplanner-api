import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DayoffService } from './dayoff.service';
import { CreateDayoffDto } from './dto/create-dayoff.dto';
import { UpdateDayoffDto } from './dto/update-dayoff.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/modules/user/dto/Role';
import { Roles } from 'src/decorators/roles.decorator';
import { DAYOFF_STATUS } from 'src/modules/dayoff/dto/dayoff-status';
import { WEEKDAY } from 'src/modules/dayoff/dto/weekday';

@ApiTags('Dayoff')
@Controller('dayoff')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COORDINATOR, Role.PROFESSOR)
export class DayoffController {
  constructor(private readonly dayoffService: DayoffService) {}

  @Post()
  @Roles(Role.PROFESSOR)
  createCourse(@Body() createDayoffDto: CreateDayoffDto) {
    return this.dayoffService.createDayoff(createDayoffDto);
  }

  @Get()
  @Roles(Role.COORDINATOR)
  findAllDayoffs(
    @Query('status') status: DAYOFF_STATUS | '' = '',
    @Query('weekday') weekday: WEEKDAY | '' = '',
  ) {
    return this.dayoffService.findAllDayoffs(status, weekday);
  }

  @Get(':id')
  findDayoffById(@Param('id') id: string) {
    return this.dayoffService.findDayoffById(id);
  }

  @Patch(':id')
  @Roles(Role.PROFESSOR)
  updateDayoff(
    @Param('id') id: string,
    @Body() updateDayoffDto: UpdateDayoffDto,
  ) {
    return this.dayoffService.updateDayoff(id, updateDayoffDto);
  }

  @Patch(':id/approve')
  @Roles(Role.COORDINATOR)
  approveDayoff(@Param('id') id: string) {
    return this.dayoffService.approveDayoff(id);
  }

  @Patch(':id/reject')
  @Roles(Role.COORDINATOR)
  rejectDayoff(@Param('id') id: string) {
    return this.dayoffService.rejectDayoff(id);
  }

  @Delete(':id')
  deleteDayoff(@Param('id') id: string) {
    return this.dayoffService.deleteDayoff(id);
  }
}
