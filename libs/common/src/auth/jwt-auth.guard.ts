import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants';
import { UserDto } from '../dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jwt =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      context.switchToHttp().getRequest().cookies?.Authentication ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      context.switchToHttp().getRequest().headers?.authentication;

    if (!jwt) {
      return false;
    }

    // const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return this.authClient
      .send<UserDto>('authenticate', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError((err) => {
          this.logger.error(err, 'error authenticating user with JWT');
          return of(false);
        }),
      );
  }
}
