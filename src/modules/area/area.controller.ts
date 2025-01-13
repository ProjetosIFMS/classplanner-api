import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  createArea(@Body() createAreatDto: CreateAreaDto) {
    return this.areaService.createArea(createAreatDto);
  }

  @Get()
  findAllAreas() {
    return this.areaService.findAllAreas();
  }

  @Get(':id')
  findAreaById(@Param('id') id: string) {
    return this.areaService.findAreaById(id);
  }

  @Patch(':id')
  updateArea(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areaService.updateArea(id, updateAreaDto);
  }

  @Delete(':id')
  deleteArea(@Param('id') id: string) {
    return this.areaService.deleteArea(id);
  }
}
