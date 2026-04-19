import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
