import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PivotService } from './pivot.service';
import { CreatePivotDto } from './dto/create-pivot.dto';
import { UpdatePivotDto } from './dto/update-pivot.dto';

@Controller('pivot')
export class PivotController {
  constructor(private readonly pivotService: PivotService) {}

  @Post()
  createPivot(@Body() createPivotDto: CreatePivotDto) {
    return this.pivotService.createPivot(createPivotDto);
  }

  @Get()
  findAllPivots() {
    return this.pivotService.findAllPivots();
  }

  @Get(':id')
  findPivotById(@Param('id') id: string) {
    return this.pivotService.findPivotById(id);
  }

  @Patch(':id')
  updatePivot(@Param('id') id: string, @Body() updatePivotDto: UpdatePivotDto) {
    return this.pivotService.updatePivot(id, updatePivotDto);
  }

  @Delete(':id')
  deletePivot(@Param('id') id: string) {
    return this.pivotService.deletePivot(id);
  }
}
