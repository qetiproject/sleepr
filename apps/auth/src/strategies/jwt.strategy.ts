/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          request?.cookies?.Authentication ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          request?.Authentication ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          request?.headers.Authentication,
      ]),
      secretOrKey: configService.get('JWT_SECRET') || '',
    });
  }

  async validate({ userId }: TokenPayload) {
    return await this.usersService.getUser({ _id: userId });
  }

  //   jwtFromRequest: ExtractJwt.fromExtractors([
  //     (request: Request) => request?.cookies?.Authentication,
  //   ]),
  //   secretOrKey: configService.get('JWT_SECRET'),
  // });
}
