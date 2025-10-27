import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';

@Controller('model')
export class ModelController {
  constructor(private readonly modelsService: ModelService) {}

  @Post()
  async create(@Body() createModelDto: CreateModelDto) {
    return this.modelsService.create(createModelDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.modelsService.findOne(parseInt(id, 10));
  }

  @Get()
  async findAll() {
    return this.modelsService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.modelsService.remove(parseInt(id, 10));
  }
}
