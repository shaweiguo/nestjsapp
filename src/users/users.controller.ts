import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post('')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "User created successful!",
      data: user
    });
  }

  @Post('/register')
  async register(@Res() res: Response, @Body() registerUserDto: RegisterUserDto) {
    // console.log(registerUserDto);

    const p1 = registerUserDto.password1;
    const p2 = registerUserDto.password2;

    if (p1 !== p2) {
      // console.log(`two password not equal: ${p1}/${p2}`)
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: "two password not equal!"
      });
    }
    let createUserDto = new(CreateUserDto);
    createUserDto.name = registerUserDto.name;
    createUserDto.password = p1;
    createUserDto.email = registerUserDto.email;
    createUserDto.firstName = registerUserDto.firstName;
    createUserDto.lastName = registerUserDto.lastName;
    createUserDto.age = registerUserDto.age;

    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "User created successful!",
      data: user
    });
  }

  @Get('')
  async getAll(@Res() res) {
    const users = await this.userService.getAll();
    return res.status(HttpStatus.OK).json({
      status: 200,
      data: users
    });
  }

  @Get(":id")
  async getOne(@Res() res, @Param('id') _id: string) {
    const user = await this.userService.getAUser(_id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: "User not found!" });
    return res.status(HttpStatus.OK).json({ status: 200, data: user });
  }

  @Patch(':id')
  async update(@Res() res, @Body() createUserDto: CreateUserDto, @Param("id") _id: string) {
    const user = await this.userService.updateAUser(_id, createUserDto);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: "User not found!" });
    return res.status(HttpStatus.OK).json({ status: 200, data: user });
  }

  @Delete(':id')
  async delete(@Res() res, @Param('id') _id: string) {
    const user = await this.userService.deleteAUser(_id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: "User not found!" });
    return res.status(HttpStatus.OK).json({ status: 200, message: "Delete user successful" });
  }
}
