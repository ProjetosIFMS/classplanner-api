import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseGuards,
} from '@nestjs/common';
import { ModalityService } from './modality.service';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';
import { ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from 'src/guards/roles.guard';
// import { Roles } from 'src/decorators/roles.decorator';
// import { Role } from '../user/dto/Role';

@ApiTags('Modality')
@Controller('modality')
// @UseGuards(AuthGuard('jwt'), RolesGuard)
// @Roles(Role.COORDINATOR)
export class ModalityController {
  constructor(private readonly modalityService: ModalityService) {}

  @Post()
  create(@Body() data: CreateModalityDto) {
    return this.modalityService.createModality(data);
  }

  @Get()
  // @Roles(Role.PROFESSOR, Role.COORDINATOR)
  findAll() {
    return this.modalityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modalityService.findModalityById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateModalityDto) {
    return this.modalityService.updateModaliity(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modalityService.deleteModality(id);
  }
}
