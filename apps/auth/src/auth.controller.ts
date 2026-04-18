import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { UserDocument } from '@app/common/models/user.schema';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    // const jwt = await this.authService.login(user, response);
    // response.send(jwt);
  }

  // @UseGuards(JwtAuthGuard)
  // @MessagePattern('authenticate')
  // async authenticate(@Payload() data: any) {
  //   return data.user;
  // }
}
