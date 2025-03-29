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
  Req,
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
  createDayoff(@Body() createDayoffDto: CreateDayoffDto, @Req() req: any) {
    return this.dayoffService.createDayoff(req.user.id, createDayoffDto);
  }

  @Get()
  @Roles(Role.COORDINATOR)
  findAllDayoffs(
    @Query('status') status: DAYOFF_STATUS | '' = '',
    @Query('weekday') weekday: WEEKDAY | '' = '',
  ) {
    return this.dayoffService.findAllDayoffs(status, weekday);
  }

  @Get('professor/:user_id')
  @Roles(Role.COORDINATOR)
  findDayoffByUserId(@Param('user_id') user_id: string) {
    return this.dayoffService.findDayoffByUserId(user_id);
  }

  @Get('me')
  findMyDayoff(@Req() req: any) {
    return this.dayoffService.findDayoffByUserId(req.user.id);
  }

  @Get(':id')
  @Roles(Role.COORDINATOR)
  findDayoffById(@Param('id') id: string) {
    return this.dayoffService.findDayoffById(id);
  }

  @Patch()
  @Roles(Role.PROFESSOR)
  updateDayoff(@Body() updateDayoffDto: UpdateDayoffDto, @Req() req: any) {
    return this.dayoffService.updateDayoff(req.user.id, updateDayoffDto);
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
