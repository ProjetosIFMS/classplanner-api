import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InterestSelectionService } from './interest-selection.service';
import { CreateInterestSelectionDto } from './dto/create-interest-selection.dto';
import { UpdateInterestSelectionDto } from './dto/update-interest-selection.dto';

@Controller('interest-selection')
export class InterestSelectionController {
  constructor(
    private readonly interestSelectionService: InterestSelectionService,
  ) {}

  @Post()
  create(@Body() createInterestSelectionDto: CreateInterestSelectionDto) {
    return this.interestSelectionService.create(createInterestSelectionDto);
  }

  @Get()
  findAll() {
    return this.interestSelectionService.findAll();
  }

  @Get(':professor_id')
  findByProfessor(@Param('professor_id') professor_id: string) {
    return this.interestSelectionService.findByProfessor(professor_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interestSelectionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateInterestSelectionDto) {
    return this.interestSelectionService.update(id, data);
  }
}
