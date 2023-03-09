import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto, LoginAuthResponseType } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareSync, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /*
  *
  *
  login user
  *
  *
  */
  async login(loginAuthDto: LoginAuthDto): Promise<LoginAuthResponseType> {
    const user = await this.usersService.findOneByEmail(loginAuthDto.email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = compareSync(loginAuthDto.password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      ...payload,
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.SECRET,
      }),
    };
  }

  /*
  *
  *
  register user
  *
  *
  */
  async register(user: RegisterAuthDto): Promise<boolean> {
    await this.usersService.create({
      ...user,
      password: await hash(user.password, 10),
    });

    return true;
  }
}
