import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getAUserByName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: string, password: string ) {
    const id = await this.usersService.getAUserIdByNamePassword({username, password});
    const payload = { username: username, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
