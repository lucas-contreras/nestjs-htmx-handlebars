import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MakeService } from './make.service';
import { CreateMakeDto } from './dto/create-make.dto';
import { API_PREFIX } from 'src/constants';

@Controller(`${API_PREFIX}/make`)
export class MakeController {
  constructor(private readonly makeService: MakeService) {}

  @Post()
  async create(@Body() createMakeDto: CreateMakeDto) {
    return this.makeService.create(createMakeDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.makeService.findOne(parseInt(id, 10));
  }

  @Get()
  async findAll() {
    return this.makeService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.makeService.remove(parseInt(id, 10));
  }
}
