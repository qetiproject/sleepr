import {
  nActivate,
 EecutionContext,
Inject,
  jectable,
 Lgger,,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

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
      .send('authenticate', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
      );
  }
}
