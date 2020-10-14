import { CreateCommuserDto } from './commuser.dto';
import { CommuserService } from './commuser.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('commuser')
export class CommuserController {
  constructor(
    private service: CommuserService,
  ) { }

  @Post('')
  async create(@Res() res: Response, @Body() dto: CreateCommuserDto) {
    const user = await this.service.create(dto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "Commuser created successful!",
      data: user
    });
  }

  @Get('')
  async getOneByCommIdUserId(
    @Res() res,
    @Query() query
  ) {
    const obj = await this.service.getOne(query.comm_id, query.user_id);
    if (!obj)
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({
        status: 404,
        message: "Commuser not found!",
        data: null,
      });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get commuser successful!",
      data: obj,
    });

  }

  @Get('/id')
  async getIdByCommIdUserId(
    @Res() res,
    @Query() query
  ) {
    const id = await this.service.getId(query.comm_id, query.user_id);
    if (!id)
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({
        status: 404,
        message: "Commuser not found!",
        data: null,
      });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get commuser successful!",
      data: id,
    });

  }

  @Get('/comms/:id')
  async getCommsByUserId(@Res() res, @Param('id') id: string) {
    let objs = await this.service.getCommsByUserId(id);
    if (!objs) objs = [];
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get all communities successful!",
      data: objs,
    });
  }

  @Get('/users/:id')
  async getUsersByCommId(@Res() res, @Param('id') id: string) {
    let objs = await this.service.getUsersByCommId(id);
    if (!objs) objs = [];
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get all users successful!",
      data: objs,
    });
  }

  @Patch(':id')
  async update(@Res() res, @Body() dto: CreateCommuserDto, @Param("id") id: string) {
    const obj = await this.service.update(id, dto);
    if (!obj)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "Commuser not found!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Update commuser successful!",
      data: obj,
    });
  }

  @Delete('')
  async delete(
    @Res() res,
    @Body() dto: CreateCommuserDto
  ) {
    const obj = await this.service.delete(dto.comm_id, dto.user_id);
    if (!obj)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "Commuser not found!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Delete commuser successful",
      data: obj,
    });
  }
}
