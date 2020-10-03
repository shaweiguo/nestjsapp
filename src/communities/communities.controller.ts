import { CreateCommunityDto } from './communities.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommunitiesService } from "./communities.service";
import { Community } from './communities.schema';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly service: CommunitiesService) {}

  @Get()
  getAll(): Promise<Community[]> {
    return this.service.getAll();
  }

  @Post()
  async create(@Body() createCommunityDto: CreateCommunityDto) {
    await this.service.create(createCommunityDto);
  }
}
