import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserEntity } from 'src/users/entity/user.entity';
import { LoginAuthDto, LoginAuthResponseType } from '././dto/login-auth.dto';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtAuthGuard } from './guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*
  *
  *
  login user
  *
  *
  */
  @Post('login')
  @ApiOperation({ summary: 'Login User.' })
  @ApiCreatedResponse({ type: LoginAuthResponseType })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  login(@Body() loginAuthDto: LoginAuthDto): Promise<LoginAuthResponseType> {
    return this.authService.login(loginAuthDto);
  }

  /*
  *
  *
  register user
  *
  *
  */
  @Post('register')
  @ApiOperation({ summary: 'Register User.' })
  @ApiCreatedResponse({ type: Boolean })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  register(@Body() registerAuthDto: RegisterAuthDto): Promise<boolean> {
    return this.authService.register(registerAuthDto);
  }

  /*
  *
  *
  get current logged in user
  apply auth guard to protect query from unauthenticated users
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  @ApiOperation({ summary: 'Get current logged in user.' })
  @ApiOkResponse({ type: UserEntity })
  @ApiResponse({ status: 200, description: 'logged in user.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getCurrentUser(@Request() req): Promise<User> {
    return req.user;
  }
}
