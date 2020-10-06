import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { AuthService } from './../auth/auth.service';
import { LocalAuthGuard } from './../auth/local-auth.guard';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Request, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto, SigninDto } from './user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  @Post('')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "User created successful!",
      data: user
    });
  }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body) {
    // console.log(body);
    return this.authService.login(body.username, body.password);
  }

  @Post('/signin')
  async signIn(@Res() res: Response, @Body() signinDto: SigninDto) {
    const user = await this.usersService.getAUserByNamePassword({
      username: signinDto.name,
      password: signinDto.password
    });

    if (user) {
      return res.status(HttpStatus.OK).json({
        status: 200,
        message: "User authenticated successful!",
        data: user
      });
    } else {
      return res.status(HttpStatus.OK).json({
        status: 400,
        message: "User authenticated failed!",
        data: user
      });
    }
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
        message: "Two password not equal!",
        data: null,
      });
    }

    let createUserDto = new(CreateUserDto);
    createUserDto.name = registerUserDto.name;
    createUserDto.password = p1;
    createUserDto.email = registerUserDto.email;
    createUserDto.firstName = registerUserDto.firstName;
    createUserDto.lastName = registerUserDto.lastName;
    createUserDto.age = registerUserDto.age;

    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "User created successful!",
      data: user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAll(@Res() res) {
    const users = await this.usersService.getAll();
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get all users successful!",
      data: users,
    });
  }

  @Get(":id")
  async getOne(@Res() res, @Param('id') _id: string) {
    const user = await this.usersService.getAUser(_id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "User not found!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get user successful!",
      data: user,
    });
  }

  @Patch(':id')
  async update(@Res() res, @Body() createUserDto: CreateUserDto, @Param("id") _id: string) {
    const user = await this.usersService.updateAUser(_id, createUserDto);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "User not found!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Update user successful!",
      data: user,
    });
  }

  @Delete(':id')
  async delete(@Res() res, @Param('id') _id: string) {
    const user = await this.usersService.deleteAUser(_id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "User not found!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Delete user successful",
      data: user,
    });
  }
}
